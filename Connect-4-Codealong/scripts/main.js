// console.log('testing')

/*----- constants -----*/
const COLORS = {
    "0" : "grey",
    "1" : "red",
    "-1" : "blue",
}

/*----- state variables -----*/
let board
let turn
let winner
let player1Color = '#ff2d55';
let player2Color = '#007aff';
let colorsLocked = false;
let score = { p1: 0, tie: 0, p2: 0 };

/*----- cached elements  -----*/
// Header / Player elements
const playerHeaderEl = document.getElementById('player-header');
const player1NameEl = document.getElementById('player1-name');
const player2NameEl = document.getElementById('player2-name');
const player1ColorInput = document.getElementById('player1-color');
const player2ColorInput = document.getElementById('player2-color');
const p1Preview = document.getElementById('p1-preview');
const p2Preview = document.getElementById('p2-preview');

// Game elements
const markerEls = document.querySelector('#markers')
const messageEl = document.querySelector('h1')
const playAgainEl = document.querySelector('button')

/*----- event listeners -----*/
// Game board listeners
markerEls.addEventListener("click", handleDrop);
playAgainEl.addEventListener("click", init);

// Player header listeners
player1ColorInput.addEventListener('input', () => {
  p1Preview.style.background = player1ColorInput.value;
  COLORS['1'] = player1ColorInput.value;
});
player2ColorInput.addEventListener('input', () => {
  p2Preview.style.background = player2ColorInput.value;
  COLORS['-1'] = player2ColorInput.value;
});


/*----- functions -----*/
init ();

function init(){
    board = [
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
    ];
    winner = null;
    turn = 1;
    colorsLocked = false;

    // Reset colors to picker values
    player1Color = player1ColorInput.value;
    player2Color = player2ColorInput.value;
    updateColorsMapping();
    setColorPickersVisibility(false);

    render();
}

function render(){
    renderBoard();
    renderMessage();
    renderMarkers();
    renderControls();
}

function renderBoard(){
    board.forEach(function(colArr, cIdx){
        colArr.forEach(function(cellValue, rIdx){
            const cellId = `c${cIdx}r${rIdx}`;
            const cellEl = document.getElementById(cellId);
            cellEl.style.backgroundColor = COLORS[cellValue];
        })
    }) 
}

function renderMessage() {
  const player1Name = player1NameEl.textContent || "Player 1";
  const player2Name = player2NameEl.textContent || "Player 2";

  if (winner === "T") {
    messageEl.textContent = `It's a tie!`;
  } else if (winner) {
    const winnerName = winner === 1 ? player1Name : player2Name;
    const winnerColor = COLORS[String(winner)];
    messageEl.innerHTML = `<span style="color:${winnerColor};">${winnerName}</span> Wins!`;
  } else {
    const currentName = turn === 1 ? player1Name : player2Name;
    const currentColor = COLORS[String(turn)];
    messageEl.innerHTML = `<span style="color:${currentColor};">${currentName}</span>'s turn...`;
  }
}

function renderMarkers() {
  markerEls.querySelectorAll('div').forEach(marker => {
    marker.style.borderTopColor = COLORS[turn];
  });
}
function renderControls(){
    playAgainEl.style.visibility = winner ? "visible": "hidden";

    const markers = markerEls.querySelectorAll('div');
    markers.forEach(function(markerEl, idx){
        if (winner) {
            markerEl.style.visibility = "hidden";
            return;
        }
        const isFull = !board[idx].includes(0) ? "hidden" : "visible";
        markerEl.style.visibility = isFull;
    })
}
function handleDrop(evt){
    const markers = [...markerEls.querySelectorAll("div")];
    const position = markers.indexOf(evt.target);
    if (position === -1) return;

    const colArr = board[position];
    const next = colArr.indexOf(0);
    colArr[next] = turn;
    // Lock colors after first move and update mapping
    if (!colorsLocked) {
        updateColorsMapping(); 
        setColorPickersVisibility(true);
    }
    winner = getWinner(position, next);
    if (!winner && board.every(col => !col.includes(0))) {
        winner = "T";
    }
    if(winner){
        updateScore(winner)
    }
    turn *= -1;
    render();
}
function getWinner(colIdx, rowIdx){
    return checkVerticalWin (colIdx, rowIdx) ||
        checkHorizontalWin (colIdx, rowIdx) ||
        checkDiagonalWinNESW (colIdx, rowIdx) ||
        checkDiagonalWinNWSE (colIdx, rowIdx);
}
function checkDiagonalWinNWSE (colIdx, rowIdx){
    const adjCountnw = countAdjacent (colIdx, rowIdx, -1,1);
    const adjCountSE = countAdjacent (colIdx, rowIdx, 1, -1);
    return (adjCountnw + adjCountSE) >=3 ? board[colIdx] [rowIdx] : null;
}
function checkDiagonalWinNESW (colIdx, rowIdx){
    const adjCountnw = countAdjacent (colIdx, rowIdx, 1,1);
    const adjCountSE = countAdjacent (colIdx, rowIdx, -1, -1);
    return (adjCountnw + adjCountSE) >=3 ? board[colIdx] [rowIdx] : null;
}
function checkHorizontalWin (colIdx, rowIdx){
    const adjCountLeft = countAdjacent (colIdx, rowIdx, -1,0);
    const adjCountRight = countAdjacent (colIdx, rowIdx, 1, 0);
    return (adjCountLeft + adjCountRight) >=3 ? board[colIdx] [rowIdx] : null;
}
function checkVerticalWin (colIdx, rowIdx){
    return countAdjacent(colIdx, rowIdx, 0, -1) === 3 ? board[colIdx][rowIdx] : null;
}
function countAdjacent (colIdx, rowIdx, colOffset, rowOffset){
    const player = board[colIdx][rowIdx];
    let count = 0;
    colIdx += colOffset;
    rowIdx += rowOffset;
    while (
        board[colIdx] !== undefined &&
        board[colIdx][rowIdx] !== undefined &&
        board[colIdx][rowIdx] === player
    ){
        count ++;
        colIdx += colOffset;
        rowIdx += rowOffset;
    }
    return count;
}
function updateColorsMapping() {
  COLORS["1"] = player1ColorInput.value;
  COLORS["-1"] = player2ColorInput.value;
}
function setColorPickersVisibility(locked) {
  colorsLocked = !!locked;
  if (colorsLocked) {
    playerHeaderEl.classList.add('colors-locked');
  } else {
    playerHeaderEl.classList.remove('colors-locked');
  }
}
function updateScore(winner) {
  if (winner === 1) score.p1++;
  else if (winner === -1) score.p2++;
  else if (winner === "T") score.tie++;

  document.getElementById('score-p1').textContent = score.p1;
  document.getElementById('score-tie').textContent = score.tie;
  document.getElementById('score-p2').textContent = score.p2;
}