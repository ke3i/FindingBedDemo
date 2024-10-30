let movingLeftOne = false;
let movingLeftTwo = false;
let movingLeftThree = false;
let state = '0'; 
let bgm, endBgm, character, door, room, bed, yawn, eepy, walk, lamp;
let bgColor = [191, 84, 52], rectColor = [153, 68, 11];

let xpos1 = 600, xpos2 = 650, xpos3 = 650;
let speed = 3;

function preload() {
  bgm = loadSound("piano.mp3");
  bgm.setVolume(0.2);
  endBgm = loadSound("ending.mp3");
  endBgm.setVolume(0.05);
  character = loadImage('boy.png');
  door = loadImage('door.png');
  room = loadImage('livingRoom.png');
  yawn = loadImage('yawn.png');
  eepy = loadImage('sleep.png');
  bed = loadImage('bed.png');
  walk = loadSound('walking.mp3');
  walk.setVolume(2.0);
  lamp = loadSound('lamp.mp3');
  lamp.setVolume(3.0);
}

function setup() {
 createCanvas(800, 600);
  background(0,0,0);
  cursor(HAND);
  textSize(80);
  textAlign(CENTER);
  textFont("Inconsolata");
  fill(255);
  text("Loading....", width / 2, height / 2 - 100);
  text("Press Enter to Start \n Press A to Move", width / 2, height / 2 - 10);
}

function draw() {

  if (movingLeftOne && state == '1') {
    xpos1 -= speed;
  }
  if (movingLeftTwo && state == '2') {
    xpos2 -= speed;  
  }
  if (movingLeftThree && state == '3') {
    xpos3 -= speed;  
  }

  if (xpos1 < 120 && state == '1') {
    state = '2';
  }
  if (xpos2 < -30 && state == '2') {
    state = '3';
  }

  if (state == '1') {
    draw1();
  } else if (state == '2') {
    draw2();
  } else if (state == '3') {
    draw3();
  }
}

function draw1() {
  background(238, 238, 228);
  fill(171, 219, 227);
  stroke(10);
  text("A door???", width / 2, height / 2);
  rect(0, 520, width, height);
  image(door, 100, 390, 150, 150);
  image(character, xpos1, 400, 150, 150);
  
  if (!bgm.isPlaying()) {
    bgm.play();
  }
  if (endBgm.isPlaying()) {
    endBgm.stop();
  }
}

function draw2() {
  background(191, 84, 52);
  fill(153, 68, 11);
  stroke(10);
  rect(0, 520, width, height);
  image(room, 150, 50, 550, 500);
  image(character, xpos2, 400, 150, 150);
  text("Let's See What's In \n The Next Room!!", width / 2, height / 2);
  if (!bgm.isPlaying()) {
    bgm.play();
  }
  if (endBgm.isPlaying()) {
    endBgm.stop();
  }
}

function draw3() {
  background(bgColor);
  fill(rectColor);
  stroke(10);
  rect(0, 520, width, height);
  image(bed, 100, 390, 200, 200);
  
   if (xpos3 <= 100) { 
    image(eepy, 100, 380, 200, 150);
  } else if (xpos3 <= 400) {
    image(yawn, xpos3, 400, 150, 150);
  } else {
    image(character, xpos3, 400, 150, 150);
  }
  text("Press F When I \n Fall Asleep, OK?", width / 2, 200);

  if (bgm.isPlaying()) {
    bgm.stop();
  }
  if (!endBgm.isPlaying()) {
    endBgm.play();
  }
}

function keyPressed() {
  if (key == 'Enter') {
    state = '1';
    xpos1 = 600;
    xpos2 = 650;
    xpos3 = 650;
  }
  
  if (key == '1' || key == '2' || key == '3') {
    state = key;

    if (state == '1') {
      xpos1 = 600; 
    } else if (state == '2') {
      xpos2 = 650; 
    } else if (state == '3') {
      xpos3 = 650; 
    }
  }
  
  if (key == 'f' && state == '3'){
    if (!lamp.isPlaying()){
      lamp.play();
    }
    bgColor = [43, 87, 158];
    rectColor = [14, 51, 110]; 
  }
  
  if (key == 'a') {
    if (state == '1') {
      movingLeftOne = true;
    } else if (state == '2') {
      movingLeftTwo = true;
    } else if (state == '3') {
      movingLeftThree = true;
    }
     walk.rate(1.2); 
    if (!walk.isPlaying()) {
      walk.loop(); 
    }
  }
}

function keyReleased() {
  if (key == 'a') {
    movingLeftOne = false;
    movingLeftTwo = false;
    movingLeftThree = false;

    walk.stop();
  }
}
