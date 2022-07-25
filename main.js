const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 600
canvas.height = canvas.width

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
        return true
    }
}
var boards = [new Board(2,{x:0,y:0})]
solve(boards[0])

function solve(board_param){
    var arr = []
    var pos = board_param.posibleMoves()
    for(let i=0; i<pos.length;i++){
        var aux = new Board(2,{x:0,y:0})
        aux.copyAsShallow(board_param) // hago un nuevo Board igual al anterior
        aux.setPiece(pos[i])    // y muevo en ese board una de las posibilidades
        arr.push(aux)          // y lo agrego al array
    }   // genero un nuevo board por cada posibilidad es una ramificacion
    console.log(arr)
    for(let i=0; i<arr.length;i++){
        solve(arr[i])
    }
}
