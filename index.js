console.log("Welcome to Peg Solitaire, Dev Screen")

main = () => {
    let A1 = document.getElementById("A1");
    A1.addEventListener("click", ()=>{
        A1.innerHTML = "O";
    })

    A1.addEventListener("mouseover", ()=>{
        A1.innerHTML = "O";
    })
    A1.addEventListener("mouseout", ()=>{
        A1.innerHTML = "X";
    })
}

class PegSolitaire {
    firstMove = true;
    activeMove = false;

    constructor() {

        this.rowZero = [this.buildPeg("A0")];
        this.rowOne = [this.buildPeg("B0"), this.buildPeg("B1")];
        this.rowTwo = [this.buildPeg("C0"), this.buildPeg("C1"), this.buildPeg("C2")];
        this.rowThree = [this.buildPeg("D0"), this.buildPeg("D1"), this.buildPeg("D2"), this.buildPeg("D3")];
        this.rowFour = [this.buildPeg("E0"), this.buildPeg("E1"), this.buildPeg("E2"), this.buildPeg("E3"), this.buildPeg("E4")];
        this.board = [this.rowZero, this.rowOne, this.rowTwo, this.rowThree, this.rowFour];
    }

    buildPeg = (name)  => {
        return new Peg(name);
    }

    setUpClicks = () => {
        this.board.forEach(row => {
            row.forEach(piece => {
                //let piece = document.getElementById(element.name);
                piece.boardElement.addEventListener("click", ()=>{
                    if(this.firstMove) {
                        piece.boardElement.innerHTML = "O";
                        piece.isActive = false;
                        this.firstMove = false;
                    }

                    else if(this.isAvailableToMove(piece)) {
                        let moves = this.findMoves(piece);
                        moves[0][1].boardElement.style.color = "Green";
                        console.log(moves);
                    }
                })
            })
        })
    }

    isAvailableToMove = (element) => {
        return (!this.firstMove && !this.activeMove && element.isActive)
    }

    findMoves = (piece) => {
        let letter = piece.name.slice(0,1);
        let currentRow = this.findCurrentRow(letter);

        let number = piece.name.slice(1);
        
        if(currentRow == this.board[0]) {
            console.log("Finding moves for A0")
            return this.findMovesA0();
        } else
        if(currentRow == this.board[1]) {
            return this.findMovesB(number);
        }

    }

    findMovesB = (number) => {
        if(number=="0") return this.findMovesB0();
        if(number=="1") return this.findMovesB1();
    }

    findMovesB0 = () => {
        let moves = []
        if(this.board[2][0].isActive && !this.board[3][0].isActive) moves.push( [this.board[2][0], this.board[3][0]] );
        if(this.board[2][1].isActive && !this.board[3][2].isActive) moves.push( [this.board[2][1], this.board[3][2]] );
        return moves;
    }

    findMovesB1 = () => {
        let moves = []
        if(this.board[2][1].isActive && !this.board[3][1].isActive) moves.push( [this.board[2][1], this.board[3][1]] );
        if(this.board[2][2].isActive && !this.board[3][3].isActive) moves.push( [this.board[2][2], this.board[3][3]] );
        return moves;
    }

    findMovesA0 = () => {
        let moves = []
        if(this.board[1][0].isActive && !this.board[2][0].isActive) moves.push( [this.board[1][0], this.board[2][0]] );
        if(this.board[1][1].isActive && !this.board[2][2].isActive) moves.push( [this.board[1][1], this.board[2][2]] );
        return moves;
    }

    findCurrentRow = (letter) => {
        if(letter==="A") return this.rowZero;
        else if(letter==="B") return this.rowOne;
        else if(letter==="C") return this.rowTwo;
        else if(letter==="D") return this.rowThree;
        else if(letter==="E") return this.rowFour;
    }

}

class Peg {
    constructor(name) {
        this.name = name
        this.isActive = true;
        this.boardElement = document.getElementById(name);
        this.htmlText = this.boardElement.innerHTML
    }
}

window.onload= () => {
    let start = new PegSolitaire();
    start.setUpClicks();
}