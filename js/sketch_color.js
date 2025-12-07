let imgReixeta,
  imgA,
  imgB,
  imgC,
  imgD,
  imgE,
  imgF,
  imgG,
  imgH,
  imgI,
  imgJ,
  imgK,
  imgL,
  imgM,
  imgN,
  imgO,
  imgP,
  imgQ,
  imgR,
  imgS,
  imgT,
  imgU, // images in memory
  imgV,
  imgW,
  imgX,
  imgY,
  imgZ,
  imgA1,
  imgE1,
  imgE2,
  imgI1,
  imgO1,
  imgO2,
  imgU1;
let imgAGrad, imgBGrad, imgCGrad, imgDGrad, imgEGrad, imgIGrad, imgOGrad, imgUGrad, imgReixetaGrad;
let placing = false; // armed placement
let dragging = false; // true while dragging
let startX, startY;
let currentPlacement = null;
let placements = []; // store all placed images
let colorpicker;
let selectedImg = null; // the image currently armed for placement
let c;
let gradStartInput, gradEndInput;

function preload() {
  imgReixeta = loadImage("../img/reixeta.png");
  imgA = loadImage("../img/A.png");
  imgB = loadImage("../img/B.png");
  imgC = loadImage("../img/C.png");
  imgD = loadImage("../img/D.png");
  imgE = loadImage("../img/E.png");
  imgF = loadImage("../img/F.png");
  imgG = loadImage("../img/G.png");
  imgH = loadImage("../img/H.png");
  imgI = loadImage("../img/I.png");
  imgJ = loadImage("../img/J.png");
  imgK = loadImage("../img/K.png");
  imgL = loadImage("../img/L.png");
  imgM = loadImage("../img/M.png");
  imgN = loadImage("../img/N.png");
  imgO = loadImage("../img/O.png");
  imgP = loadImage("../img/P.png");
  imgQ = loadImage("../img/Q.png");
  imgR = loadImage("../img/R.png");
  imgS = loadImage("../img/S.png");
  imgT = loadImage("../img/T.png");
  imgU = loadImage("../img/U.png");
  imgV = loadImage("../img/V.png");
  imgW = loadImage("../img/W.png");
  imgX = loadImage("../img/X.png");
  imgY = loadImage("../img/Y.png");
  imgZ = loadImage("../img/Z.png");
  imgA1 = loadImage("../img/A_o_1.png");
  imgE1 = loadImage("../img/E_t_2.png");
  imgE2 = loadImage("../img/E_o_3.png");
  imgI1 = loadImage("../img/I_t_4.png");
  imgO1 = loadImage("../img/O_t_5.png");
  imgO2 = loadImage("../img/O_o_6.png");
  imgU1 = loadImage("../img/U_t_7.png");

  // Create gradient versions
  let colStart = color(255, 0, 0); // red
  let colEnd = color(255, 255, 0); // yellow

  imgReixetaGrad = applyGradientToBW(imgReixeta, colStart, colEnd);
  imgAGrad = applyGradientToBW(imgA, colStart, colEnd);
  imgBGrad = applyGradientToBW(imgB, colStart, colEnd);
  imgCGrad = applyGradientToBW(imgC, colStart, colEnd);
  imgDGrad = applyGradientToBW(imgD, colStart, colEnd);
  imgEGrad = applyGradientToBW(imgE, colStart, colEnd);
  imgFGrad = applyGradientToBW(imgF, colStart, colEnd);
  imgGGrad = applyGradientToBW(imgG, colStart, colEnd);
  imgHGrad = applyGradientToBW(imgH, colStart, colEnd);
  imgIGrad = applyGradientToBW(imgI, colStart, colEnd);
  imgJGrad = applyGradientToBW(imgJ, colStart, colEnd);
  imgKGrad = applyGradientToBW(imgK, colStart, colEnd);
  imgLGrad = applyGradientToBW(imgL, colStart, colEnd);
  imgMGrad = applyGradientToBW(imgM, colStart, colEnd);
  imgNGrad = applyGradientToBW(imgN, colStart, colEnd);
  imgOGrad = applyGradientToBW(imgO, colStart, colEnd);
  imgPGrad = applyGradientToBW(imgP, colStart, colEnd);
  imgQGrad = applyGradientToBW(imgQ, colStart, colEnd);
  imgRGrad = applyGradientToBW(imgR, colStart, colEnd);
  imgSGrad = applyGradientToBW(imgS, colStart, colEnd);
  imgTGrad = applyGradientToBW(imgT, colStart, colEnd);
  imgUGrad = applyGradientToBW(imgU, colStart, colEnd);
  imgVGrad = applyGradientToBW(imgV, colStart, colEnd);
  imgWGrad = applyGradientToBW(imgW, colStart, colEnd);
  imgXGrad = applyGradientToBW(imgX, colStart, colEnd);
  imgYGrad = applyGradientToBW(imgY, colStart, colEnd);
  imgZGrad = applyGradientToBW(imgZ, colStart, colEnd);
  imgA1Grad = applyGradientToBW(imgA1, colStart, colEnd);
  imgE1Grad = applyGradientToBW(imgE1, colStart, colEnd);
  imgE2Grad = applyGradientToBW(imgE2, colStart, colEnd);
  imgI1Grad = applyGradientToBW(imgI1, colStart, colEnd);
  imgO1Grad = applyGradientToBW(imgO1, colStart, colEnd);
  imgO2Grad = applyGradientToBW(imgO2, colStart, colEnd);
  imgU1Grad = applyGradientToBW(imgU1, colStart, colEnd);
}

