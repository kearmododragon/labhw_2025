console.log('testing')

/*----- constants -----*/
const COLORS = {
    "0" : "grey",
    "1" : "red",
    "-1" : "blue"

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


/*----- functions -----*/
init ()
function init(){
        console.log("init")
    board = [
        [1,0,0,0,0,0], // column 0
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
        console.log("render")
    renderBoard()
}
function renderBoard(){
    console.log("rendering board")
    board.forEach(function(colArr, cIdx){
        colArr.forEach(function(cellValue, rIdx){
            const cellId = `c${cIdx}r${rIdx}`
            const cellEl = document.getElementById(cellId)
            cellEl.style.backgroundColor = COLORS[cellValue]
        })
    })
}
