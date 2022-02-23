console.log("Работа не готова.\n", "Буду благодарна, если посмотрите вечером. Можно проверять сейчас -базовый фунционал более менее");
console.log("Есть дебаг мод, при котором можно выбирать любые клетки, а не только те, сумма которых равна выпавшим кубикам");
console.log("Выполните debugModeFlg= true в консоли, чтобы его включить");

/*  console.log("Самооценка 65:\n",
 "[x] Вёрстка +10\n",
 "[x] Кнопка Play/Pause +10\n",
 "[x] При кликах по кнопкам переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10\n",
 "[x] При смене аудиотрека меняется изображение - обложка аудиотрека +10\n",
 "[x] Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10\n",
 "[x] Отображается продолжительность аудиотрека и его текущее время проигрывания +10\n",
 "[x] Дополнительный функционал: регулировка уровня звука +5\n"); */


const fieldSize = 6;
const nameInput = document.querySelector('.input');
const gameField = document.querySelector('.gameField');
const diceField = document.querySelector('.diceField');
const diceOne = document.querySelector('.dice-one');
const diceTwo = document.querySelector('.dice-two');
const fieldHeader = document.querySelector('.field-header');
const infoHeader = fieldHeader.querySelector('.info-header');
const resTable = document.querySelector('table.table-results');
const wrapperTable = document.querySelector('div.wrapper-table');
const gameStates = ['init', 'roll', 'move', 'check'];
const pNames = ['Bobosaur', 'Junior', 'Chaos', 'HueJass', 'Lumos', 'Pupsi', 'NotATRex', 'Cosmo', 'Tiara', 'StalkingCat', 'Tiberius', 'Grinch', 'Biscuit']

//флаг, при котором можно выбирать любые клетки, а не только те, сумма которых равна выпавшим кубикам
// просто выполните в консоли debugModeFlg= true, чтобы не возиться с выигрышем
let debugModeFlg = false;

let tableResults = JSON.parse(localStorage.getItem("LidaChkFourInRowTable"));
if (!tableResults) tableResults = {};

let iState = 0;
let stopFlg = true;
let spinFlg = true;
let arrDice = ['one', 'two', 'three', 'four', 'five', 'six'];
let rollRes = 0;
let gameDraw = false;
let movesCount = 0;

let winner = '';

animaRandom();

function animaRandom() {
  document.querySelector('.wrapper-field1').style.setProperty('--animation-duration', (Math.random() * (15 - 2) + 2) + 's');
  document.querySelector('.wrapper-field2').style.setProperty('--animation-duration', (Math.random() * (15 - 2) + 2) + 's');
}

let activePlayer = shuffle(pNames)[0];
document.querySelector('input').value = activePlayer;

/* перемешать массив*/
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
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
function invOnOff(el) {
  el.style.opacity = '0';
  setTimeout(el.style.opacity = '1', 500);
}

function showMessage(sMes) {
  invOnOff(infoHeader)
  //infoHeader.textContent = sMes;
  infoHeader.innerHTML = sMes;
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
  this.classList.add(`cell-player`);
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
  if (debugModeFlg) freeActualCells = gameField.querySelectorAll(`.cell-free`);
  if (freeCells.length == 0) {
    gameDraw = true;
    winner = 'DrawGame';
  } else if (freeActualCells.lenght == 0) {
    showMessage('There is no move');
  } else {
    freeCells.forEach(el => {
      el.classList.add('cell-hover');
      if (el.dataset.num != rollRes) el.addEventListener("click", onFailCellClick, false);
    });
    freeActualCells.forEach(el => {
      el.addEventListener("click", onCellClick, false);
      showMessage('Select a Cell<br> equal to the sum of the dice');
    });
  }
}

function check() {
  let sReturn = false;
  const cells = gameField.querySelectorAll(`.cell-player`);
  const dist = (c1, c2) => {
    return Math.sqrt((c1.dataset.x - c2.dataset.x) ** 2 + (c1.dataset.y - c2.dataset.y) ** 2);
  };
  const isByIdx = (i, j) => {
    return !!gameField.querySelector(`.cell-player[data-x='${i}'][data-y='${j}']`);
  };
  const setWinner = (i, j) => {
    invOnOff(gameField.querySelector(`.cell-player[data-x='${i}'][data-y='${j}']`));
    gameField.querySelector(`.cell-player[data-x='${i}'][data-y='${j}']`).querySelector('span').classList.add('winners');
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
          sReturn = true;
        }
      }
    }
  }

  return sReturn;
}

function gameFlowPlayer() {

  switch (gameStates[iState]) {
    case 'init':
      diceField.addEventListener("click", onDiceClick, false);
      diceField.classList.add('cursor-pointer');
      switchGameSTate();
      showMessage('Click on Dice to Roll');
      break;

    case 'roll':
      break;

    case 'move':
      diceField.removeEventListener("click", onDiceClick, false);
      diceField.classList.remove('cursor-pointer');
      rollRes = getRollRes();
      TurnPrepare();
      break;


    case 'check':
      activePlayer = document.querySelector('input').value ;
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
      writeResult();
    } else {
      showMessage(`${winner} won in  ${movesCount} moves`);
      writeResult();
    }

  }
}

function Person(Name, Result, Moves) {
  this.Name = Name;
  this.Result = Result;
  this.Moves = Moves;
}

function writeResult() {
  const currentResult = new Person(activePlayer, winner, movesCount);
  tableResults[activePlayer + movesCount] = currentResult;
  let serialObj = JSON.stringify(tableResults);
  //выкинуть ненужное и оставить 10
  localStorage.setItem("LidaChkFourInRowTable", serialObj);
}


function compare(el1, el2) {
  //console.log(el1, el2)
  if (el1[1].Result == 'DrawGame' && el2[1].Result == 'DrawGame')
    return el1[1].Moves - el2[1].Moves;

  if (el1[1].Result == 'DrawGame' && el2[1].Result != 'DrawGame')
    return el1[1].Moves - el2[1].Moves + 1000;

  if (el1[1].Result != 'DrawGame' && el2[1].Result == 'DrawGame')
    return el1[1].Moves - el2[1].Moves - 1000;

  if (el1[1].Result != 'DrawGame' && el2[1].Result != 'DrawGame')
    return el1[1].Moves - el2[1].Moves;

  return -1;
}

function  openTable(){
  wrapperTable.style.opacity = '1';
  wrapperTable.style.zIndex = '3';
  if(wrapperTable.querySelector('table-head'))
  {
    destroyTable();
  }else{
    generateTable();
  }
  
}

function generateTable() {
  resTable.innerHTML =
    `<tr class="table-head">
  <th>Place</th>
  <th>Name</th>
  <th>Winner</th>
  <th>Moves</th>
</tr>`;
  let i = 0;

  Object.entries(tableResults).sort(compare).forEach(element => {
    let row = resTable.insertRow();
    let cell = row.insertCell();
    let text = document.createTextNode(i);
    cell.appendChild(text);
    i++;
    //console.log(element);
    for (key in element[1]) {
      let cell = row.insertCell();
      //console.log(key, element[1][key])
      let text = document.createTextNode(element[1][key]);
      cell.appendChild(text);
    }
  });

  wrapperTable.addEventListener("click", destroyTable);
}

function destroyTable() {
  wrapperTable.removeEventListener("click", destroyTable, false);
  wrapperTable.style.opacity = '0';
  wrapperTable.style.zIndex = '-3';
  resTable.innerHTML='';
}

gameFlow();