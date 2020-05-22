var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var x = canvas.width / 2;
var y = canvas.height / 2;
var box = 25;
var score = 0;
let snake = [];
var direction = "right";
snake[0] = { x: x, y: y }
snake[1] = { x: x - box, y: y }
food = {x: 10*box, y: 15*box}
function drawSnake() {
    for (let ptr = 0; ptr < snake.length; ptr++) {
        ctx.beginPath();
        ctx.rect(snake[ptr].x, snake[ptr].y, box, box);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}
function drawFood()
{
    ctx.beginPath();
    ctx.rect(food.x, food.y, box, box);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.closePath();
}
function drawScore()
{
    ctx.font = box+ "px Cursive";
    ctx.fillText(score,80,box);
}
function keyPressHandeller(e) {
    if ((e.keyCode == 37) && (direction != "right"))// left
    {
        direction = "left";
    }
    else if ((e.keyCode == 38) && (direction != "down"))// up
    {
        direction = "up";
    }
    else if (e.keyCode == 39 && direction != "left")// right
    {
        direction = "right";
    }
    else if (e.keyCode == 40 && direction != "up")// down
    {
        direction = "down";
    }
}
document.addEventListener('keydown', keyPressHandeller);

function moveSnake()
{
    let head = snake.pop();
    if(snake[0].x == food.x && snake[0].y == food.y)
    {
        snake.push({x: head.x, y: head.y});
        score++;
    }
    if(direction == "left")
    {
        head.x = snake[0].x- box;
        head.y = snake[0].y;
    }
    else if(direction == "up")
    {
        head.x = snake[0].x;
        head.y = snake[0].y - box;
    }
    else if(direction == "down")
    {
        head.x = snake[0].x;
        head.y = snake[0].y + box;
    }
    else
    {
        head.x = snake[0].x + box;
        head.y = snake[0].y;
    }
    snake.unshift(head);
}
function checkBoundary()
{
    if(snake[0].x > canvas.width-box || snake[0].x < 0 || snake[0].y > canvas.height-box || snake[0].y< box*2)
    {
        clearInterval(myGame);
        alert("game over");
        if(confirm("Want to play Again?"))
        {
            document.location.reload();
        }
    }
}
function drawBackGround() {
    var bgImage = new Image();
    bgImage.src = "items/background.png";
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
}
function game() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawBackGround();
    drawScore();
    drawFood();
    moveSnake();
    drawSnake();
    checkBoundary();
}
var myGame = setInterval(game, 100);