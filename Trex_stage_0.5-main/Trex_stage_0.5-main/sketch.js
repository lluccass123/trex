var trex, trex_running, edges;
var groundImage;
var ground;
var invisibleGround;
var cloud, clouds;
var GameOver;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var obstacle_group, cloud_group;
var PLAY = 1;
var END = 0;
var game_state = PLAY;
var trex_collided;
var gameOver, restart;
var gameovers, restarts;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  clouds = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  trex_collided = loadAnimation("trex_collided.png");
  gameOver = loadImage("gameOver.png");
  restart = loadImage("restart.png");
}

function setup(){
  createCanvas(600,200);
  
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trex_collided", trex_collided);
  
  // Creating Ground
  ground = createSprite(200,180,400,20);
  ground.addAnimation("GImage", groundImage);
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  gameovers = createSprite(300,50,30,30);
  gameovers.addImage(gameOver);
  restarts = createSprite(300,100,30,30);
  restarts.addImage(restart);
  gameovers.scale = 2;
  restarts.scale = 0.5;
obstacle_group = new Group();
cloud_group = new Group();
  trex.setCollider("rectangle", 0, 0, trex.width, trex.height);
  trex.debug = true;
  // random number
  var ran = Math.round(random(10,16));
  console.log(ran);

  //Creating Edges
  edges = createEdgeSprites();

  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50
  score = 0;
}


function draw(){
  //set background color 
  background(240);
//  var message = "This is a message";
//  console.log(message);
  text("score:"+score,500,50);
  if (game_state === PLAY){
    gameovers.visible = false
    restarts.visible = false
    ground.velocityX = -2;
    score = score + Math.round(frameCount/60);
    if (ground.x<0){
      ground.x = ground.width/2;
    }
      //jump when space key is pressed
  if(keyDown("space")&& trex.y>=100){
    trex.velocityY = -10;
  }
  trex.velocityY = trex.velocityY + 0.9;
    spawnClouds();
    spawnObstacles();
    if(obstacle_group.isTouching(trex)){
      game_state = END;
    }
  }
    else if (game_state === END){
      gameovers.visible = true;
      restarts.visible = true
      ground.velocityX = 0;
      trex.changeAnimation("trex_collided", trex_collided);
      trex.velocityY = 0;
      obstacle_group.setVelocityXEach(0);
      cloud_group.setVelocityXEach(0);
    }
//  console.log(frameCount);
    //stop trex from falling down
    trex.collide(invisibleGround)
    if (mousePressedOver(restarts)){
      game_state === PLAY;
      gameovers.visible = false;
      restarts.visible = false;
      trex.changeAnimation("running",trex_running);
      obstacle_group.destroyEach();
      cloud_group.destroyEach();
      score = 0
    }
  drawSprites();
}
function spawnClouds(){   
  if (frameCount%60===0){
    cloud = createSprite(600,50,40,10);
    cloud.addImage(clouds);
    cloud.velocityX = -3;
    cloud.y = Math.round(random(10,60));
    cloud.scale = 0.5;
    cloud.lifetime = 200;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1
    cloud_group.add(cloud);
  }
}
function spawnObstacles(){
  if (frameCount%60===0){
    var obstacle = createSprite(600,165,10,40);
   // -(3+100
    obstacle.velocityX = -2;
    var arnd = Math.round(random(1,6));
    switch(arnd){
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
      default:
        break;
    }
    obstacle.scale = 0.4;
    obstacle.depth = trex.depth;
    trex.depth = trex.depth + 1
    obstacle_group.add(obstacle);
  }
}