const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 600
canvas.height = canvas.width

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

class Board{
    constructor({n}){
        this.size = n
        this.board = []
        this.createBoard()
    }
    createBoard(){
        for(let i=0;i<this.size;i++){
            this.board.push([])
            for(let j=0;j<this.size;j++){
                this.board[i].push(new Cell({position:{x:i*(canvas.width/this.size),y:j*(canvas.height/this.size)},size:this.size}))
            }
        }
        console.log(this.board)
        console.log(this.board)
    }
}



const board = new Board({n:3})