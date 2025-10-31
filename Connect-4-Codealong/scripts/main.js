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
/*----- cached elements  -----*/
const markerEls = document.querySelector('#markers')
const messageEl = document.querySelector('h1')
const playAgainEl = document.querySelector('button')
/*----- event listeners -----*/
markerEls.addEventListener("click", handleDrop)
playAgainEl.addEventListener("click", init);


/*----- functions -----*/
init ()
function init(){
        // console.log("init")
    board = [
        [0,0,0,0,0,0], // column 0
        [0,0,0,0,0,0], // column 1
        [0,0,0,0,0,0], // column 2
        [0,0,0,0,0,0], // column 3
        [0,0,0,0,0,0], // column 4
        [0,0,0,0,0,0], // column 5
        [0,0,0,0,0,0], // column 6
    ]
    winner = null
    turn = 1
    render()
}
function render(){
        // console.log("render")
    renderBoard()
    renderMessage()
    renderMarkers()
    renderControls()
}
function renderBoard(){
    // console.log("rendering board")
    board.forEach(function(colArr, cIdx){
        colArr.forEach(function(cellValue, rIdx){
            const cellId = `c${cIdx}r${rIdx}`
            // console.log(cellId)
            const cellEl = document.getElementById(cellId)
            cellEl.style.backgroundColor = COLORS[cellValue]
        })
    }) 
    
}
function renderMessage() {
  if (winner === "T") {
    messageEl.textContent = `It's a tie!`;
  } else if (winner) {
    let currentPlayer = COLORS[String(winner)];
    messageEl.innerHTML = `<span style="color: ${currentPlayer};">${currentPlayer.toUpperCase()}</span> Wins!`;
  } else {
    let currentPlayer = COLORS[String(turn)];
    messageEl.innerHTML = `<span style="color: ${currentPlayer};">${currentPlayer.toUpperCase()}</span>'s turn...`;
  }
}

function renderMarkers() {
  markerEls.querySelectorAll('div').forEach(marker => {
    marker.style.borderTopColor = COLORS[turn];
  });
}
function renderControls(){
    playAgainEl.style.visibility = winner ? "visible": "hidden"
    const markers = markerEls.querySelectorAll('div')
    markers.forEach(function(markerEl, idx){
        // console.log(markerEl)
        if (winner) {
            markerEl.style.visibility = "hidden"
            return;
        }
        const isFull = !board[idx].includes(0) ? "hidden" : "visible"
        // console.log(isFull)
        markerEl.style.visibility = isFull
    })
}
function handleDrop(evt){
    console.log(evt.target)
    const markers = [...markerEls.querySelectorAll("div")]
    const position = markers.indexOf(evt.target)
    console.log(position)
    if (position === -1){
        return;
    } const colArr = board[position]
    const next = colArr.indexOf(0)
    colArr[next] = turn
    console.log(board)
    winner = getWinner(position, next);
    turn *= -1
    render();
}
function getWinner(colIdx, rowIdx){
    return checkVerticalWin (colIdx, rowIdx) ||
        checkHorizontalWin (colIdx, rowIdx) ||
        checkDiagonalWinNESW (colIdx, rowIdx) ||
        checkDiagonalWinNWSE (colIdx, rowIdx);
}

function checkDiagonalWinNWSE (colIdx, rowIdx){
    const adjCountnw = countAdjacent (colIdx, rowIdx, -1,1)
    const adjCountSE = countAdjacent (colIdx, rowIdx, 1, -1)
    return (adjCountnw + adjCountSE) >=3 ? board[colIdx] [rowIdx] : null
}

function checkDiagonalWinNESW (colIdx, rowIdx){
    const adjCountnw = countAdjacent (colIdx, rowIdx, 1,1)
    const adjCountSE = countAdjacent (colIdx, rowIdx, -1, -1)
    return (adjCountnw + adjCountSE) >=3 ? board[colIdx] [rowIdx] : null
}
function checkHorizontalWin (colIdx, rowIdx){
    const adjCountLeft = countAdjacent (colIdx, rowIdx, -1,0)
    const adjCountRight = countAdjacent (colIdx, rowIdx, 1, 0)
    return (adjCountLeft + adjCountRight) >=3 ? board[colIdx] [rowIdx] : null
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


