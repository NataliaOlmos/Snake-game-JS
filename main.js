let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
//ctx.fillRect(0,0,512, 512)

let interval
let snake
let frames = 0
let direction = "right" //enums en vez de booleanos, strings
let random 

class Block {
    constructor(config = {}) {
        this.x = config.x || 10
        this.y = config.y || 10
        this.size = config.size || 20
        this.width = this.size
        this.height = this.size
        this.color = config.color || "#A66375"
    }

    draw = () => {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size)
        ctx.fillStyle = "black"
        ctx.strokeRect(this.x * this.size, this.y * this.size, this.size, this.size)
    }

    isTouching = (item) => {
        return (this.x * this.size < item.x * item.size + item.width) &&
            (this.x * this.size + this.width > item.x * item.size) &&
            (this.y * this.size < item.y * item.size + item.height) &&
            (this.y * this.size + this.height > item.y * item.size);
    }
}

snake = [new Block(), new Block(), new Block()]
random = generateRandomBlock()

function start() {
    interval = setInterval(update, 500)
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "black"
    ctx.fillRect(0,0, canvas.width, canvas.height)
    drawSnake()
    moveSnake()
    random.draw()
    checkCollition()
}

function stop() {

}

function moveSnake() {

    if((snake[0].x*snake[0].size)>canvas.width) snake[0].x = 0
    if((snake[0].y*snake[0].size)>canvas.height) snake[0].y = 0
    if((snake[0].x*snake[0].size)<0) snake[0].x = canvas.width/snake[0].size
    if((snake[0].y*snake[0].size)<0) snake[0].y = canvas.height/snake[0].size



    switch (direction) {
        case "right":
            return snake[0].x++
        case "down":
            return snake[0].y++
        case "left":
            return snake[0].x--
        case "up":
            return snake[0].y--
    }
}

function drawSnake() {
    snake.forEach(block => block.draw())
    let tail = snake.pop()
    tail.x = snake[0].x
    tail.y = snake[0].y
    snake.unshift(tail)
}

function checkCollition(){
    if(snake[0].isTouching(random)){
        random = generateRandomBlock()
        snake.push(new Block({x:snake[0].x,y:snake[0].y}))
    }
}

function generateRandomBlock(){
    let number = Math.floor(Math.random()*25)
    return new Block({x:number, y:number, color:"#599c8a"})
}



addEventListener('keydown', ({keyCode})=>{
    if(keyCode===39) direction = "right"
    if(keyCode===40) direction = "down"
    if(keyCode===37) direction = "left"
    if(keyCode===38) direction = "up"
})


start()

