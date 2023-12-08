var canvas = document.getElementById("fallningEggs");
var ctx = canvas.getContext("2d");
var egg = new Image();
var hen = new Image();
var goldenStick = new Image();
var basket = new Image();
var rock = new Image();
egg.src = "images/egg_gold.png";
basket.src = "images/basket.png";
hen.src = "images/hen.png";
rock.src = "images/rock.png";
goldenStick.src = "images/goldenStick.png"; 
var basketWidth = 80;
var basketHeight = 60;
var eggWidth = 30;
var eggHeight = 45;
var rockWidth = 50;
var rockHeight = 50;
var henWidth = 60;
var henHeight = 70;
var goldenStickWidth = 300;
var goldenStickHeight = 20;
var score = 0;

var eggs = [];
var rocks = [];
var eggSpawnInterval = 60;
var rockSpawnInterval = 300; // Thời gian giữa mỗi rock xuất hiện (5 giây)
var frameCount = 0;
var time = 0;

var basketX = canvas.width / 2 - basketWidth / 2; 
var basketY = canvas.height - basketHeight; 

canvas.addEventListener("click", function(event) {
  var clickX = event.clientX - canvas.getBoundingClientRect().left;
  if (clickX < basketX) {
    basketX -= 80;
  } else if (clickX > basketX + basketWidth) {
    basketX += 80;
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

function createRock() {
  var x = getRandomInt(0, canvas.width - rockWidth);
  var y = 0;
  var speed = getRandomInt(2, 5);

  rocks.push({ x: x, y: y, speed: speed });
}

function drawEggs() {
  for (var i = 0; i < eggs.length; i++) {
    ctx.drawImage(egg, eggs[i].x, eggs[i].y, eggWidth, eggHeight);
  }
}

function drawRocks() {
  for (var i = 0; i < rocks.length; i++) {
    ctx.drawImage(rock, rocks[i].x, rocks[i].y, rockWidth, rockHeight);
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
      document.getElementById("score").innerHTML = "Điểm: " + score;
    }
    
    if (eggs[i].y > canvas.height) {
      eggs.splice(i, 1);
    }
  }
}

function updateRocks() {
  for (var i = 0; i < rocks.length; i++) {
    rocks[i].y += rocks[i].speed;

    if (
      rocks[i].x + rockWidth >= basketX &&
      rocks[i].x <= basketX + basketWidth &&
      rocks[i].y + rockHeight >= basketY &&
      rocks[i].y <= basketY + basketHeight
    ) {
      endGame();
    }
    
    if (rocks[i].y > canvas.height) {
      rocks.splice(i, 1);
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
  
  time++;
  if (time % rockSpawnInterval === 0) {
    createRock();
  }
  
  updateRocks();
  drawRocks();
  
  drawBasket();
  requestAnimationFrame(gameLoop);
}

function resetGame() {
  eggs = [];
  rocks = [];
  score = 0;
  frameCount = 0;
  time = 0;
  basketX = canvas.width / 2 - basketWidth / 2; 
  basketY = canvas.height - basketHeight; 
}

function endGame() {
  alert("Trò chơi kết thúc! Số điểm của bạn là: " + score);
  resetGame();
  gameLoop();
}

// Bắt đầu trò chơi
gameLoop();
