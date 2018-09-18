# 8Puzzle Solver

The Project target is to create a solver for the 8Puzzle game using concepts and algorithms learned at Intelligent Systems class

## The Game : 
![8 Puzzle Exmample](https://i.imgur.com/ztxrkkN.png)

The Objective is to put the numbers in sequence [1,2,3,4,5,6,7,8,blank] and you can only move the blank square in vertical and horizontal directions.


## Getting Started

All the extern Libraries are already in the /libs folder so all you need is a webserver to serve the index.html with the javascript.
I personally recommend using VSCode with the LiveServer Extension, it makes life so much easier :+1:

or you can access the project through github pages [clicking here](https://joaoaab.github.io/8PuzzleSolver/)

## What it does
Currently it applies two complete algorithm to solve the puzzle
* [A* or A Star](https://en.wikipedia.org/wiki/A*_search_algorithm)
* [BFS - Breadth First Search](https://en.wikipedia.org/wiki/Breadth-first_search)
* [BestFirstSearch / Greedy Algorithm](https://en.wikipedia.org/wiki/Best-first_search) a approach very similar to A*, but it doens't take into acocunt the steps needed to get to this state(i.e its height) so in more complex cases it's very close to BFS performance

**The BFS algorithm uses too much ram and time to solve it, so i don't recommend testing it with a very complex board.**

## How it is implemented
To show the board game on screen i use P5js to draw rectangles and text

There are 2 main classes on the project
* Node - as the name says, it is used to implement free nodes that later are linked to each other and are used to store the state of the board, a "child" is a Node that is derived from the current Node, the child board is the board after 1 movement and its height is parent.height + 1.
* Solver - Uses the Node class to implement the famous **A*** and **BFS** algorithms.

## A*
A Star is a well known pathfinding algorithm, it's idea is keeping two lists, where the openlist needs to be sorted (or be a heap or priority queue) 

the pseudocode is as follows

![A*](https://i.imgur.com/RZy66nu.png)
## BFS
BFS is also a well known graph transversal algorithm, it's approach is to "visit" each node in a layer before going to the next layer
[Click here for Pseudocode and visualization of the BFS algorithm](https://en.wikipedia.org/wiki/Breadth-first_search)


## Heuristics
A* is a heuristic search, it uses a heuristic value to order the lists of nodes so i had to implement some heuristics to test

* [Manhattan Distance](https://en.wiktionary.org/wiki/Manhattan_distance)(inspired by new york's streets) is the distance from (xi, yi) to (xTarget, yTarget) in a grid-like environment(through the streets)
* [Hamming Distance](https://en.wikipedia.org/wiki/Hamming_distance) is the difference between the completed board and the current board, a.k.a how many tiles are misplaced



## TODO
in order of importance : 
- [ ] Implement some sort of parralellism so the rendering doesn't get stopped because the algorithm takes all the cpu time
- [X] After completing the puzzle, the solution should be displayed step by step.
- [ ] Implement a better UI so it's possible to set the board as you like, view all the steps of the solution
- [ ] Implement for bigger boards ?


## Authors

* **João Amaro de Assunção Bisneto** - *Initial Work* - [joaoaab](https://github.com/joaoaab)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
