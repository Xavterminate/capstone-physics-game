
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var player,enemy,playerHealth,enemyHealth,attack,ground;
var coin,heal,powerUp,coins;
var ray,tower,flyer;
var bg_img,coinImg,ground,wallR,wallL,roof;
var engine,world,playerOptions;


function setup() {
  createCanvas(600,600);
  bg_img=loadImage('Dojo.png');
  coinImg=loadImage('coin.png');
 
  playerHealth=3;
  enemyHealth=3;
  playerOptions={
    isStatic:false,
   restitution:0.0001
  }
  coins=0;
  attack=false;

  engine = Engine.create();
  world = engine.world;

  player = Bodies.rectangle(100,200,50,50,playerOptions);
  enemy = createSprite(400,400,50,50);
  World.add(world,player);
  ground = new Ground(300,600,600,20);
  wallL = new Ground(0,300,20,600);
  wallR = new Ground(600,300,20,600);
  roof = new Ground(300,0,600,20);
  enemy.velocityY=5;
}


function draw() 
{
  
  background(51);
  image(bg_img,0,0,width,height);
  Engine.update(engine);
  drawSprites();
  if(coin==null){
    coin = createSprite(Math.round(random(1,400)),Math.round(random(1,400)),10,10);
    coin.addImage(coinImg);
    coin.scale=0.07;
  }
  if(player.position.y>600||player.position.y<0||player.position.x>600||player.position.x<0){
    player.position.x=300;
    player.position.y=300;
    Matter.Body.applyForce(player,{x:0,y:0},{x:0,y:0});
  }

  text("coins:"+coins,20,20);
  text("playerHP:"+playerHealth,100,20);
  text("enemyHP:"+enemyHealth,200,20);
  ground.show();
  wallL.show();
  wallR.show();
  roof.show();
  rect(player.position.x,player.position.y,player.width,player.height);
 

  if (collide(player,coin)){
    coins++;
    coin.destroy();
    coin=null;
  }
 
  if (enemy.y>600){
    enemy.velocityY= Math.round(random(-5,0));
    enemy.velocityX=Math.round(random(-5,5));
  }
  if(enemy.y<0){
    enemy.velocityY=Math.round(random(0,5));
    enemy.velocityX=Math.round(random(-5,5));
    }
    if(enemy.x<0){
      enemy.velocityX=Math.round(random(0,5));
      enemy.velocityY=Math.round(random(-5,5));
      }
      if (enemy.x>600){
        enemy.velocityX= Math.round(random(-5,0));
        enemy.velocityY=Math.round(random(-5,5));
      }

  if(collide(player,enemy)&&attack===false){
    playerHealth=playerHealth-1;
    enemy.y= Math.round(random(0,600));
    enemy.x= Math.round(random(0,600));
  }
  if(collide(player,enemy)&&attack===true){
    enemyHealth=enemyHealth-1;
    enemy.y= Math.round(random(0,600));
    enemy.x= Math.round(random(0,600));
  }
  
  if(playerHealth<=0){
    playerHealth=0
    enemy.y=500
    enemy.x=500
    enemy.velocityX=0;
    enemy.velocityY=0;
    text("game over, you died",300,300);
  }
  if(coins>=100){
    coins=100
    enemy.y=500
    enemy.x=500
    enemy.velocityX=0;
    enemy.velocityY=0;
    text("game over, you win, 100 coins collected",300,300);
    player.x=100;
    player.y=100;
  }
  if(enemyHealth<=0){
    enemyHealth=0
    enemy.y=500
    enemy.x=500
    enemy.velocityX=0;
    enemy.velocityY=0;
    text("game over, you died",300,300);
    player.x=100;
    player.y=100;
  }
 
  
  if (keyDown(UP_ARROW)){
    Matter.Body.applyForce(player,{x:0,y:0},{x:0,y:-0.01})
  }
  if (keyDown(DOWN_ARROW)){
    Matter.Body.applyForce(player,{x:0,y:0},{x:0,y:0.01})
    attack=true;
  } else{
    attack=false;
  }
  if (keyDown(RIGHT_ARROW)){
    Matter.Body.applyForce(player,{x:0,y:0},{x:0.01,y:0})
    
  }
  if (keyDown(LEFT_ARROW)){
    Matter.Body.applyForce(player,{x:-0,y:0},{x:-0.01,y:0})
   
  }
  
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}