let imgReixeta, imgA, imgE, imgI, imgO, imgU; // images in memory
let placing = false; // armed placement
let dragging = false; // true while dragging
let startX, startY;
let currentPlacement = null;
let placements = []; // store all placed images
let colorpicker;
let selectedImg = null; // the image currently armed for placement
let c;
function preload() {
  imgReixeta = loadImage("../img/reixeta.png");
  imgA = loadImage("../img/A.png"); // your default image
  imgE = loadImage("../img/E.png"); // image for key 'E'
  imgI = loadImage("../img/I.png");
  imgO = loadImage("../img/O.png");
  imgU = loadImage("../img/U.png");
}

function setup() {
  c = createCanvas(900, 900);
  c.parent("canvasWrapper");

  rectMode(CORNER);
  colorpicker = document.getElementById("colorpicker");

  // attach dropdown listener
  document.getElementById("selectsize").addEventListener("change", changeSize);
}

function draw() {
  background(colorpicker ? colorpicker.value : "#f0f0f0");

  // draw all placed images
  for (let p of placements) {
    image(p.img, p.x, p.y, p.w, p.h);
  }

  // draw preview while dragging
  if (dragging && currentPlacement) {
    push();
    noFill();
    stroke(0, 150);
    rect(currentPlacement.x, currentPlacement.y, currentPlacement.w, currentPlacement.h);
    pop();
  }
}

function keyPressed() {
  if (!key) return;

  // Arm placement with the corresponding image
  if (key.toLowerCase() === "a") {
    selectedImg = imgA;
    placing = true;
  } else if (key.toLowerCase() === "e") {
    selectedImg = imgE;
    placing = true;
  } else if (key.toLowerCase() === "i") {
    selectedImg = imgI;
    placing = true;
  } else if (key.toLowerCase() === "o") {
    selectedImg = imgO;
    placing = true;
  } else if (key.toLowerCase() === "u") {
    selectedImg = imgU;
    placing = true;
  } else if (keyCode === BACKSPACE) {
    selectedImg = imgReixeta;
    placing = true;
  }
}

function mousePressed() {
  if (!placing || !selectedImg) return;

  dragging = true;
  startX = mouseX;
  startY = mouseY;
  currentPlacement = { x: startX, y: startY, w: 0, h: 0, img: selectedImg };
}

function mouseDragged() {
  if (!dragging || !currentPlacement) return;

  let w = mouseX - startX;
  let h = mouseY - startY;
  let x = startX;
  let y = startY;

  if (w < 0) {
    x = startX + w;
    w = -w;
  }
  if (h < 0) {
    y = startY + h;
    h = -h;
  }

  currentPlacement.x = x;
  currentPlacement.y = y;
  currentPlacement.w = w;
  currentPlacement.h = h;
}

function mouseReleased() {
  if (!placing || !currentPlacement) return;

  // save the image placement
  if (currentPlacement.w > 0 && currentPlacement.h > 0) {
    placements.push({ ...currentPlacement });
  } else {
    // click only → default size
    placements.push({
      x: mouseX - 50,
      y: mouseY - 50,
      w: 100,
      h: 100,
      img: selectedImg,
    });
  }

  dragging = false;
  currentPlacement = null;
  placing = false; // press key again for next placement
  selectedImg = null;
}

function savePNG() {
  saveCanvas(c, "reixeta" + frameCount, "png");
}

function changeSize() {
  const selected = document.getElementById("selectsize").value;

  // Default width
  const baseWidth = 1080;
  let w = baseWidth;
  let h = baseWidth;

  if (selected === "1_1") {
    h = 1080;
  } else if (selected === "4_5") {
    h = 1350;
  } else if (selected === "9_16") {
    h = 1920;
  } else if (selected === "1_91_1") {
    h = 566;
  }
  resizeCanvas(w, h);
  console.log("Canvas resized to:", w, h);
}
