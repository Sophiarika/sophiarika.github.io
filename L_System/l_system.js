// import * as THREE from "three"; // "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.174.0/three.tsl.js";

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setAnimationLoop( animate );
// document.body.appendChild( renderer.domElement );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// camera.position.z = 5;

// function animate() {

//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;

//   renderer.render( scene, camera );

// }


const canvas = document.getElementById("lSystemCanvas");
const ctx = canvas.getContext("2d");
// ctx.fillStyle = "red";
// ctx.fillRect(0, 0, 250, 250);


// Variable 
const variable = ["F"];

// Constants
const constants = {
    "+": "+",
    "-": "-"
};

// Initial axiom
// TODO : Add a way to input axiom dynamically
const axiom = "F";

// Grammar rules
// TODO : Add a way to input rules dynamically
// TODO : Also add some built in rules for common L-systems
const rules = {
    "F": "F+F-F-F+F"
};

// global variables
let start_point_X = canvas.width / 2; 
let start_point_Y = canvas.height / 2;
let rotation = 0; // Initial rotation angle
let direction = 0; // Initial direction (0 = right, 1 = up, 2 = left, 3 = down)

// Number of iterations
const iterations = document.getElementById('iterations').value;

// Function to generate the L-system string
function generateLSystem(axiom, rules, iterations) {
    let result = axiom;
    for (let i = 0; i < iterations; i++) {
        let nextResult = "";
        for (let char of result) {
            nextResult += rules[char] || char; // Apply rules or keep the character
            // TODO : Add aleatory behavior to the rules
        }
        result = nextResult;
    }
    return result;
}

// Function to draw the L-system string
function drawLSystem(lSystemString) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(start_point_X, start_point_Y);

    for (let char of lSystemString) {
        if (char === "F") {
            switch (direction) {
                case 0: // Right
                    ctx.lineTo(ctx.currentX + 10, ctx.currentY);
                    ctx.currentX += 10;
                    break;
                case 1: // Up
                    ctx.lineTo(ctx.currentX, ctx.currentY - 10);
                    ctx.currentY -= 10;
                    break;
                case 2: // Left
                    ctx.lineTo(ctx.currentX - 10, ctx.currentY);
                    ctx.currentX -= 10;
                    break;
                case 3: // Down
                    ctx.lineTo(ctx.currentX, ctx.currentY + 10);
                    ctx.currentY += 10;
                    break;
            }
            // ctx.lineTo(ctx.currentX + 10, ctx.currentY); // Move right
            // ctx.currentX += 10;
        } else if (char === "+") {
            // ctx.translate(ctx.currentX, ctx.currentY); // Save current position
            rotation += Math.PI / 2; // Rotate 90 degrees clockwise
            // ctx.rotate(rotation);
            // ctx.lineTo(ctx.currentX - 10, ctx.currentY); // Move left
            // ctx.currentX -= 10;
            direction = ((direction + 1) % 4 + 4) % 4;
        } else if (char === "-") {
            // ctx.translate(ctx.currentX, ctx.currentY); // Save current position
            rotation -= Math.PI / 2; // Rotate 90 degrees counter-clockwise
            // ctx.rotate(rotation);
            direction = ((direction - 1) % 4 + 4) % 4; // ((this % n) + n) % n
        }
        console.log(`Character: ${char}, Current Position: (${ctx.currentX}, ${ctx.currentY}), direction: ${direction})`);
    }
    ctx.stroke();
}


var generate_button = document.getElementById("generate_button");
generate_button.addEventListener("click", () => {
    // Generate the L-system string
    const lSystemString = generateLSystem(axiom, rules, iterations);
    // Initialize current position
    ctx.currentX = start_point_X;
    ctx.currentY = start_point_Y;
    // Draw the L-system string
    drawLSystem(lSystemString);
});