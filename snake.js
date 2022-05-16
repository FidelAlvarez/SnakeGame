const canvas = document.getElementById('gameboard');
const ctx = canvas.getContext('2d');

class SnakePart{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

let speed = 15;

let tileCount = 20;
let tileSize = 20;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 1;

let appleX = 5;
let appleY = 5;

let xvel = 0;
let yvel = 0;

let score = 0;

const btn = document.querySelector('#refresh')

btn.addEventListener('click', () => {
  location.reload()
})

 //Game Loop

function drawGame() {
  changeSnakePosition();
  let result = isGameOver();
  if(result){
    return;
  }

  clearScreen();

  checkAppleColision();
  drawSnake();
  drawApple();

  drawScore();

  if(score > 2){
    speed = 16;
  }
  if(score > 4){
    speed = 17;
  }
  if(score > 8){
    speed = 18;
  }
  if(score > 12){
    speed = 19;
  }
  if(score > 15){
    speed = 20;
  }

  setTimeout(drawGame, 1000 / speed);
}

function isGameOver(){
  let gameOver = false;

  if(yvel === 0 && xvel === 0){
    return false;
  }

  //walls
  if(headX < 0){
    gameOver = true;
  }
  if(headX > 29){
    gameOver = true;
  }
  if(headY < 0){
    gameOver = true;
  }
  if(headY >= 30){
    gameOver = true;
  }

  for(let i =0; i < snakeParts.length; i++){
    let part = snakeParts[i];
    if(part.x === headX && part.y === headY){
      gameOver = true;
      break;
    }
  }

  if(gameOver) {
    ctx.font = "50px Verdana";
    
    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", " magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");

    ctx.fillStyle = gradient;
    ctx.fillText("Game Over!", canvas.width / 4, canvas.height / 2);
    }
    
    if(gameOver) {
      btn.classList.remove('appear');
    }

    return gameOver;

}

function drawScore(){
  ctx.fillStyle = "white";
  ctx.font = "10px Verdana";
  ctx.fillText("Score " + score, canvas.width-60, 15);
}

function clearScreen() {
  ctx.fillStyle = "darkgray";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {

  ctx.fillStyle = 'gray';
  for(let i =0; i < snakeParts.length; i++){
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push(new SnakePart(headX, headY));
  while(snakeParts.length > tailLength){ 
    snakeParts.shift();
  }

  ctx.fillStyle = 'black';
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headX = headX + xvel;
  headY = headY + yvel;
}

function drawApple() {
  ctx.fillStyle = 'red';
  ctx.fillRect(appleX* tileCount, appleY* tileCount, tileSize, tileSize);
}

function checkAppleColision(){
  if(appleX == headX && appleY == headY){
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
  }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
  if(event.keyCode == 38){
    if(yvel == 1)
      return;
    yvel = -1;
    xvel = 0;
  }

  if(event.keyCode == 40){
    if(yvel == -1)
      return;
    yvel = 1;
    xvel = 0;
  }

  if(event.keyCode == 37){
    if(xvel == 1)
      return;
    yvel = 0;
    xvel = -1;
  }

  if(event.keyCode == 39){
    if(xvel == -1)
      return;
    yvel = 0;
    xvel = 1;
  }
}

drawGame();