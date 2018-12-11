/*
** Create by 张晓坤 on 2018/10/8
*/

/**1.匀速动画
 * @param obj:要移动的元素
 * @param target:要移动的目标距离
 */
function animationMove ( obj,target ) {
    //1.清除之前的定时器，以本次移动为准
    clearInterval(obj.timeID);
    //2.开始本次移动
    obj.timeID = setInterval(function (  ) {
        //2.1 先获取元素当前位置
        var currentLeft = obj.offsetLeft;
        //2.2 开始移动
        var isLeft = target>currentLeft?true:false;//判断移动方向
        isLeft?currentLeft+=10:currentLeft-=10;//根据移动方向开始移动
        obj.style.left = currentLeft + 'px';
        //2.3 边界检测
        if (isLeft?currentLeft>=target:currentLeft<= target){
            //(1)清除定时器
            clearInterval(obj.timeID);
            //(2)元素复位
            obj.style.left = target + 'px';
        }
    },20);
}

/**2.缓动动画
 * @param obj:要移动的元素
 * @param attrs 要移动的属性对象
 * @param fn:回调函数  （如果传了就执行，不传就不执行）
 */
function animationSlow (  obj,attrs,fn) {
    //1.先清除之前的定时器，以本次移动为准
    clearInterval(obj.timeID);
    //2.开始本次移动
    obj.timeID = setInterval(function (  ) {
        /*开关思想：当某种操作的结果只有两种状态，就可以使用布尔类型表示这两种状态isAllOk
        1.提出假设： 假设每一次移动isAllOk = true
        2.验证假设
        3.根据开关状态来实现需求
        */
        //一：提出假设.这一次移动之后所有属性都到达终点
        var isAllOk = true;
        //遍历对象属性值
        for (var key in attrs){
            if(key == 'zIndex' || key == 'backgroundColor'){
                obj.style[key] = attrs[key];
            }else if (key == 'opacity'){
                //这里声明两个变量是为了下面的attr和target形参不用修改
                var attr = key;//属性名
                var target = attrs[key] * 100;//目标值放大一百倍
                //2.1 先获取当前位置
                /*注意：window.computedStyle方式获取的属性值是字符串，需要转成number*/
                //透明度范围0-1小数，需要转换成小数
                var current = parseFloat( getStyle(obj, attr)) * 100;//当前值放大一百倍
                console.log ( current );
                //2.2 计算本次移动距离  = （目标位置 - 当前位置）/10
                var step =(target - current)/10;
                //2.3 取整： step>0:向上取整  step<0:向下取整
                step = step>0?Math.ceil(step):Math.floor(step);
                //2.4 开始移动
                current += step;
                /*注意点：透明度没有单位*/
                obj.style[attr] = current/100;//赋值的时候缩小一百倍
                //2.5 终点检测
                //二：验证假设：只要有任何一个属性没有到达终点，假设被推翻
                if (current != target){
                    isAllOk = false;
                }
            }else{
                //这里声明两个变量是为了下面的attr和target形参不用修改
                var attr = key;//属性名
                var target = attrs[key];//目标位置
                //2.1 先获取当前位置
                /*注意：window.computedStyle方式获取的属性值是字符串，需要转成number*/
                var current = parseInt( getStyle(obj, attr));
                console.log ( current );
                //2.2 计算本次移动距离  = （目标位置 - 当前位置）/10
                var step =(target - current)/10;
                //2.3 取整： step>0:向上取整  step<0:向下取整
                step = step>0?Math.ceil(step):Math.floor(step);
                //2.4 开始移动
                current += step;
                obj.style[attr] = current + 'px';
                //2.5 终点检测
                //二：验证假设：只要有任何一个属性没有到达终点，假设被推翻
                if (current != target){
                    isAllOk = false;
                }
            }
        }

        //三：根据开关状态实现需求
        if (isAllOk){
            clearInterval(obj.timeID);
            //判断调用者有没有传递第三个参数,如果传了，就帮他执行这个函数
            if (typeof  fn == 'function'){//只有当fn是函数的时候才执行函数体代码
                fn();
            }
        }
    },20);
}


function getStyle(obj,attr){
    //能力检测
    if (window.getComputedStyle){//谷歌火狐浏览器
        var style = window.getComputedStyle(obj, null);
        /*注意点：这里只能用字符串语法去获取属性值*/
        //return style.attr;//这个代码意思是获取对象attr属性的值
        return style[attr];//这个代码意思是获取attr变量中存储的字符串对象的属性值

    }else{//IE8浏览器
        return obj.currentStyle[attr];
    }
}