(function (window) {
    var that=null;
    function Game(map) {
        this.snake=new  Snake();
        this.food=new Food();
        this.map=map;
        that=this
    }
    Game.prototype.startGame=function () {
        this.snake.render(this.map);
        this.food.render(this.map);
        autoSankemove();
        keyDirection();
    }
    function autoSankemove() {
      var timeId= setInterval(function () {
            this.snake.move(this.food,this.map);
            var snakeHeadX=this.snake.body[0].x*this.snake.width;
            var snakeHeadY=this.snake.body[0].y*this.snake.height;
          if (snakeHeadX<0||snakeHeadY<0||snakeHeadX>=this.map.offsetWidth||snakeHeadY>=this.map.offsetHeight){
                alert("Game Over");
                clearInterval(timeId);
                return;
            }
            this.snake.render(map);
        }.bind(that),200)
    }
    function keyDirection() {
        document.onkeydown=function (e) {
            e = e || window.event
            switch (e.keyCode) {
                case 37:
                    if ( this.snake.direction!="right") {
                        this.snake.direction="left";
                    }
                break;
                case 38:
                    if (this.snake.direction!="bottom"){
                        this.snake.direction="top";
                    }
                break;
                case 39:
                    if (this.snake.direction!="left"){
                        this.snake.direction="right";
                    }
                break;
                case 40:
                    if (this.snake.direction!="top"){
                        this.snake.direction="bottom";
                    }
                break;
            }
        }.bind(that)
    }
    window.Game=Game;
}(window))