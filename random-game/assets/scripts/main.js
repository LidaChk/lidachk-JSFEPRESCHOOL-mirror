console.log("Работа не готова.\n", "Пожулйста, проверьте в среду");

/*  console.log("Самооценка 65:\n",
 "[x] Вёрстка +10\n",
 "[x] Кнопка Play/Pause +10\n",
 "[x] При кликах по кнопкам переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10\n",
 "[x] При смене аудиотрека меняется изображение - обложка аудиотрека +10\n",
 "[x] Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10\n",
 "[x] Отображается продолжительность аудиотрека и его текущее время проигрывания +10\n",
 "[x] Дополнительный функционал: регулировка уровня звука +5\n"); */


const fieldSize = 6;
const gameField = document.querySelector('.gameField');
const diceField = document.querySelector('.diceField');
const diceOne = document.querySelector('.dice-one');
const diceTwo = document.querySelector('.dice-two');
const fieldHeader = document.querySelector('.field-header');
const infoHeader = fieldHeader.querySelector('.info-header');
const gameStates = ['init', 'roll', 'move', 'check'];
const pNames = ['Bobosaur', 'Junior', 'Chaos', 'HueJass', 'Lumos', 'Pupsi', 'NotATRex', 'Cosmo', 'Tiara', 'StalkingCat', 'Tiberius', 'Grinch', 'Biscuit']

let iState = 0;
let stopFlg = true;
let spinFlg = true;
let arrDice = ['one', 'two', 'three', 'four', 'five', 'six'];
let rollRes = 0;
let gameDraw = false;
let movesCount = 0;

let winner = '';


let activePlayer = shuffle(pNames)[0]
/* перемешать массив*/
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function invOnOff(el){
  el.classList.add('invisible');
  setTimeout(el.classList.remove('invisible'), 300);
}

/* FIELD CREATING */
let arrI = [];
for (let i = 1; i <= fieldSize; i++) {
  for (let j = 1; j <= fieldSize; j++)
    arrI.push(i + j);
}
shuffle(arrI);

let I = 0;
for (let rowIndex = 0; rowIndex < fieldSize; rowIndex++) {
  for (let columnIndex = 0; columnIndex < fieldSize; columnIndex++) {
    const cell = document.createElement('div');
    cell.innerHTML = '<span class="cell-icon">' + arrI[I] + '</span>';
    cell.dataset.y = columnIndex;
    cell.dataset.x = rowIndex;
    cell.dataset.num = arrI[I];
    I++;
    cell.classList.add('cell');
    cell.classList.add('cell-free');
    gameField.append(cell);
  }
}
/*----------------*/

function showMessage(sMes) {
  infoHeader.classList.add('invisible');
  infoHeader.textContent = sMes;
  infoHeader.classList.remove('invisible');
}

function rollDice() {

  diceOne.classList.add('spin');
  diceTwo.classList.add('spin');

  shuffle(arrDice);
  diceField.querySelectorAll('.die-pip').forEach(el => el.classList.add('invisible'));
  diceOne.querySelectorAll(`.die-pip.${arrDice[0]}`).forEach(el => el.classList.remove('invisible'));
  diceTwo.querySelectorAll(`.die-pip.${arrDice[1]}`).forEach(el => el.classList.remove('invisible'));

  if (stopFlg) {
    diceOne.classList.remove('spin');
    diceTwo.classList.remove('spin');
    switchGameSTate();
  } else {
    setTimeout(rollDice, 300);
  }
};

function getRollRes() {
  return 14 - document.querySelectorAll(`.die-pip.invisible`).length;
}


function onDiceClick() {
  stopFlg = !stopFlg;
  if (!stopFlg) {
    showMessage('Click on Dice to Stop');
    rollDice();
  }
}

function onFailCellClick() {
  this.classList.add('cell-fail')
  setTimeout(() => {
    this.classList.remove('cell-fail')
  }, 500)
}


