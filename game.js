var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var bird = new Image();
var bg = new Image();
var wall = new Image();
var up = new Image();
var down = new Image();

bird.src = "bird.png";
bg.src = "bg.png";
wall.src = "wall.png";
up.src = "top.png";
down.src = "bottom.png";


// some variables

var opening = 85;
var constant;

var xco = 10;
var yco = 150;

var gravity = 1.5;

var score = 0;

// audio files

var swoosh = new Audio();
var point = new Audio();

swoosh.src = "bgm/swoosh.mp3";
point.src = "gm/point.mp3";

// on key down

document.addEventListener("keydown",moveUp);

function moveUp(){
    yco -= 25;
    swoosh.play();
}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

// draw images

function draw(){
    
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = up.height+opening;
        ctx.drawImage(up,pipe[i].x,pipe[i].y);
        ctx.drawImage(down,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*up.height)-up.height
            }); 
        }

        // detect collision
        
        if( xco + bird.width >= pipe[i].x && xco <= pipe[i].x + up.width && (yco <= pipe[i].y + up.height || yco+bird.height >= pipe[i].y+constant) || yco + bird.height >=  cvs.height - wall.height){
            location.reload(); // reload the page
        }
        
        if(pipe[i].x == 5){
            score++;
            point.play();
        }
        
        
    }

    ctx.drawImage(wall,0,cvs.height - wall.height);
    
    ctx.drawImage(bird,xco,yco);
    
    yco += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px cursive";
    ctx.fillStyle = "center";
    ctx.fillText("ScoreBoard : "+score,50,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();
























