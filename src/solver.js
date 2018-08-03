validMoves = [[false, false, true, true],
[true, false, true, true],
[true, false, false, true],
[false, true, true, true] ,
[true, true, true, true],
[true, true, false, true] ,
[false, true, true, false] ,
[true, true, true, false] ,
[true, true, false, false]];


function Queue(){
    this.data = [];
}

Queue.prototype.add = function(record){
    this.data.unshift(record);
}

Queue.prototype.remove = function(){
    this.data.pop();
}

Queue.prototype.first = function(){
    return this.data[0];
}

Queue.prototype.last = function(){
    return this.data[this.data.length - 1];
}

Queue.prototype.size = function(){
    return this.data.length;
}


class Solver{
    constructor(board){
        this.board = board;
        this.frontier = new Node(this.board);
        this.solution = [];
    }

    isCompletedAI(board){
        for(var i  = 0; i < 8 ; i++){
            if(board[i] != i + 1){
                return 0;
            }
        }
        return 1;
    }

    breadthFirstSearch(){
        var Q = new Queue();
        Q.add(this.frontier);
        var V;
        var endPoint;
        while(Q.size() > 0){
            V = Q.last();
            Q.remove();
            V.generateStates();
            if(isCompletedAI(V.board)){
                endPoint = V;
                break;
            }
            for(var i = 0; i < V.children.size(); i++){
                Q.add(V.children[i]);
            }
        }   
    }
}


class Node{
    constructor(board){
        this.children = [];
        this.parent = null;
        this.height = 0;
        this.board = board;
    }

    addChild(child){
        child.parent = this;
        this.children.push(child);
    }


    /*
        Gets the index of the array which holds the blank digit
    */
    getIndexZero(){
        var indexZero = 0;
        for(var i = 0 ; i < this.board.length ; i++){
            if(this.board[i] == 0){
                indexZero = i;
                break;
            }
        }
        return indexZero;
    }

    /*
        Calculates the distance of the numbers from it's righteous place
    */
    manhattanHeuristic(board){
        var heuristicValue = 0;
        for(var i = 0; i < board.length; i++){
            var value = board[i];
            var x = i / 3;
            var y = i % 3;
            var xTarget = 0;
            var yTarget = 0;
            if(value != 0){
                xTarget = value/3;
                yTarget = value - (xTarget*3);
            }
            else{
                xTarget = 2;
                yTarget = 3;
            }

            if(yTarget == 0){
                xTarget -= 1;
                yTarget = 2;
            }
            else{
                yTarget -= 1;
            }
            heuristicValue += abs(x - xTarget) + abs(y - yTarget);
        }
        return heuristicValue;
    }


    /*
        Generates the possible scenarios from the current board state
        given 1 move and then add it to the array of childrens of the node
    */
    generateStates(){
        var indexZero = this.getIndexZero();
        movesAvaliable = validMoves[indexZero];
        var swapVar;
        if(movesAvaliable[0]){
            newBoard = this.board;
            swapVar = newBoard[indexZero]
            newBoard[indexZero] = newBoard[indexZero - 1];
            newBoard[indexZero - 1] = swapVar;
            this.addChild(Node(parent=this,height = this.height + 1, newBoard));
        }
        if(movesAvaliable[1]){
            newBoard = this.board;
            swapVar = newBoard[indexZero];
            newBoard[indexZero] = newBoard[indexZero - 3];
            newBoard[indexZero - 3] = swapVar;
            this.addChild(Node(parent=this,height = this.height + 1, newBoard));
        }
        if(movesAvaliable[2]){
            newBoard = this.board;
            swapVar = newBoard[indexZero];
            newBoard[indexZero] = newBoard[indexZero + 1];
            newBoard[indexZero + 1] = swapVar;            
            this.addChild(Node(parent=this,height = this.height + 1, newBoard));
        }
        if(movesAvaliable[3]){
            newBoard = this.board;
            swapVar = newBoard[indexZero];
            newBoard[indexZero] = newBoard[indexZero + 3];
            newBoard[indexZero + 3] = swapVar;
            this.addChild(Node(parent=this,height = this.height + 1, newBoard));
        }
    }
}