var canvas = document.getElementById("fallningEggs");
var ctx = canvas.getContext("2d");
var egg = new Image();
var hen = new Image();
var goldenStick = new Image();
var basket = new Image();
egg.src = "images/egg_gold.png";
basket.src = "images/basket.png";
hen.src = "images/hen.png";
goldenStick.src = "images/goldenStick.png"; 
var basketWidth = 100;
var basketHeight = 60;
var eggWidth = 30;
var eggHeight = 50;
var henWidth = 70;
var henHeight = 90;
var goldenStickWidth = 400;
var goldenStickHeight = 20;
var score = 0;

var eggs = [];
var eggSpawnInterval = 60;
var frameCount = 0;

var basketX = canvas.width / 2 - basketWidth / 2; 
var basketY = canvas.height - basketHeight; 

canvas.addEventListener("click", function(event) {
  var clickX = event.clientX - canvas.getBoundingClientRect().left;
  if (clickX < basketX) {
    basketX -= 100;
  } else if (clickX > basketX + basketWidth) {
    basketX += 100;
  }
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createEgg() {
  frameCount++;
  if (frameCount >= eggSpawnInterval) {
    var x = getRandomInt(henWidth / 2, canvas.width - eggWidth - henWidth / 2);
    var y = henHeight;
    var speed = getRandomInt(2, 5);

    eggs.push({ x: x, y: y, speed: speed });
    
    frameCount = 0;
  }
}

function drawEggs() {
  for (var i = 0; i < eggs.length; i++) {
    ctx.drawImage(egg, eggs[i].x, eggs[i].y, eggWidth, eggHeight);
  }
}

function drawHen() {
  var x = canvas.width / 2 - henWidth / 2;
  var y = 0;
  ctx.drawImage(hen, x, y, henWidth, henHeight);
}

function drawGoldenStick() {
  var x = canvas.width / 2 - goldenStickWidth / 2;
  var y = henHeight;
  ctx.drawImage(goldenStick, x, y, goldenStickWidth, goldenStickHeight);
}

function drawBasket() {
  ctx.drawImage(basket, basketX, basketY, basketWidth, basketHeight);
}

function updateEggs() {
  for (var i = 0; i < eggs.length; i++) {
    eggs[i].y += eggs[i].speed;

    if (
      eggs[i].x + eggWidth >= basketX &&
      eggs[i].x <= basketX + basketWidth &&
      eggs[i].y + eggHeight >= basketY &&
      eggs[i].y <= basketY + basketHeight
    ) {
      eggs.splice(i, 1);
      score++;
      document.getElementById("score").innerHTML = "Score: " + score;
    }
    
    if (eggs[i].y > canvas.height) {
      eggs.splice(i, 1);
    }
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
  clearCanvas();
  drawHen();
  drawGoldenStick();
  createEgg();
  updateEggs();
  drawEggs();
  drawBasket(); 
  requestAnimationFrame(gameLoop);
}

gameLoop();
