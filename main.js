const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 600
canvas.height = canvas.width

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

class Cell{
    constructor({position,size}){
        this.position = position
        this.condition = "Green"
        this.width = (canvas.width/size)
        this.draw()
    }
    draw(){
        ctx.fillStyle = this.condition
        ctx.fillRect(this.position.x,this.position.y,this.width,this.width)
        ctx.strokestyle = "Black"
        ctx.strokeRect(this.position.x,this.position.y,this.width,this.width)
    }
}

class Piece{
    constructor({position,width}){
        this.position = position
        this.width = width
        this.drawPiece()
    }
    drawPiece(){
        ctx.beginPath()
        ctx.arc(this.position.x+this.width/2,this.position.y+this.width/2,(this.width-10)/2,2*Math.PI,false)
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
        this.piece = new Piece({position:{x:0,y:0},width:canvas.width/this.size})
    }
    createBoard(){
        for(let i=0;i<this.size;i++){
            this.board.push([])
            for(let j=0;j<this.size;j++){
                this.board[i].push(new Cell({position:{x:i*(canvas.width/this.size),y:j*(canvas.height/this.size)},size:this.size}))
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
        this.board[position.x][position.y].condition = "Red"
        this.reDrawBoard()
        this.piece.position = {x:position.x*this.piece.width,y:position.y*this.piece.width}
        this.piece.drawPiece()
    }
    reDrawBoard(){
        for(let i=0;i<this.size;i++){
            for(let j=0;j<this.size;j++){
                this.board[i][j].draw()
            }
        }
    }
}


const board = new Board({n:3})

var i=0
var j=0
board.setConditionRed({position:{x:i,y:j}})
var solutions = []


async function solve(){
    var arr = []
    arr.push({x:i,y:j})
    while(!board.isSolved()){
        await delay(0.5)
        if(board.checkEmpty({position:{x:i+1,y:j}})){
            board.setConditionRed({position:{x:i+1,y:j}})
            i = i+1
        }else if(board.checkEmpty({position:{x:i-1,y:j}})){
            board.setConditionRed({position:{x:i-1,y:j}})
            i = i-1
        }else if(board.checkEmpty({position:{x:i,y:j+1}})){
            board.setConditionRed({position:{x:i,y:j+1}})
            j = j+1
        }else if(board.checkEmpty({position:{x:i,y:j-1}})){
            board.setConditionRed({position:{x:i,y:j-1}})
            j = j-1
        }
        arr.push({x:i,y:j})
    }
    console.log(arr)
}
solve()

