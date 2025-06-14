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
const context = canvas.getContext("2d");
// context.fillStyle = "red";
// context.fillRect(0, 0, 250, 250);


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
let start_point_X = 0; // canvas.width ; 
let start_point_Y = canvas.height;
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
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.moveTo(start_point_X, start_point_Y);

    for (let char of lSystemString) {
        if (char === "F") {
            switch (direction) {
                case 0: // Right
                    context.lineTo(context.currentX + 10, context.currentY);
                    context.currentX += 10;
                    break;
                case 1: // Up
                    context.lineTo(context.currentX, context.currentY - 10);
                    context.currentY -= 10;
                    break;
                case 2: // Left
                    context.lineTo(context.currentX - 10, context.currentY);
                    context.currentX -= 10;
                    break;
                case 3: // Down
                    context.lineTo(context.currentX, context.currentY + 10);
                    context.currentY += 10;
                    break;
            }
            // context.lineTo(context.currentX + 10, context.currentY); // Move right
            // context.currentX += 10;
        } else if (char === "+") {
            // context.translate(context.currentX, context.currentY); // Save current position
            rotation += Math.PI / 2; // Rotate 90 degrees clockwise
            // context.rotate(rotation);
            // context.lineTo(context.currentX - 10, context.currentY); // Move left
            // context.currentX -= 10;
            direction = ((direction + 1) % 4 + 4) % 4;
        } else if (char === "-") {
            // context.translate(context.currentX, context.currentY); // Save current position
            rotation -= Math.PI / 2; // Rotate 90 degrees counter-clockwise
            // context.rotate(rotation);
            direction = ((direction - 1) % 4 + 4) % 4; // ((this % n) + n) % n
        }
        console.log(`Character: ${char}, Current Position: (${context.currentX}, ${context.currentY}), direction: ${direction})`);
    }
    context.stroke();
}


var generate_button = document.getElementById("generate_button");
generate_button.addEventListener("click", () => {
    // Generate the L-system string
    const lSystemString = generateLSystem(axiom, rules, iterations);
    // Initialize current position
    context.currentX = start_point_X;
    context.currentY = start_point_Y;
    // Draw the L-system string
    drawLSystem(lSystemString);
});