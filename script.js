const canvas = document.getElementById("gameCanvas");
ctx = canvas.getContext("2d");
canvas.style.backgroundColor = "black";

var d = "UP";
var box = 32;
var score = 0;
var snake = [];
snake[0] = {
  x: 9*box,
  y: 13*box  
};

var frameRate = 200;


function collision(newHead,snake){
  for(var i=0;i<snake.length;++i){
    if(newHead.x == snake[i].x && newHead.y == snake[i].y){
      document.getElementById('score').innerHTML = "Game OVER " + "Your Score is:" + score.toString();
    return true;
    }
  }
return false;
}


var food = {
  x: Math.floor(Math.random()*19 + 1)*box,
  y:Math.floor(Math.random()*19 + 1)*box 
};

if(food.x > 608-32){
  food.x = 0;
}
if(food.x < 0){
  food.x = 608-32;
}
if(food.y < 0){
  food.y = 608-32;
}
if(food.y > 608-32){
  food.y = 0;
}

document.addEventListener("keydown",direction);

function direction(event){
  
  switch(event.keyCode){
    case 37:
      if(d!="RIGHT"){
      d = "LEFT";
      }
      break;
    case 38:
    if(d!="DOWN"){  
    d = "UP";
    }
      break;
    case 39:
    if(d!="LEFT"){  
    d = "RIGHT";
    }
      break;
    case 40:
    if(d!="UP"){  
    d = "DOWN";
    }
      break;
  }
}


function draw(){
ctx.clearRect(0,0,canvas.width,canvas.height);
  for(var i=0;i<snake.length;++i){
    if(snake[0].x < 0){
      document.getElementById('score').innerHTML = "Game OVER " + "Your Score is:" + score.toString();
      return;
    }

    if(snake[0].x > canvas.width){
      document.getElementById('score').innerHTML = "Game OVER " + "Your Score is:" + score.toString();
      return;
    } 

    if(snake[0].y < 0){
      document.getElementById('score').innerHTML = "Game OVER " + "Your Score is:" + score.toString();
      return;
    }

    if(snake[0].y > canvas.height){
      document.getElementById('score').innerHTML = "Game OVER " + "Your Score is:" + score.toString();
      return;
    }

    ctx.fillStyle = "white";
  ctx.fillRect(snake[i].x,snake[i].y,box,box);

}  


ctx.fillStyle = "red";
ctx.fillRect(food.x,food.y,box,box);

var snakeX = snake[0].x,snakeY = snake[0].y;


if(d == "LEFT") snakeX -= box;
else if(d == "RIGHT") snakeX += box;
else if(d == "UP") snakeY -= box;
else if(d == "DOWN") snakeY += box;

var head = {
  x: snakeX,
  y: snakeY
};

if(collision(head,snake)) return;
if(snakeX == food.x && snakeY == food.y){
  // frameRate -= 50;
  score+=10;
  food = {
    x:Math.floor(Math.random()*19 + 1)*box,
    y:Math.floor(Math.random()*19 + 1)*box 
  };
if(food.x > 608-32){
  food.x = 0;
}
if(food.x < 0){
  food.x = 608-32;
}
if(food.y < 0){
  food.y = 608-32;
}
if(food.y > 608-32){
  food.y = 0;
}
}
else{
  snake.pop();
}
snake.unshift(head);


document.getElementById("score").innerHTML = "score:" + score.toString();

}


setInterval(draw,110);


