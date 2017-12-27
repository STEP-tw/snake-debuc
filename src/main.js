let snake=undefined;
let food=undefined;
let noOfRows=60;
let noOfCols=120;

let animator=undefined;

const animateSnake=function() {
  let oldHead=snake.getHead();
  let oldTail=snake.move();
  let head=snake.getHead();
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  if(head.isSameCoordAs(food)) {
    snake.grow();
    createFood(noOfRows,noOfCols);
    drawFood(food);
  }
  if(isGameOver()){
    clearInterval(animator);
    displayGameOver();
  }
}

const changeSnakeDirection=function(event) {
  switch (event.code) {
    case "KeyA":
      snake.turnLeft();
      break;
    case "KeyD":
      snake.turnRight();
      break;
    case "KeyC":
      snake.grow();
      break;
    case "KeyR":
        location.reload();
        break;
    default:
  }
}

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
}

const createSnake=function() {
  let tail=new Position(12,10,"east");
  let body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();

  snake=new Snake(head,body);
}

const createFood=function(noOfRows,noOfCols) {
  food=generateRandomPosition(noOfCols,noOfRows);
}

const isNotInRange=function(position,min,max){
  return position<=min||position>=max;
}

const isGameOver=function() {
  return doesSnakeEatItself()||doesSnakeHitWall();
}

const doesSnakeHitWall=function() {
  let head = snake.head.getCoord();
  return isNotInRange(head[0],0,noOfCols-1)||isNotInRange(head[1],0,noOfRows-1);
}

const doesSnakeEatItself=function() {
  return snake.body.some(function(bodyPart){
    return snake.head.isSameCoordAs(bodyPart);
  });
}

const startGame=function() {
  createSnake();
  drawGrids(noOfRows,noOfCols);
  drawSnake(snake);
  createFood(noOfRows,noOfCols);
  drawFood(food);
  addKeyListener();
  animator=setInterval(animateSnake,140);
}

window.onload=startGame;
