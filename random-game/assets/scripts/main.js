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


let turn = 'Player1';
let stopFlg = true;
let won = '';
let spinFlg = true;
let arrDice = ['one', 'two', 'three', 'four', 'five', 'six'];


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
    cell.innerHTML = '<h2>' + arrI[I] + '</h2>';
    cell.dataset.y = columnIndex;
    cell.dataset.x = rowIndex;
    cell.dataset.num = arrI[I];
    I++;
    cell.classList.add('cell');
    gameField.append(cell);
  }
}
/*----------------*/

/*DICE FIELD*/

/*----------------*/

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
  } else {
    setTimeout(rollDice, 300);
  }
};

function gameFlowPlayer(sPlayer) {
  rollDice();

}


function onDiceClick(){
  stopFlg = !stopFlg;
  if (!stopFlg) rollDice();
}

diceField.addEventListener("click", onDiceClick)