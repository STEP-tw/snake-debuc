const isNotInRange=function(position,min,max){
  return position<min||position>=max;
}

const Game=function(topLeft,bottomRight) {
  this.topLeft=topLeft;
  this.bottomRight=bottomRight;
  this.snake={};
  this.food={};
  this.score = 0
}

Game.prototype.addSnake=function(){
  let tail=new Position(12,10,"east");
  let body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();

  this.snake=new Snake(head,body);
}

Game.prototype.getSnake=function() {
  return this.snake;
}

Game.prototype.turnLeft=function() {
  return this.snake.turnLeft();
}

Game.prototype.turnRight=function() {
  return this.snake.turnRight();
}

Game.prototype.grow=function() {
  let growthFactor=this.food.getGrowthFactor();
  console.log(growthFactor);
  return this.snake.grow(growthFactor);
}

Game.prototype.getFood=function() {
  return this.food;
}

Game.prototype.move=function() {
  let details={};
  details.oldHead=this.snake.getHead();
  details.oldTail=this.snake.move();
  details.head=this.snake.getHead();
  return details;
}

Game.prototype.hasSnakeEatenFood=function() {
  return this.snake.head.isSameCoordAs(this.food.getPosition());
}

Game.prototype.createFood=function() {
  let position=generateRandomPosition(this.bottomRight.x,this.bottomRight.y);

  let random=generateRandomNumberBetween(0,10);
  let growthFactor=1;
  let superFood=false;
  if(random>5){
    growthFactor=10;
    superFood=true;
  }
  this.food=new Food(position,growthFactor,superFood);
}

Game.prototype.increaseScore = function(){
  this.score+=10;
}

Game.prototype.getScore = function(){
  return this.score;
}

Game.prototype.doesSnakeHitWall = function(){
  let head = this.snake.head.getCoord();
  return isNotInRange(head[0],this.topLeft.x,this.bottomRight.x)||isNotInRange(head[1],this.topLeft.y,this.bottomRight.y);
}

Game.prototype.isOver = function(){
  return this.doesSnakeHitWall()||this.snake.doesEatItself();
}