class Board{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.profile = [1,2,3,4,5,6,7,8,0];
    }

    draw (){
        var color = WHITE;
        for(let i = 0 ; i < (this.width / 3) ; i++){
            for(let j = 0; j < (this.height / 3); j++){
                fill(color);
                stroke(0,0,255);
                rect((i * this.width/3), (j * this.height / 3), 200, 200);
                fill(BLACK);
            }
        }
        for(let i = 0; i < 3 ; i++){
            for(let j = 0 ; j < 3; j++){
                textSize(100);
                console.log(" i = " + i + " j = " + j);
                if(this.profile[i*3 + j] != 0){
                    text(this.profile[i*3 + j],(j * this.height / 3),(i * this.width/3), 200, 200);
                }
            }
        }
        

    }
}