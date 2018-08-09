let board;
let configuration;
let solver;
let solutionFound = false;
let solution;

function setup(){
    createCanvas(WIDTH, HEIGHT);
    board = new Board(WIDTH, HEIGHT);
    configuration = new Configuration(300,300,200);
    solver = new Solver(board.profile);
    solutionFound = false;

    //Shuffle Click
    $('#shuffle').click(() => {
        board.shuffle();
        while(!board.isSolvable()){
            board.shuffle();
        }
    });

    $('#play').click(() => {
        ITERATIONS = 0;
        var algorithm = $('#algorithm-select').val();
        if(algorithm  === "BFS"){
            solver.setBoard(board.profile);
            solution = solver.breadthFirstSearch();
        }
        else if(algorithm === "A*"){
            solver.setBoard(board.profile);
            solution = solver.aStar();
        }
        solutionFound = true;
    });
}

function draw(){
    var color = WHITE;
    if(isCompleted(board.profile)){
        color = 'green';
    }
    else{
        color = 'red';
    }
    board.draw(color);
    // Draw FPS (rounded to 2 decimal places) at the bottom left of the screen
    var fps = frameRate();
    fill(BLACK);
    stroke(0);
    textSize(20);
    text("FPS: " + fps.toFixed(2) + " Iterations: " + ITERATIONS + "  Min Priority : " + MINPRIORITY, 10, height - 10);
    if(solutionFound){
        setTimeout(printSolution(), 1000);
        sleep(500);
    }

}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

function printSolution(){
    board.profile = solution[solution.length - 1];
    var i = solution.indexOf(board.profile);
    solution.splice(i,1);
    if(solution.length == 0){
        solutionFound = false;
    }
}


function mouseClicked(){
    if(mouseX <= WIDTH && mouseY <= HEIGHT){
        moveBoard();

    }
}


function isCompleted(board){
    for(var i = 0 ; i < 8; i++){
        if(board[i] != i + 1) return false;
    }
    return true;
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