function onCellClick() {
  this.classList.add(`cell-${activePlayer}`);
  this.classList.remove(`cell-free`);
  gameField.querySelectorAll(`.cell`).forEach(el => {
    el.classList.remove('cell-hover');
    el.removeEventListener("click", onFailCellClick, false);
  });
  gameField.querySelectorAll(`[data-num='${rollRes}']`).forEach(el => el.removeEventListener("click", onCellClick, false));

  this.querySelector('.cell-icon').classList.add('invisible');
  this.querySelector('.cell-icon').classList.add('material-icons-outlined');

  this.querySelector('.cell-icon').textContent = 'pets';
  setTimeout(this.querySelector('.cell-icon').classList.remove('invisible'), 300)
  this.dataset.owner = activePlayer;
  this.dataset.num = '0';

  movesCount++;
  switchGameSTate();
}

function switchGameSTate() {
  iState = (iState + 1) % gameStates.length;
  //console.log(gameStates[iState]);
}

function TurnPrepare() {
  let freeCells = gameField.querySelectorAll(`.cell-free`);
  let freeActualCells = gameField.querySelectorAll(`[data-num='${rollRes}']`);
  //let freeActualCells = gameField.querySelectorAll(`.cell-free`);
  if (freeCells.length == 0) {
    gameDraw = true;
    winner = 'NoOne';
  } else if (freeActualCells.lenght == 0) {
    showMessage('There is no move');
  } else {
    freeCells.forEach(el => {
      el.classList.add('cell-hover');
      if (el.dataset.num != rollRes) el.addEventListener("click", onFailCellClick, false);
    });
    freeActualCells.forEach(el => {
      el.addEventListener("click", onCellClick, false);
      showMessage('Select a cell equal to the sum of the dice');
    });
  }
}

function check() {
  const cells = gameField.querySelectorAll(`.cell-${activePlayer}`);
  const dist = (c1, c2) => {
    return Math.sqrt((c1.dataset.x - c2.dataset.x) ** 2 + (c1.dataset.y - c2.dataset.y) ** 2);
  };
  const isByIdx = (i, j) => {
    return !!gameField.querySelector(`.cell-${activePlayer}[data-x='${i}'][data-y='${j}']`);
  };
  const setWinner = (i, j) => {
/*     invOnOff(gameField.querySelector(`.cell-${activePlayer}[data-x='${i}'][data-y='${j}']`).querySelector('span')); */
    gameField.querySelector(`.cell-${activePlayer}[data-x='${i}'][data-y='${j}']`).querySelector('span').classList.add('winners');
  };
  for (let elInd = 0; elInd < cells.length; elInd++) {
    let x = parseInt(cells[elInd].dataset.x);
    let y = parseInt(cells[elInd].dataset.y);
    for (let opi = -1; opi <= 1; opi++) {
      for (let opj = -1; opj <= 1; opj++) {
        if (!(opj == 0 && opi == 0) && isByIdx(x + opi, y + opj) && isByIdx(x + 2 * opi, y + 2 * opj) && isByIdx(x + 3 * opi, y + 3 * opj)) {

          mu = 0;
          while (isByIdx(x + mu * opi, y + mu * opj)) {
            setWinner(x + mu * opi, y + mu * opj);
            mu++;
          }
          return true;
        }
      }
    }
  }

}

function gameFlowPlayer() {

  switch (gameStates[iState]) {
    case 'init':
      diceField.addEventListener("click", onDiceClick, false);
      switchGameSTate();
      showMessage('Click on Dice to Roll');
      break;

    case 'roll':
      break;

    case 'move':
      diceField.removeEventListener("click", onDiceClick, false);
      rollRes = getRollRes();
      TurnPrepare();
      break;


    case 'check':
      if (check()) winner = activePlayer;
      switchGameSTate();
      break;

    default:
      winner = 'NoOne';
  }
}

function gameFlow() {
  if (winner == '') {
    gameFlowPlayer();
    setTimeout(gameFlow, 500)
  } else {
    if (winner == 'NoOne') {
      showMessage(`No more moves after ${movesCount} moves`);
    } else {
      showMessage(`${winner} won in  ${movesCount} moves`);
    }

  }
}

gameFlow();