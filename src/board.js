/*
@File: Javascript Solver for the 8Puzzle Game    
@Author : João Amaro de Assunção Bisneto

*/
class Board{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.profile = [1,2,3,4,5,6,7,8,0];
    }


    /*
1       Linear Shuffle Algorithm
    */
    shuffle(){
        for(var i = 0; i < 9; i++){
            var j = Math.floor((Math.random() * 9));
            var temp = this.profile[i];
            this.profile[i] = this.profile[j];
            this.profile[j] = temp;
        }
    }


    /*
        Checks the solvability of the board
    */
    isSolvable(){
        var inversions = 0;
        for(var i = 0 ; i < this.profile.length; i++){
            for(var j = i + 1 ; j < this.profile.length; j++){
                if(this.profile[i] != 0 && this.profile[j] != 0 && this.profile[i] > this.profile[j]) inversions++;
            }
        }
        return (inversions % 2 == 0);
    }

    draw(color){
        for(let i = 0 ; i < 3 ; i++){
            for(let j = 0; j < 3; j++){
                fill(color);
                stroke(0,0,255);
                rect((i * this.width/3), (j * this.height / 3), 200, 200);
            }
        }
        for(let i = 0; i < 3 ; i++){
            for(let j = 0 ; j < 3; j++){
                textSize(100);
                if(this.profile[i*3 + j] != 0){
                    fill(BLACK);
                    text(this.profile[i*3 + j],(j * this.height / 3),(i * this.width/3), 200, 200);
                }
            }
        }
    }
}
