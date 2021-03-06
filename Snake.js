/**
 * Created by Administrator on 2017/5/27.
 */
var blackB=document.getElementById("blackB");
var map=document.getElementsByClassName("map");
var img=document.getElementsByClassName("snake");
var start=document.getElementById("start");
var restart=document.getElementById("restart");
var snake=img[0];
var direction=1;
var gameOn=false;
//使游戏开始
start.addEventListener("click",function(){
    gameOn=true;
    start.style.display="none";
});
//游戏重新开始
restart.addEventListener("click",function(){
   window.location.reload();
});
//确定蛇前进的方向
window.addEventListener("keydown",move);
function move(){
    switch(event.keyCode){
        case 87:if(direction!==2){
            direction=1;
        }
        break;
        case 83:if(direction!==1){
            direction=2;
        }
            break;
        case 65:if(direction!==4){
            direction=3;
        }
            break;
        case 68:if(direction!==3){
            direction=4;
        }
            break;
    }
}
//让蛇头动起来
function snakeMove(){
    if(direction===1){
        snake.style.top=snake.offsetTop-20+"px";
    }else if(direction===2){
        snake.style.top=snake.offsetTop+20+"px";
    }else if(direction===3){
        snake.style.left=snake.offsetLeft-20+"px";
    }else{
        snake.style.left=snake.offsetLeft+20+"px";
    }
    //console.log("1");
}
//控制蛇的速度
setInterval("snakeBodyMove()",200);
//让蛇身体动起来
function snakeBodyMove(){
    if(gameOn===true){
        for(var i=img.length-1;i>0;i--){
            img[i].style.top=img[i-1].offsetTop+"px";
            img[i].style.left=img[i-1].offsetLeft+"px";
        }
        snakeMove();
        gameOverDetec();
    }
}
//死亡检测
function gameOverDetec(){
    if(snake.offsetTop<0||snake.offsetTop>300||snake.offsetLeft>400||snake.offsetLeft<0){
        gameOver();
    }
    for(var i=img.length-1;i>0;i++){
        if(impactChecking(img[i],snake)){
            gameOver();
        }
    }
}
//死亡函数
function gameOver(){
    gameOn=false;
    restart.style.display="block";
}


//检测蛇碰到块了没
function detCollision(){
    if(impactChecking(snake,blackB)){
        blackBlockMove();
        var imgSnake=document.createElement("img");
        imgSnake.className="snake";
        imgSnake.src="blackB.jpg";
        map[0].appendChild(imgSnake);
        addTail();
    }
}
setInterval("detCollision()",100);
//加蛇尾
function addTail(){
    switch(direction){
        case 1:
            img[img.length-1].style.top=img[img.length-2].offsetTop+20+"px";
            img[img.length-1].style.left=img[img.length-2].offsetLeft+"px";
            break;
        case 2:
            img[img.length-1].style.top=img[img.length-2].offsetTop-20+"px";
            img[img.length-1].style.left=img[img.length-2].offsetLeft+"px";
            break;
        case 3:
            img[img.length-1].style.top=img[img.length-2].offsetTop+"px";
            img[img.length-1].style.left=img[img.length-2].offsetLeft+20+"px";
            break;
        case 4:
            img[img.length-1].style.top=img[img.length-2].offsetTop+"px";
            img[img.length-1].style.left=img[img.length-2].offsetLeft-20+"px";
            break;
    }
}
//黑块随机移动
function blackBlockMove(){
    var move=true;
    var top=20*Math.round(Math.random()*14);
    var left=20*Math.round(Math.random()*19);
    for(var i=0;i<img.length;i++){
        if(img[i].offsetLeft===left&&img[i].offsetTop===top){
            move=false;
            break;
        }
    }
    if(move===false){
        blackBlockMove();
    }else{
        blackB.style.top=top+"px";
        blackB.style.left=left+"px";
    }
}



//碰撞检测函数
function impactChecking(obj1,obj2){
    var obj1Left=obj1.offsetLeft;
    var obj1Right=obj1.offsetLeft+obj1.offsetWidth;
    var obj1Top=obj1.offsetTop;
    var obj1Bottom=obj1.offsetTop+obj1.offsetHeight;

    var obj2Left=obj2.offsetLeft;
    var obj2Right=obj2.offsetLeft+obj2.offsetWidth;
    var obj2Top=obj2.offsetTop;
    var obj2Bottom=obj2.offsetTop+obj2.offsetHeight;
    if(!(obj1Left>=obj2Right||obj2Left>=obj1Right||obj1Bottom<=obj2Top||obj2Bottom<=obj1Top)){
        return true
    }else{
        return false
    }
}
