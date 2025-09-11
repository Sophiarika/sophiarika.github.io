//// Import ////
// import { KochCurve, BinaryTree } from './modules/systems.js';

//// System class ////
class System {
    constructor(variables, constants, axiom, rules) {
        this.variables = variables;
        this.constants = constants;
        this.axiom = axiom;
        this.rules = rules;
        this.generated_system = "";
    }

    drawLSystem() {
        console.log("No draw function defined yet.");
    }

    set_global_variables(startX, startY, initialRotation, initialDirection) {
        this.start_point_X = startX;
        this.start_point_Y = startY;
        this.initial_rotation = initialRotation;
        this.initial_direction = initialDirection; // Initial direction (0 = right, 1 = up, 2 = left, 3 = down)
    }

    set_drawLSystem_function(drawFunction) {
        this.drawLSystem = drawFunction;
    }

    generateLSystem(iterations) {
        this.generated_system = this.axiom;
        for (let i = 0; i < iterations; i++) {
            let nextResult = "";
            for (let char of this.generated_system) {
                nextResult += this.rules[char] || char; // Apply rules or keep the character
                // TODO : Add aleatory behavior to the rules when needed
            }
            this.generated_system = nextResult;
        }
    }
}

// TODO : See if I can make a more general implementation of the drawLSystem function, maybe by harmonizing the grammars

//// Constants ////
const canvas = document.getElementById("lSystemCanvas");
const context = canvas.getContext("2d");
// context.fillStyle = "red";
// context.fillRect(0, 0, 250, 250);

//// Basic Systems ////
/// Koch Curve ///
let KochCurve = new System(
    ["F"], // Variables
    {"+": "+",
        "-": "-" }, // Constants
    "F", // Axiom
    {"F": "F+F-F-F+F"} // Rules
);

function drawKochCurve() {
    // canvas.width = canvas.width;
    // context.clearRect(0, 0, canvas.width, canvas.height);
    context.reset();
    console.log(`Drawing L-system string: ${this.generated_system}`);
    direction = this.initial_direction; // Reset direction to right
    rotation = this.initial_rotation; // Reset rotation to 0
    context.beginPath();
    let X = this.start_point_X;
    let Y = this.start_point_Y;
    context.moveTo(X, Y);

    let xv = 0;
    let xy = 0;

    for (let char of this.generated_system) {
        if (char === "F") {
            switch (direction) {
                case 0: // Right
                    xv = 1;
                    xy = 0;                
                    break;
                case 1: // Up
                    xv = 0;
                    xy = -1;
                    break;
                case 2: // Left
                    xv = -1;
                    xy = 0;
                    break;
                case 3: // Down
                    xv = 0;
                    xy = 1;
                    break;
            }
            X = context.currentX + ((xv * Math.cos(rotation) - xy * Math.sin(rotation)) * 10);
            Y = context.currentY + ((xv * Math.sin(rotation) + xy * Math.cos(rotation)) * 10);

            context.lineTo(X, Y);
            context.currentX = X;
            context.currentY = Y;

        } else if (char === "+") {
            rotation -= Math.PI / 2; // Rotate 90 degrees counter-clockwise
            // this.direction = ((this.direction + 1) % 4 + 4) % 4;
        } else if (char === "-") {
            rotation += Math.PI / 2; // Rotate 90 degrees clockwise
            // this.direction = ((this.direction - 1) % 4 + 4) % 4; // ((this % n) + n) % n
        }
        console.log(`Character: ${char}, Current Position: (${context.currentX}, ${context.currentY}), direction: ${direction})`);
    }
    context.stroke();
}

KochCurve.set_global_variables(0, canvas.height, 0, 0); // canvas.width ; canvas.height ; Initial rotation angle ; Initial direction (0 = right, 1 = up, 2 = left, 3 = down) 
// Set starting point at bottom-left corner, facing right
KochCurve.set_drawLSystem_function(drawKochCurve);

/// Binary tree ///
let BinaryTree = new System(
    ["0", "1"], // Variables
    { "[": "[", "]": "]" }, // Constants
    "0", // Axiom
    { "1": "11", "0": "1[0]0" } // Rules
);

function drawBinaryTree() {
    context.reset();
    console.log(`Drawing L-system string: ${this.generated_system}`);
    direction = this.initial_direction; // Reset direction to up
    rotation = this.initial_rotation; // Reset rotation to 0
    let X = this.start_point_X;
    let Y = this.start_point_Y;
    
    context.beginPath();
    context.moveTo(X, Y);

    let xv = 0;
    let xy = 0;

    let lifo = [];
    let lifo_pop = {};

    for (let char of this.generated_system) {
        if (char === "0" || char === "1") {
            switch (direction) {
                case 0: // Right
                    xv = 1;
                    xy = 0;                
                    break;
                case 1: // Up
                    xv = 0;
                    xy = -1;
                    break;
                case 2: // Left
                    xv = -1;
                    xy = 0;
                    break;
                case 3: // Down
                    xv = 0;
                    xy = 1;
                    break;
            }
            X = context.currentX + ((xv * Math.cos(rotation) - xy * Math.sin(rotation)) * 10);
            Y = context.currentY + ((xv * Math.sin(rotation) + xy * Math.cos(rotation)) * 10);

            context.lineTo(X, Y);
            context.currentX = X;
            context.currentY = Y;

        } else if (char === "[") {
            lifo.push({x: context.currentX, y: context.currentY, rotation: rotation, direction: direction});
            rotation += Math.PI / 4; // Rotate 45 degrees counter-clockwise
            // direction = ((direction + 1) % 4 + 4) % 4;

        } else if (char === "]") {
            lifo_pop = lifo.pop();
            context.currentX = lifo_pop.x;
            context.currentY = lifo_pop.y;
            rotation = lifo_pop.rotation;
            direction = lifo_pop.direction;

            rotation -= Math.PI / 4; // Rotate 45 degrees clockwise
            // direction = ((direction - 1) % 4 + 4) % 4; // ((this % n) + n) % n
        }

        console.log(`Character: ${char}, Current Position: (${context.currentX}, ${context.currentY}), direction: ${direction})`);
    }
    context.stroke();
}

// canvas.width ; canvas.height ; Initial rotation angle ; Initial direction (0 = right, 1 = up, 2 = left, 3 = down) 
BinaryTree.set_global_variables(canvas.width/2, canvas.height, 0, 1);
// Set starting point at the bottom-center of the canvas, facing up
BinaryTree.set_drawLSystem_function(drawBinaryTree);

//// General implementation ////
let system = KochCurve; // Default system


/// Generate button ///
let generate_button = document.getElementById("generate_button");
generate_button.addEventListener("click", () => {
    // Generate the L-system string
    let iterations = document.getElementById('iterations').value;
    system.generateLSystem(iterations);
    // Initialize current position
    context.currentX = system.start_point_X;
    context.currentY = system.start_point_Y;
    // Draw the L-system string
    system.drawLSystem();
});

/// System selection ///
let system_radio = document.forms["system_form"].elements["system"];
document.getElementById("kochCurve").checked = true; // FIXME : Use that for all the onclick functions ? 

console.log(system_radio.value);
console.log(system_radio[0]);

for (i = 0; i < system_radio.length; i++) {
    system_radio[i].onclick = function() {
        if (this.value === "kochCurve") {
            system = KochCurve;
        } else if (this.value === "binaryTree") {
            system = BinaryTree;
        }
    }
}