const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 600
canvas.height = canvas.width


class Cell{
    constructor({position,size}){
        this.condition = "Green"
        this.width = (canvas.width/size)
        this.coord = {x:position.x*this.width,y:position.y*this.width}
        this.draw()
    }
    setCoord({position}){
        this.coord = {x:position.x*this.width,y:position.y*this.width}
    }
    draw(){
        ctx.fillStyle = this.condition
        ctx.fillRect(this.coord.x,this.coord.y,this.width,this.width)
        ctx.strokestyle = "Black"
        ctx.strokeRect(this.coord.x,this.coord.y,this.width,this.width)
    }
}

class Piece{
    constructor({position,size}){
        this.width = canvas.height/size
        this.coord = {x:position.x*this.width,y:position.y*this.width}
        this.drawPiece()
    }
    setCoord({position}){
        this.coord = {x:position.x*this.width,y:position.y*this.width}
    }
    drawPiece(){
        ctx.beginPath()
        ctx.arc(this.coord.x+this.width/2,this.coord.y+this.width/2,(this.width-10)/2,2*Math.PI,false)
        ctx.lineWidth=2
        ctx.fillStyle='Yellow'
        ctx.fill()
        ctx.stroke()
    }

}
class Board{
    constructor({n}){
        this.size = n
        this.board = []
        this.createBoard()
        this.piece = new Piece({position:{x:0,y:0},size:this.size})
        this.position = {x:0,y:0}
        this.movehistory = [{position:this.position}]
    }
    createBoard(){
        for(let i=0;i<this.size;i++){
            this.board.push([])
            for(let j=0;j<this.size;j++){
                this.board[i].push(new Cell({position:{x:i,y:j},size:this.size}))
            }
        }
        //console.log(this.board)
    }
    isSolved(){
        for(let i=0;i<this.size;i++){
            for(let j=0;j<this.size;j++){
                if(this.board[i][j].condition == "Green"){
                    return false
                }
            }
        }
        return true
    }
    checkEmpty({position}){
        if((position.x<this.size)&&(position.y<this.size)&&(position.x>=0)&&(position.y>=0)){
            if((this.board[position.x][position.y].condition === "Green")){
                return true
            }else{
                return false
            }
        }
    }
    setConditionRed({position}){
        this.movehistory.push(position)
        this.board[position.x][position.y].condition = "Red"
        this.reDrawBoard()
        this.piece.setCoord({position})
        this.piece.drawPiece()
    }
    reDrawBoard(){
        for(let i=0;i<this.size;i++){
            for(let j=0;j<this.size;j++){
                this.board[i][j].draw()
            }
        }
    }
    posibleMoves(){
        var arrPosibleMoves = []
        if(this.position.x+1 < this.size){
            if(board.checkEmpty({position:{x:this.position.x+1,y:this.position.y}})){
                arrPosibleMoves.push({position:{x:this.position.x+1,y:this.position.y}})
            }
        }
        if(this.position.x-1>=0){
            if(board.checkEmpty({position:{x:this.position.x-1,y:this.position.y}})){
                arrPosibleMoves.push({position:{x:this.position.x-1,y:this.position.y}})
            }
        }
        if(this.position.y+1 < this.size){
            if(board.checkEmpty({position:{x:this.position.x,y:this.position.y+1}})){
                arrPosibleMoves.push({position:{x:this.position.x,y:this.position.y+1}})
            }
        }
        if(this.position.y-1>=0){
            if(board.checkEmpty({position:{x:this.position.x,y:this.position.y-1}})){
                arrPosibleMoves.push({position:{x:this.position.x,y:this.position.y-1}})
            }
        }
        return arrPosibleMoves
    }

}


const board = new Board({n:2})
const boards = []
var pos = board.posibleMoves()

for(let h=0;h<pos.length;h++){
    boards.push(new Board({n:2}))
    boards[h].position = pos[h]
    console.log(boards[h])
    console.log(boards[h].posibleMoves())
}