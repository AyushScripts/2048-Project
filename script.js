let board;
let score=0;
let rows=4;
let cols=4;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for(let r = 0; r< rows; r++){
        for(let c = 0; c < cols; c++){
            // creates the "tile" div which wasn't created on HTML
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile,num);
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();

}

function hasEmptyTile() {
    for(let r = 0; r< rows; r++){
        for(let c = 0; c< cols; c++){
            if(board[r][c] == 0){
                return true;
            }
        }
    }
    return false;
}

function setTwo() {
    if(!hasEmptyTile()) {
        return;
    }
    let found = false;
    while(!found){
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * cols);

        if(board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if(num>0){
        tile.innerText = num;
        if(num<=4096) {
            tile.classList.add("x"+ num.toString());
        } else{
            tile.classList.add("x8192");
        }
    }
}

// now the sliding logic

document.addEventListener('keyup', (e)=>{
    if(e.code == "ArrowLeft") {
        slideLeft();
        setTwo();
    }
    else if(e.code == "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if(e.code == "ArrowUp") {
        slideUp();
        setTwo();
    } else if(e.code == "ArrowDown") {
        slideDown();
        setTwo();
    } 
    document.getElementById("score").innerText = score;

})

function filterZero(row) {
    return row.filter(num => num !=0); //creates a new array without zeroes
}

function slide(row) {
    // for eg [0, 2, 2, 2]
    row = filterZero(row); //get rid of zeroes

    //slide
    for(let i = 0; i< row.length-1; i++){
        //check every 2
        if(row[i] == row[i+1]) {
            row[i] *=2;
            row[i+1] = 0;
            score +=row[i];
        } //now it will look like [4, 0, 2]
    }
    //now again remove the zero
    row = filterZero(row); // [4, 2]

    //now add back zeroes to last
    while(row.length < cols){
        row.push(0); // this gives [4, 2, 0, 0]
    }

    return row;
}

function slideLeft() {
    for(let r = 0; r< rows; r++){
        let row = board[r];
        row = slide(row);
        board[r]= row;

        for(let c = 0; c < cols; c++) {
            let tile = document.getElementById(r.toString() + "-" +c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for(let r = 0; r< rows; r++){
        let row = board[r];
        row.reverse(); //reversing the slideleft func. will give us slideright
        row = slide(row);
        row.reverse();
        board[r]= row;

        for(let c = 0; c < cols; c++) {
            let tile = document.getElementById(r.toString() + "-" +c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for(let c = 0; c< cols; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]]
        row = slide(row);
        for(let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" +c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for(let c = 0; c< cols; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]]
        row.reverse();
        row = slide(row);
        row.reverse();
        for(let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" +c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}