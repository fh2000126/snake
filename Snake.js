(function (window) {
    var list=[];
    function Snake(width,height,direction) {
        this.width=width||20;
        this.height=height||20;
        this.direction=direction||"right";
        this.body=[
            {x:3,y:1,bgColor:"red"},
            {x:2,y:1,bgColor:"blue"},
            {x:1,y:1,bgColor:"yellow"}
        ]
    }
    Snake.prototype.render=function (map) {
        for (var i=0;i<this.body.length;i++){
                var div1=document.createElement("div");
                div1.style.position="absolute";
                div1.style.width=this.width+"px";
                div1.style.height=this.height+"px";
                div1.style.left=this.body[i].x*this.width+"px";
                div1.style.top=this.body[i].y*this.height+"px";
                div1.style.backgroundColor=this.body[i].bgColor;
                map.appendChild(div1);
                list.push(div1)
            }
    }
    Snake.prototype.move=function (food,map) {
        remove(map);
        for (var i=this.body.length-1;i>0;i--){
                this.body[i].x=this.body[i-1].x;
                this.body[i].y=this.body[i-1].y;
            }
            switch (this.direction){
                case "left":
                    this.body[0].x--;
                    break;
                case "right":
                    this.body[0].x++;
                    break;
                case "top":
                    this.body[0].y--;
                    break;
                case "bottom":
                    this.body[0].y++;
                    break;
            }
            var snakeHeadX=this.body[0].x*this.width;
            var snakeHeadY=this.body[0].y*this.height;
            var foodX=food.x;
            var foodY=food.y
            var lastSnake=this.body[this.body.length-1]
            if (snakeHeadY==foodY&&foodX==snakeHeadX){
                this.body.push({
                    x:lastSnake.x,
                    y:lastSnake.y,
                    bgColor:"black"
                });
                food.render(map)
            }
    }
    function remove(map) {
        for (var i=0;i<list.length;i++){
            map.removeChild(list[i])
        }
            list.length=0;
    }
    window.Snake=Snake;
}(window));