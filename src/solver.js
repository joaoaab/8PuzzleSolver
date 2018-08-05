/*
@File: Javascript Solver for the 8Puzzle Game    
@Author : João Amaro de Assunção Bisneto

*/

let validMoves = [[false, false, true, true],
[true, false, true, true],
[true, false, false, true],
[false, true, true, true],
[true, true, true, true],
[true, true, false, true] ,
[false, true, true, false],
[true, true, true, false],
[true, true, false, false]];

var ITERATIONS = 0;

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

function comparer(a,b){
    if(b > a) return 1;
    else if(a == b) return 0;
    else return -1;
}


class Solver{
    constructor(board){
        this.board = Object.assign({}, board);
        this.frontier = new Node(Object.assign({}, board));
        this.solution = [];
    }

    setBoard(board){
        this.board = Object.assign({}, board);
        this.frontier = new Node(Object.assign({}, board));
    }

    isCompletedAI(board){
        for(var i  = 0; i < 8 ; i++){
            if(board[i] != i + 1){
                console.log(" i = " + i + " board[i] = " + board[i]);
                return false;
            }
        }
        return true;
    }


    aStart(){
        var heapOpen = new StablePriorityQueue(comparer);
        var heapClosed = new StablePriorityQueue(comparer);
        heapOpen.add(this.frontier);
        while(heapOpen.size > 0){
            ITERATIONS++;
            var V = heapOpen.poll();
            V.generateStates();
            if(this.isCompletedAI(V.board)){
                this.endPoint = V;
                break;
            }
            for(var i = 0 ; i < V.children.length; i++){
                V.children[i].height = V.height + 1;
                V.children[i].priority = V.children[i].height + V.children[i].manhattanHeuristic(V.children[i].board); 
                if(heapOpen.hasBetter(V.children[i].hash, V.children[i].priority)){
                    continue;
                }
                if(heapClosed.hasBetter(V.children[i].hash, V.children[i].priority)){
                    continue;
                }
                heapOpen.add(V.children[i]);
            }
            heapClosed.add(V);
        }
        return (this.endPoint.board);
    }

    /*
        Classic BFS Algorithm on a graph/tree
    */
    breadthFirstSearch(){
        var Q = new Queue();
        Q.add(this.frontier);
        var V;
        var endPoint;
        while(Q.size() > 0){
            ITERATIONS++;
            V = Q.last();
            Q.remove();
            V.generateStates();
            if(this.isCompletedAI(V.board)){
                endPoint = V;
                break;
            }
            for(var i = 0; i < V.children.length; i++){
                Q.add(V.children[i]);
            }
        }   
        console.log(endPoint);
        return (endPoint.board);
    }
}


class Node{
    constructor(board){
        this.children = [];
        this.parent = null;
        this.height = 0;
        this.board = Object.assign({} ,board);
        this.hash = this.hashIt();
        this.priority = this.manhattanHeuristic(this.board);
    }

    addChild(child){
        child.parent = this;
        child.height = this.height + 1;
        this.children.push(child);
    }

    hashIt(){
        var sum = 0;
        for(var i = 0; i < 9 ; i++){
            sum += this.board[i]*Math.pow(10,i);
        }
        return sum;
    }


    /*
        Gets the index of the array which holds the blank digit
    */
    getIndexZero(){
        var index = 8;
        for(var i = 0 ; i < 9 ; i++){
            if(this.board[i] == 0){
                index = i;
            }
        }
        return index;   
    }

    /*
        Calculates the distance of the numbers from it's righteous place
    */
    manhattanHeuristic(board){
        var heuristicValue = 0;
        for(var i = 0; i < 9; i++){
            var value = board[i];
            var x = Math.floor(i / 3);
            var y = i % 3;
            var xTarget = 0;
            var yTarget = 0;
            if(value != 0){
                xTarget = Math.floor(value/3);
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
        var movesAvaliable = validMoves[indexZero];
        var swapVar;
        var newBoard;
        if(movesAvaliable[0]){
            newBoard = Object.assign({}, this.board);
            swapVar = newBoard[indexZero]
            console.log("trade : " + newBoard[indexZero] + " <-> " + newBoard[indexZero - 1]);
            newBoard[indexZero] = newBoard[indexZero - 1];
            newBoard[indexZero - 1] = swapVar;
            this.addChild(new Node(newBoard));
        }
        if(movesAvaliable[1]){
            newBoard = Object.assign({}, this.board);
            swapVar = newBoard[indexZero];
            console.log("trade : " + newBoard[indexZero] + " <-> " + newBoard[indexZero - 3]);
            newBoard[indexZero] = newBoard[indexZero - 3];
            newBoard[indexZero - 3] = swapVar;
            this.addChild(new Node(newBoard));
        }
        if(movesAvaliable[2]){
            newBoard = Object.assign({}, this.board);
            swapVar = newBoard[indexZero];
            console.log("trade : " + newBoard[indexZero] + " <-> " + newBoard[indexZero + 1]);
            newBoard[indexZero] = newBoard[indexZero + 1];
            newBoard[indexZero + 1] = swapVar;            
            this.addChild(new Node(newBoard));
        }
        if(movesAvaliable[3]){
            newBoard = Object.assign({}, this.board);
            swapVar = newBoard[indexZero];
            console.log("trade : " + newBoard[indexZero] + " <-> " + newBoard[indexZero - + 3]);
            newBoard[indexZero] = newBoard[indexZero + 3];
            newBoard[indexZero + 3] = swapVar;
            this.addChild(new Node(newBoard));
        }
    }
}