let board;
let configuration;
/*
let validMoves = [[false, false, true, true],
[true, false, true, true],
[true, false, false, true],
[false, true, true, true] ,
[true, true, true, true],
[true, true, false, true] ,
[false, true, true, false] ,
[true, true, true, false] ,
[true, true, false, false]];
*/


function setup(){
    createCanvas(WIDTH, HEIGHT);
    board = new Board(WIDTH, HEIGHT);
    configuration = new Configuration(300,300,200);
    solver = new Solver(board.profile);

    //Shuffle Click
    $('#shuffle').click(() => {
        board.shuffle();
        while(!board.isSolvable()){
            board.shuffle();
        }
    });

    $('#play').click(() => {
        var algorithm = $('#algorithm-select').val();
        console.log("Algorithm : " + algorithm);
        console.log(algorithm === 'BFS');
        if(algorithm  === "BFS"){
            console.log("Bfs Running");
            solver.setBoard(board.profile);
            board.profile = solver.breadthFirstSearch();
            console.log("BFS Finished");
        }
    });




}

function draw(){
    background(127, 0, 0 , 255);
    board.draw();
    // Draw FPS (rounded to 2 decimal places) at the bottom left of the screen
    var fps = frameRate();
    fill(BLACK);
    stroke(0);
    textSize(20);
    text("FPS: " + fps.toFixed(2) + " Iterations: " + ITERATIONS, 10, height - 10);
}

function mouseClicked(){
    if(mouseX <= WIDTH && mouseY <= HEIGHT){
        moveBoard();

    }
}


function moveBoard(){
    var j = Math.floor(mouseX/(HEIGHT/3));
    var i = Math.floor(mouseY/(WIDTH/3));
    var index = i*3 + j;
    var avaliableMoves = validMoves[index];
    if(board.profile[index] != 0){
        if(avaliableMoves[0]){
            if(board.profile[index - 1] == 0){
                board.profile[index - 1] = board.profile[index];
                board.profile[index] = 0;
            } 
        }
        if(avaliableMoves[1] != 0){
            if(board.profile[index - 3] == 0){
                board.profile[index - 3] = board.profile[index];
                board.profile[index] = 0;
            }
        }
        if(avaliableMoves[2] != 0){
            if(board.profile[index + 1] == 0){
                board.profile[index +1] = board.profile[index];
                board.profile[index] = 0;
            }
        }

        if(avaliableMoves[3] != 0){
            if(board.profile[index + 3] == 0){
                board.profile[index + 3] = board.profile[index];
                board.profile[index] = 0;
            }
        }
    }
}