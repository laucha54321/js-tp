
//#region Board
const cantidadCasillas = 3
var solution = []


class Board{
    constructor(n,position){
        this.size = n
        this.moveHistory = []
        this.solved = false
        this.piecePosition
        this.board = this.createNewBoard()
        this.setPiece(position)
    }
    createNewBoard(){
        var arr = []
        for(let i=0; i<this.size; i++){
            arr.push([])
            for(let j=0;j<this.size;j++){
                arr[i].push('Green')
            }
        }
        return arr
    }
    setPiece(position){
        this.board[position.x][position.y] = 'Red'
        this.moveHistory.push(position)
        this.piecePosition = position
    }
    posibleMoves(){
        var arrPosibleMoves = []
        if(this.piecePosition.x+1 < this.size){
            if(this.board[this.piecePosition.x+1][this.piecePosition.y]==='Green'){
                arrPosibleMoves.push({x:this.piecePosition.x+1,y:this.piecePosition.y})
            }
        }
        if(this.piecePosition.x-1>=0){
            if(this.board[this.piecePosition.x-1][this.piecePosition.y]==='Green'){
                arrPosibleMoves.push({x:this.piecePosition.x-1,y:this.piecePosition.y})
            }
        }
        if(this.piecePosition.y+1 < this.size){
            if(this.board[this.piecePosition.x][this.piecePosition.y+1]==='Green'){
                arrPosibleMoves.push({x:this.piecePosition.x,y:this.piecePosition.y+1})
            }
        }
        if(this.piecePosition.y-1>=0){
            if(this.board[this.piecePosition.x][this.piecePosition.y-1]==='Green'){
                arrPosibleMoves.push({x:this.piecePosition.x,y:this.piecePosition.y-1})
            }
        }
        return arrPosibleMoves
    }
    copyAsShallow(board_param){
        this.size = [board_param.size]
        this.moveHistory = [...board_param.moveHistory]
        for(let i=0;i<this.size;i++){
            for(let j=0;j<this.size;j++){
                this.board[i][j]=board_param.board[i][j]
            }
        }
    }
    isSolved(){
        for(let i=0;i<this.size;i++){
            for(let j=0;j<this.size;j++){
                if(this.board[i][j]==='Green'){
                    return false
                }
            }
        }
        this.solved = true
        return true
    }
}
var boards = [new Board(cantidadCasillas,{x:0,y:0})]

solve(boards[0])

function solve(board_param){ // la funcion se llama a ella misma mientras existan nuevas posibilidades  
    var arr = []            //  y hace un print de como se va resolviendo el tablero
    var pos = board_param.posibleMoves()
    for(let i=0; i<pos.length;i++){
        var aux = new Board(cantidadCasillas,{x:0,y:0})
        aux.copyAsShallow(board_param) // hago un nuevo Board igual al anterior
        aux.setPiece(pos[i])    // y muevo en ese board una de las posibilidades
        arr.push(aux)          // y lo agrego al array
    }   // genero un nuevo board por cada posibilidad es una ramificacion
    for(let i=0; i<arr.length;i++){
        solve(arr[i])
    }
    for(let i=0;i<arr.length;i++){
        if(arr[i].isSolved()){
        console.log(arr[i])
        solution.push(arr[i])
        }
    }
}
//#endregion

//#region Graphics
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800
canvas.height = canvas.width

boardSize = canvas.width/solution.length
cellsize = Math.floor((boardSize-12)/cantidadCasillas)

class drawBoard{
    constructor(n,offset){
        this.size = n
        this.offset = offset
        this.arrayBoard = this.createDrawBoard()
    }
    createDrawBoard(){
        var arr = []
        for(let i=0; i<this.size; i++){
            arr.push([])
            for(let j=0;j<this.size;j++){
                arr[i].push('Green')
                this.draw('Green',{x:i,y:j})
            }
        }
        return arr
    }
    setRed(position){
        this.arrayBoard[position.x][position.y] = 'Red'
        this.draw('Red',position)
    }
    draw(condition,position){
        ctx.fillStyle = condition
        ctx.fillRect(position.x*cellsize+this.offset.x,position.y*cellsize+this.offset.y,cellsize,cellsize)
        ctx.strokestyle = "Black"
        ctx.strokeRect(position.x*cellsize+this.offset.x,position.y*cellsize+this.offset.y,cellsize,cellsize)
    }
}
function createBoards(n){
    var arr = []
    for(let i=0; i<n; i++){
        arr.push([])
        for(let j=0;j<n;j++){
            arr[i].push(new drawBoard(n,{x:i*boardSize,y:j*boardSize}))
        }

    }
    return arr
}
var boardsss = createBoards(Math.floor(Math.sqrt(solution.length))+1)

//#endregion


//#region display solution
function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}


async function displaySolution(){
    for(let t=0;t<solution[0].moveHistory.length;t++){
        for(let i=0;i<Math.floor(Math.sqrt(solution.length))+1;i++){
            for(let j=0;j<Math.floor(Math.sqrt(solution.length))+1;j++){
                if((i+j)<4){
                    await delay(0.2)
                    boardsss[i][j].setRed(solution[(i*(Math.floor(Math.sqrt(solution.length))+1))+j].moveHistory[t])

                }
            }
        }
    }
}

displaySolution()



//#endregion