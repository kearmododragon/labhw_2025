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

/*----- functions -----*/
init ()
function init(){
        // console.log("init")
    board = [
        [1,-1,0,0,0,0], // column 0
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
function renderMessage(){
    if(winner === "T"){
        messageEl.textContent = `It's a tie!`
    } else if(winner){
        let currentPlayer=COLORS[winner]
        messageEl.innerHTML = `<span style="color: ${currentPlayer};">${currentPlayer.toUpperCase()}</span> Wins!`
    }else {
        let currentPlayer=COLORS[turn]
        messageEl.innerHTML = `<span style="color: ${currentPlayer};">${currentPlayer.toUpperCase()}</span>'s turn...`
    }
}
function renderMarkers() {
  markerEls.querySelectorAll('div').forEach(marker => {
    marker.style.borderTopColor = COLORS[turn];
  });
}
function renderControls(){
    playAgainEl.style.visibility = winner ? "visible": "Hidden"
    const markers = markerEls.querySelectorAll('div')
    markers.forEach(function(markerEl, idx){
        // console.log(markerEl)
        const isFull = !board[idx].includes(0) ? "Hidden" : "visible"
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
    console.log ("next position", colArr.indexOf(0))
    console.log(board)
    render()
}

//2 hours 24 mins into video
// https://generalassembly.zoom.us/rec/play/xM0usrhgVv7y0G6wPFnxrSSSsez0K8kQix-B0n64ynGqxqChe0Y1Cqassg6HbaGy_G5TTs_xb9J-tmyD.PPWa9fKCmQ4qazh8?eagerLoadZvaPages=&isReferralProgramEnabled=false&isReferralProgramAvailable=false&accessLevel=meeting&canPlayFromShare=true&from=share_recording_detail&continueMode=true&componentName=rec-play&originRequestUrl=https%3A%2F%2Fgeneralassembly.zoom.us%2Frec%2Fshare%2Fqyz4LPE5fpgMW6gK6Z1cXPJqGNddEGlwX4U3Gtj5hckCkrTSTWEzkq1BJdAqubiF.gm0HbLeK629jbQ8r
// t=f7zBE1
