const canvas = document.createElement("canvas");
canvas.id = "scene";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.querySelector("#main-bg").appendChild(canvas);
const ctx = canvas.getContext('2d');

if (window.devicePixelRatio > 1) {
  canvas.width = canvas.clientWidth * 2;
  canvas.height = canvas.clientHeight * 2;
  ctx.scale(2, 2);
}

/* ====================== */
/* ====== VARIABLES ===== */
/* ====================== */
let width = window.innerWidth; // Width of the canvas
let height = window.innerHeight; // Height of the canvas
let rotation = 0; // Rotation of the globe
let dotsOne = []; // Every dots in an array
let dotsTwo = []; // Every dots in an array
let dotsThree = []; // Every dots in an array
let orbitOne = 0.87;
let orbitTwo = 0.90;
let orbitThree = 0.94;

/* ====================== */
/* ====== CONSTANTS ===== */
/* ====================== */
/* Some of those constants may change if the user resizes their screen but I still strongly believe they belong to the Constants part of the variables */
let DOTS_AMOUNT = 5000; // Amount of dots on the screen
let DOT_RADIUS = .8; // Radius of the dots
let GLOBE_RADIUS = width; // Radius of the globe
let GLOBE_CENTER_Z = -GLOBE_RADIUS; // Z value of the globe center
let PROJECTION_CENTER_X = width / 2; // X center of the canvas HTML
let PROJECTION_CENTER_Y = height / 2; // Y center of the canvas HTML
let FIELD_OF_VIEW = width * 1.2;

if (window.devicePixelRatio > 1) {
  DOTS_AMOUNT = 3000; // Amount of dots on the screen
  DOT_RADIUS = .4; // Radius of the dots
  GLOBE_RADIUS = height; // Radius of the globe
}

class Dot {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    
    this.xProject = 0;
    this.yProject = 0;
    this.sizeProjection = 0;
  }
  // Do some math to project the 3D position into the 2D canvas
  project(sin, cos) {
    const rotX = cos * this.x + sin * (this.z - GLOBE_CENTER_Z);
    const rotZ = -sin * this.x + cos * (this.z - GLOBE_CENTER_Z) + GLOBE_CENTER_Z;
    this.sizeProjection = FIELD_OF_VIEW / (FIELD_OF_VIEW - rotZ);
    this.xProject = (rotX * this.sizeProjection) + PROJECTION_CENTER_X;
    this.yProject = (this.y * this.sizeProjection) + PROJECTION_CENTER_Y;
  }
  // Draw the dot on the canvas
  draw(sin, cos) {
    this.project(sin, cos);
    ctx.beginPath();
    ctx.arc(this.xProject, this.yProject, DOT_RADIUS * this.sizeProjection, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
  }
}

function createDots() {
  // Empty the array of dots
  dotsOne.length = 0;
  dotsTwo.length = 0;
  dotsThree.length = 0;
  
  // Create a new dot based on the amount needed
  for (let i = 0; i < DOTS_AMOUNT; i++) {
    const theta1 = Math.random() * 2 * Math.PI; // Random value between [0, 2PI]
    const phi1 = Math.acos((Math.random() * 2) - 1); // Random value between [-1, 1]
    const theta2 = Math.random() * 2 * Math.PI; // Random value between [0, 2PI]
    const phi2 = Math.acos((Math.random() * 2) - 1); // Random value between [-1, 1]
    const theta3 = Math.random() * 2 * Math.PI; // Random value between [0, 2PI]
    const phi3 = Math.acos((Math.random() * 2) - 1); // Random value between [-1, 1]
    
    // Calculate the [x, y, z] coordinates of the dot along the globe
    const x1 = GLOBE_RADIUS * orbitOne * Math.sin(phi1) * Math.cos(theta1);
    const y1 = GLOBE_RADIUS * orbitOne * Math.sin(phi1) * Math.sin(theta1);
    const z1 = (GLOBE_RADIUS * orbitOne * Math.cos(phi1)) + GLOBE_CENTER_Z;
    dotsOne.push(new Dot(x1, y1, z1));
    const x2 = GLOBE_RADIUS * orbitTwo * Math.sin(phi2) * Math.cos(theta2);
    const y2 = GLOBE_RADIUS * orbitTwo * Math.sin(phi2) * Math.sin(theta2);
    const z2 = (GLOBE_RADIUS * orbitTwo * Math.cos(phi2)) + GLOBE_CENTER_Z;
    dotsTwo.push(new Dot(x2, y2, z2));
    const x3 = GLOBE_RADIUS * orbitThree * Math.sin(phi3) * Math.cos(theta3);
    const y3 = GLOBE_RADIUS * orbitThree * Math.sin(phi3) * Math.sin(theta3);
    const z3 = (GLOBE_RADIUS * orbitThree * Math.cos(phi3)) + GLOBE_CENTER_Z;
    dotsThree.push(new Dot(x3, y3, z3));
  }
}

/* ====================== */
/* ======== RENDER ====== */
/* ====================== */
function render(a) {
  // Clear the scene
  ctx.clearRect(0, 0, width, height);
  
  // Increase the globe rotation
  rotation = a * 0.00002;
  
  const sineRotation = Math.sin(rotation); // Sine of the rotation
  const cosineRotation = Math.cos(rotation); // Cosine of the rotation
  
  // Loop through the dots array and draw every dot
  for (var i = 0; i < dotsOne.length; i++) {
    dotsOne[i].draw(sineRotation, cosineRotation);
  }
  for (var i = 0; i < dotsTwo.length; i++) {
    dotsTwo[i].draw(sineRotation, cosineRotation);
  }
  for (var i = 0; i < dotsThree.length; i++) {
    dotsThree[i].draw(sineRotation, cosineRotation);
  }
  window.requestAnimationFrame(render);
}
// Populate the dots array with random dots
createDots();
// Render the scene
window.requestAnimationFrame(render);