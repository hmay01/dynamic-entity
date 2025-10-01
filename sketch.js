let img;
let track;
let button;
let amp;
let level;
let smoothedLevel = 0;
let sphereAngle = 0;
let entity;

// Load an image and create a p5.Image object.
function preload() {
  img = loadImage("assets/coarse-entity-seamless2.png");
  entity = loadModel("assets/entity8.obj", true);
}

function setup() {
  createCanvas(400, 400, WEBGL);
  track = loadSound("assets/coarse 5.wav", loaded);
  amp = new p5.Amplitude();
}

function draw() {
  background(0);
  ambientLight(150);
  pointLight(255, 255, 255, -200, -200, 0);
  rotateY(sphereAngle * 1.5);
  noStroke();
  level = amp.getLevel();
  smoothedLevel = lerp(smoothedLevel, level, 0.1);
  texture(img);
  sphereAngle += 0.001;
  push();
  scale(map(smoothedLevel, 0, 1, 0.5, 2));
  model(entity);
  pop();
}

function loaded() {
  console.log("loaded");
  button = createButton("play");
  button.mousePressed(togglePlayback);
}

function togglePlayback() {
  if (track.isPlaying()) {
    track.stop();
  } else {
    track.play();
  }
}