function setup() {
  c = createCanvas(900, 900);
  c.parent("canvasWrapper");

  // In setup(), after creating canvas
  gradStartInput = document.getElementById("gradStart");
  gradEndInput = document.getElementById("gradEnd");

  rectMode(CORNER);
  colorpicker = document.getElementById("colorpicker");

  let colStart = color(255, 0, 0); // red
  let colEnd = color(255, 255, 0); // yellow

  imgAGrad = createGradientImage(imgA, colStart, colEnd);
  imgBGrad = createGradientImage(imgB, colStart, colEnd);
  imgCGrad = createGradientImage(imgC, colStart, colEnd);
  imgDGrad = createGradientImage(imgD, colStart, colEnd);
  imgEGrad = createGradientImage(imgE, colStart, colEnd);
  imgFGrad = createGradientImage(imgF, colStart, colEnd);
  imgGGrad = createGradientImage(imgG, colStart, colEnd);
  imgHGrad = createGradientImage(imgH, colStart, colEnd);
  imgIGrad = createGradientImage(imgI, colStart, colEnd);
  imgJGrad = createGradientImage(imgJ, colStart, colEnd);
  imgKGrad = createGradientImage(imgK, colStart, colEnd);
  imgLGrad = createGradientImage(imgL, colStart, colEnd);
  imgMGrad = createGradientImage(imgM, colStart, colEnd);
  imgNGrad = createGradientImage(imgN, colStart, colEnd);
  imgOGrad = createGradientImage(imgO, colStart, colEnd);
  imgPGrad = createGradientImage(imgP, colStart, colEnd);
  imgQGrad = createGradientImage(imgQ, colStart, colEnd);
  imgRGrad = createGradientImage(imgR, colStart, colEnd);
  imgSGrad = createGradientImage(imgS, colStart, colEnd);
  imgTGrad = createGradientImage(imgT, colStart, colEnd);
  imgUGrad = createGradientImage(imgU, colStart, colEnd);
  imgVGrad = createGradientImage(imgV, colStart, colEnd);
  imgWGrad = createGradientImage(imgW, colStart, colEnd);
  imgXGrad = createGradientImage(imgX, colStart, colEnd);
  imgYGrad = createGradientImage(imgY, colStart, colEnd);
  imgZGrad = createGradientImage(imgZ, colStart, colEnd);
  imgA1Grad = createGradientImage(imgA1, colStart, colEnd);
  imgE1Grad = createGradientImage(imgE1, colStart, colEnd);
  imgE2Grad = createGradientImage(imgE2, colStart, colEnd);
  imgI1Grad = createGradientImage(imgI1, colStart, colEnd);
  imgO1Grad = createGradientImage(imgO1, colStart, colEnd);
  imgO2Grad = createGradientImage(imgO2, colStart, colEnd);
  imgU1Grad = createGradientImage(imgU1, colStart, colEnd);
  imgReixetaGrad = createGradientImage(imgReixeta, colStart, colEnd);

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
function getCurrentGradientColors() {
  let colStart = color(gradStartInput.value);
  let colEnd = color(gradEndInput.value);
  return { colStart, colEnd };
}

function createGradientImage(originalImg) {
  let { colStart, colEnd } = getCurrentGradientColors();
  let newImg = createImage(originalImg.width, originalImg.height);
  originalImg.loadPixels();
  newImg.loadPixels();

  for (let y = 0; y < originalImg.height; y++) {
    for (let x = 0; x < originalImg.width; x++) {
      let idx = 4 * (x + y * originalImg.width);
      let r = originalImg.pixels[idx];
      let g = originalImg.pixels[idx + 1];
      let b = originalImg.pixels[idx + 2];
      let a = originalImg.pixels[idx + 3];

      let brightness = (r + g + b) / 3;
      let t = y / originalImg.height;
      let gradColor = lerpColor(colStart, colEnd, t);
      let factor = 1 - brightness / 255;

      newImg.pixels[idx] = red(gradColor) * factor + r * (1 - factor);
      newImg.pixels[idx + 1] = green(gradColor) * factor + g * (1 - factor);
      newImg.pixels[idx + 2] = blue(gradColor) * factor + b * (1 - factor);
      newImg.pixels[idx + 3] = a;
    }
  }

  newImg.updatePixels();
  return newImg;
}

function keyPressed() {
  if (!key) return;

  switch (key.toLowerCase()) {
    case "a":
      selectedImg = createGradientImage(imgA); // uses current slider colors
      placing = true;
      break;
    case "b":
      selectedImg = createGradientImage(imgB);
      placing = true;
      break;
    case "c":
      selectedImg = createGradientImage(imgC);
      placing = true;
      break;
    case "d":
      selectedImg = createGradientImage(imgD);
      placing = true;
      break;
    case "e":
      selectedImg = createGradientImage(imgE);
      placing = true;
      break;
    case "f":
      selectedImg = createGradientImage(imgF);
      placing = true;
      break;
    case "g":
      selectedImg = createGradientImage(imgG);
      placing = true;
      break;
    case "h":
      selectedImg = createGradientImage(imgH);
      placing = true;
      break;
    case "i":
      selectedImg = createGradientImage(imgI);
      placing = true;
      break;
    case "j":
      selectedImg = createGradientImage(imgJ);
      placing = true;
      break;
    case "k":
      selectedImg = createGradientImage(imgK);
      placing = true;
      break;
    case "l":
      selectedImg = createGradientImage(imgL);
      placing = true;
      break;
    case "m":
      selectedImg = createGradientImage(imgM);
      placing = true;
      break;
    case "n":
      selectedImg = createGradientImage(imgN);
      placing = true;
      break;
    case "o":
      selectedImg = createGradientImage(imgO);
      placing = true;
      break;
    case "p":
      selectedImg = createGradientImage(imgP);
      placing = true;
      break;
    case "q":
      selectedImg = createGradientImage(imgQ);
      placing = true;
      break;
    case "r":
      selectedImg = createGradientImage(imgR);
      placing = true;
      break;
    case "s":
      selectedImg = createGradientImage(imgS);
      placing = true;
      break;
    case "t":
      selectedImg = createGradientImage(imgT);
      placing = true;
      break;
    case "u":
      selectedImg = createGradientImage(imgU);
      placing = true;
      break;
    case "v":
      selectedImg = createGradientImage(imgV);
      placing = true;
      break;
    case "w":
      selectedImg = createGradientImage(imgW);
      placing = true;
      break;
    case "x":
      selectedImg = createGradientImage(imgX);
      placing = true;
      break;
    case "y":
      selectedImg = createGradientImage(imgY);
      placing = true;
      break;
    case "z":
      selectedImg = createGradientImage(imgZ);
      placing = true;
      break;
    case "1":
      selectedImg = createGradientImage(imgA1);
      placing = true;
      break;
    case "2":
      selectedImg = createGradientImage(imgE1);
      placing = true;
      break;
    case "3":
      selectedImg = createGradientImage(imgE2);
      placing = true;
      break;
    case "4":
      selectedImg = createGradientImage(imgI1);
      placing = true;
      break;
    case "5":
      selectedImg = createGradientImage(imgO1);
      placing = true;
      break;
    case "6":
      selectedImg = createGradientImage(imgO2);
      placing = true;
      break;
    case "7":
      selectedImg = createGradientImage(imgU1);
      placing = true;
      break;
    default:
      // Check for Backspace separately, because keyCode is needed
      if (keyCode === BACKSPACE) {
        selectedImg = createGradientImage(imgReixeta);
        placing = true;
      }
      break;
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
