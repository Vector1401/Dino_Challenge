var PLAY = 1;
var END = 0;
var gameState = PLAY;

var chInvisivel ;

var nuvem, turmaNuv, nuvImagem;

var dino, dImagem, dinoMDS;

var gameOver, gmImagem;

var restart, restartImg;

var chao, chaoImg;

var Mdie, Mcheckpt, Mjump

var turmaObstc, ob1, ob2, ob3, ob4, ob5, ob6;

var pts = 0;

function preload(){
dinoMDS = loadImage("trex_collided.png");

nuvImagem = loadImage("cloud.png");

dImagem = loadAnimation("trex1.png", "trex3.png", "trex4.png");

chaoImg = loadImage("ground2.png");

ob1 = loadImage("obstacle1.png");
ob2 = loadImage("obstacle2.png");
ob3 = loadImage("obstacle3.png");
ob4 = loadImage("obstacle4.png");
ob5 = loadImage("obstacle5.png");
ob6 = loadImage("obstacle6.png");

Mcheckpt = loadSound("checkpoint.mp3");

Mjump = loadSound("jump.mp3");

Mdie = loadSound("die.mp3");

gmImagem = loadImage("gameOver.png");

restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(1000, 400);

  chao = createSprite(500, 375, 1000, 20);

  chInvisivel = createSprite(500, 390, 1000, 10);

  chInvisivel.visible = false;

  turmaObstc = createGroup();

  turmaNuv = createGroup();
  
  chao.addAnimation("chaoinfinito", chaoImg);

  dino = createSprite(65, 360, 20, 10);

  dino.addAnimation("dino;-;", dinoMDS);

  gameOver = createSprite(480, 100 , 0, 0);

  gameOver.addImage(gmImagem);

  restart = createSprite(480, 150, 0, 0);

  restart.addImage(restartImg);

  dino.addAnimation("dCorrendo", dImagem);

  dino.setCollider("circle",-10,2,30);
  dino.debug = false;
}

function draw() {
 background(200,255,255);

 textSize(50);

 text("Seus pontos: " + pts, 500,50);

 if(gameState == PLAY){

 pts = pts + Math.round(getFrameRate()/60);

 if(pts>0 && pts%100 ===0) {
 Mcheckpt.play()
 }

 

 dino.changeAnimation("dCorrendo", dImagem);

 gameOver.visible = false;

 restart.visible = false;

 if (chao.x < 0 ) {
  chao.x = chao.width / 2;
  }

 chao.velocityX = -(7 + 3* pts / 100);

  

  if(keyDown("space") && dino.y >=+338) {

  dino.velocityY = -15; 

  Mjump.play()
  }

  dino.velocityY = dino.velocityY + 0.8;

  gerarObs();

  gerarNvns();
  
  if(turmaObstc.isTouching(dino)){

   gameState = END;

   Mdie.play()

  }

  }

  if(gameState == END){

  turmaNuv.setLifetimeEach(-1);
  turmaObstc.setLifetimeEach(-1);

  dino.velocityY = 0;

  chao.velocityX = 0;

  gameOver.visible = true;

  restart.visible = true;
  
  dino.changeAnimation("dino;-;", dinoMDS);
 
  turmaObstc. setVelocityXEach(0);
  turmaNuv. setVelocityXEach(0);

  if(mousePressedOver(restart)) {
  reset();
  }
  
  }

  drawSprites();

  dino.collide(chInvisivel);

}

function gerarObs () {
 
if (frameCount %45 == 0){

var sprite = createSprite(1000,355,10,40);

var obsAleatorios = Math. round(random(1,6));

sprite.scale = 0.8;

sprite.lifetime = 135;

switch(obsAleatorios) {

case 1: sprite.addImage(ob1);
break;

case 2: sprite.addImage(ob2);
 break;
 
 case 3: sprite.addImage(ob3);
 break;

 case 4: sprite.addImage(ob4);
 break;

 case 5: sprite.addImage(ob5);
 break;

 case 6: sprite.addImage(ob6);
 break;

 default: break;
}

sprite. velocityX = -(7 + 3* pts / 100);

turmaObstc.add(sprite);

} 

}

function gerarNvns () {

if (frameCount %60 == 0){

nuvem = createSprite(1000,50,40,10);

nuvem.lifetime = 130;

nuvem.y = Math.round(random(20,100));

nuvem.depth = dino.depth;
dino.depth = dino.depth + 1;

nuvem.lifetime = 270;

nuvem.scale = 1.4;

nuvem.velocityX = -4;

turmaNuv.add(nuvem);

nuvem.addImage(nuvImagem);
}
}

function reset() {
  
 gameState = PLAY;
 
 gameOver.visible = false;
 
 restart.visible = false;

 pts = 0;

 turmaObstc.destroyEach();
 turmaNuv.destroyEach();

}