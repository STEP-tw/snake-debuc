const drawGrids=function(numberOfRows,numberOfCols) {
  let grid=document.getElementById("grid");
  for (var i = 0; i < numberOfRows; i++) {
    let row=document.createElement("tr");
    for (var j = 0; j < numberOfCols; j++) {
      let col=document.createElement("td");
      col.id=`${j}_${i}`;
      row.appendChild(col);
    }
    grid.appendChild(row);
  }
}

const paintCell=function(pos,color) {
  let cell=document.getElementById(pos.getCoord().join("_"));
  if(cell)
    cell.className=color;
}

const paintBody=function(pos) {
  paintCell(pos,"snake");
}

const paintHead=function(pos) {
  paintCell(pos,"snake_head");
}

const unpaintSnake=function(pos) {
  paintCell(pos,"");
}

const drawSnake=function(snake) {
  snake.getBody().forEach(function(pos){
    paintBody(pos);
  });
  paintHead(snake.getHead());
}

const drawFood=function(food) {
  if(food.isSuperFood())
    paintCell(food.getPosition(),"super-food");
  else{
    paintCell(food.getPosition(),"food");
  }
}

const updateScore=function(score){
  let div = document.getElementById('score');
  let gameScore = `<h3>Score: ${score}</h3>`;
  div.innerHTML = gameScore;
}

const displayGameOver=function(){
  let gameResult = document.createElement('h2');
  gameResult.innerText = "Game Over. Press R to restart the game";
  let displayArea = document.getElementById('result');
  displayArea.appendChild(gameResult);
}
