const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 600
canvas.height = canvas.width

class Board{
    constructor(n,position){
        this.size = n
        this.board = this.createNewBoard()
        this.piecePosition = this.setPiece(position)
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
        return position
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
                arrPosibleMoves.push({x:this.position.x,y:this.position.y-1})
            }
        }
        return arrPosibleMoves
    }
    copyAsShallow(board_param){
        this.size = board_param.size
        for(let i=0;i<this.size;i++){
            for(let j=0;j<this.size;j++){
                this.board[i][j]=board_param.board[i][j]
            }
        }
    }

}
var board = new Board(2,{x:0,y:0})

var shallowcopy = new Board(2,{x:0,y:0})
console.log(shallowcopy)
console.log(board)
console.log(board.posibleMoves())
