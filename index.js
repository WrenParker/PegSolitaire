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

    constructor() {
        this.rowOne = ["A1"]
        this.rowTwo = ["B1", "B2"]
        this.rowThree = ["C1", "C2", "C3"]
        this.rowFour = ["D1", "D2", "D3", "D4"]
        this.rowFive = ["E1", "E2", "E3", "E4", "E5"]
        this.board = [this.rowOne, this.rowTwo, this.rowThree, this.rowFour, this.rowFive]
    }

    setUpClicks() {
        this.board.forEach(row => {
            row.forEach(element => {
                let piece = document.getElementById(element);
                piece.addEventListener("click", ()=>{
                    if(this.firstMove)
                        piece.innerHTML = "O";
                        this.firstMove = false;
                })
            })
        })
        console.log("hello")
    }
}
window.onload= () => {
    let start = new PegSolitaire();
    start.setUpClicks();
}
