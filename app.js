/** Connect Four
*
* Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
* column until a player gets four-in-a-row (horiz, vert, or diag) or until
* board fills (tie)
*/

const WIDTH = 7;
const HEIGHT = 6;
const val = "test";
let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
*    board = array of rows, each row is array of cells  (board[y][x])
*/

function makeBoard() {
    for(let h = 0; h < HEIGHT;  h++){
        board.push(Array.from({length:WIDTH}));
    }
}
/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
    const htmlBoard = document.querySelector("#board");
    /* 	creates a table row at the top of the board 
    and then gives each an id as well as adding a click listener
    */
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click", handleClick);
    
    for (let x = 0; x < WIDTH; x++) {
        const headCell = document.createElement("td");
        headCell.setAttribute("id", x);
        top.append(headCell);
    }
    htmlBoard.append(top);
    
    //creates a board
    for (let y = 0; y < HEIGHT; y++) {
        const row = document.createElement("tr");
        for (let x = 0; x < WIDTH; x++) {
            const cell = document.createElement("td");
            cell.setAttribute("id", `${y}-${x}`);
            row.append(cell);
        }
        htmlBoard.append(row);
    }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
    // TODO: write the real version of this, rather than always returning 0
    for (let y = HEIGHT-1; y>=0; y--){	
        if(!board[y][x]){
            return y;
        }
    }
    return null;
};


/** placeInTable: update DOM to place piece into HTML table of board */
// TODO: make a div and insert into correct table cell
function placeInTable(y, x) {
    findSpotForCol(x);
    
    const cellID = document.getElementById(y+"-"+x);
    const makePiece  = document.createElement("div");
    makePiece.classList.add("piece","player"+currPlayer);
    cellID.appendChild(makePiece);
    
    
}

/** endGame: announce game end */

function endGame(msg) {
    // TODO: pop up alert message
    alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;
    
    // get next spot in column (if none, ignore click)
    const y = findSpotForCol(x);
    if (y === null) {
        return;
    }
    
    // place piece in board and add to HTML table
    // TODO: add line to update in-memory board
    board[y][x] = currPlayer
    placeInTable(y, x);
    
    // check for win
    if (checkForWin()) {
        return endGame(`Player ${currPlayer} won!`);
    }
    
    // check for tie

    /* if (board.every(function(row){
            return row.every(function(cell){
                return cell
            });
        })
    ){
        return endGame("Tie!")
    } */
    /* if (board.every(function(row){return row.every(function(cell){return cell});})){
        return endGame("Tie!")
    } */
    if (board.every(row => row.every(cell => cell))){
        return endGame("Tie!")
    }

    // switch players
    // TODO: switch currPlayer 1 <-> 2
    // how could i shorten this?
    if(currPlayer===1){ 
        currPlayer=2 
    }else if(currPlayer===2){ 
        currPlayer=1 
    }
}
/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
    function _win(cells) {
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer
        
        return cells.every(
            ([y, x]) =>
            y >= 0 &&
            y < HEIGHT &&
            x >= 0 &&
            x < WIDTH &&
            board[y][x] === currPlayer
            );
        }
        
        // TODO: read and understand this code. Add comments to help you.
        
        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                let horiz = [
                    [y, x],
                    [y, x + 1],
                    [y, x + 2],
                    [y, x + 3],
                ];
                let vert = [
                    [y, x],
                    [y + 1, x],
                    [y + 2, x],
                    [y + 3, x],
                ];
                let diagDR = [
                    [y, x],
                    [y + 1, x + 1],
                    [y + 2, x + 2],
                    [y + 3, x + 3],
                ];
                let diagDL = [
                    [y, x],
                    [y + 1, x - 1],
                    [y + 2, x - 2],
                    [y + 3, x - 3],
                ];
                
                if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                    return true;
                }
            }
        }
    }
    
    makeBoard();
    makeHtmlBoard();
    