let board;
let configuration;

function setup(){
    createCanvas(WIDTH, HEIGHT);
    board = new Board(WIDTH, HEIGHT);
    configuration = new Configuration(300,300,200);
}

function draw(){
    background(127, 0, 0 , 255);
    board.draw();
}