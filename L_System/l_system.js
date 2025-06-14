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

// Grammar rules
// TODO : Add a way to input rules dynamically
// TODO : Also add some built in rules for common L-systems
const rules = {
    "A": "AB",
    "B": "A"
};

// Initial axiom
// TODO : Add a way to input axiom dynamically
const axiom = "A";

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
    ctx.moveTo(canvas.width / 2, canvas.height / 2); // Start in the center of the canvas

    for (let char of lSystemString) {
        if (char === "A") {
            ctx.lineTo(ctx.currentX + 10, ctx.currentY); // Move right
            ctx.currentX += 10;
        } else if (char === "B") {
            ctx.lineTo(ctx.currentX - 10, ctx.currentY); // Move left
            ctx.currentX -= 10;
        }
    }

    ctx.stroke();
}


var generate_button = document.getElementById("generate_button");
generate_button.addEventListener("click", () => {
    // Generate the L-system string
    const lSystemString = generateLSystem(axiom, rules, iterations);
    // Initialize current position
    ctx.currentX = canvas.width / 2;
    ctx.currentY = canvas.height / 2;
    // Draw the L-system string
    drawLSystem(lSystemString);
});