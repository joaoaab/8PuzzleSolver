# 8Puzzle Solver

The Project target is to create a solver for the 8Puzzle game using concepts and algorithms learned at Intelligent Systems class

## The Game : 
![8 Puzzle Exmample](https://i.imgur.com/ztxrkkN.png)

The Objective is to put the numbers in sequence [1,2,3,4,5,6,7,8,blank] and you can only move the blank square in vertical and horizontal directions.


## Getting Started

All the extern Libraries are already in the /libs folder so all you need is a webserver to serve the index.html with the javascript.
I personally recommend using VSCode with the LiveServer Extension, it makes life so much easier :+1:

or you can access the project through the github pages [clicking here](https://joaoaab.github.io/8PuzzleSolver/)

## What it does
Currently it applies two complete algorithm to solve the puzzle
* [A* or A Star](https://en.wikipedia.org/wiki/A*_search_algorithm)
* [BFS - Breadth First Search](https://en.wikipedia.org/wiki/Breadth-first_search)

**The BFS algorithm uses too much ram and time to solve it, so i don't recommend testing it with a very complex board.**

## How it is implemented
There are 2 main classes on the project
* Node - as the name says, it is used to implement free nodes that later are linked to each other and are used to store the state of the board, a "child" is a Node that is derived from the current Node, the child board is the board after 1 movement and its height is parent.height + 1.
* Solver - Uses the Node class to implement the famous **A*** and **BFS** algorithms.

## TODO
in order of importance : 
- [ ] Implement some sort of parralellism so the rendering doesn't get stopped because the algorithm takes all the cpu time
- [ ] After completing the puzzle, the solution should be displayed step by step.
- [ ] Implement a better UI so it's possible to set the board as you like, view all the steps of the solution
- [ ] Implement for bigger boards ?


## Authors

* **João Amaro de Assunção Bisneto** - *Initial Work* - [joaoaab](https://github.com/joaoaab)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
