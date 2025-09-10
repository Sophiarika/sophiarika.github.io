//// Import ////
// import { KochCurve, BinaryTree } from './modules/systems.js';

//// System class ////
class System {
    constructor(variables, constants, axiom, rules) {
        this.variables = variables;
        this.constants = constants;
        this.axiom = axiom;
        this.rules = rules;
    }

    generateLSystem(iterations) {
        let result = this.axiom;
        for (let i = 0; i < iterations; i++) {
            let nextResult = "";
            for (let char of result) {
                nextResult += this.rules[char] || char; // Apply rules or keep the character
                // TODO : Add aleatory behavior to the rules
            }
            result = nextResult;
        }
        this.generated_system = result;
        return result; // FIXME : remove this
    }
}

//// Basic Systems ////
/// Koch Curve ///
const KochCurve = new System(
    ["F"], // Variables
    {"+": "+",
        "-": "-" }, // Constants
    "F", // Axiom
    {"F": "F+F-F-F+F"} // Rules
);

/// Binary tree ///
const BinaryTree = new System(
    ["0", "1"], // Variables
    { "[": "[", "]": "]" }, // Constants
    "0", // Axiom
    { "1": "11", "0": "1[0]0" } // Rules
);

// function set_system(system) {
//     // Variable 
//     variable = system.variables;

//     // Constants
//     constants = system.constants;

//     // Axiom
//     // TODO : Add a way to input axiom dynamically
//     axiom = system.axiom;

//     // Rules
//     // TODO : Add a way to input rules dynamically
//     // TODO : Also add some built in rules for common L-systems
//     rules = system.rules;
// }

//// General implementation ////

const canvas = document.getElementById("lSystemCanvas");
const context = canvas.getContext("2d");
// context.fillStyle = "red";
// context.fillRect(0, 0, 250, 250);


// // Variable 
// let variable = KochCurve.variables;

// // Constants
// let constants = KochCurve.constants; // FIXME : dynamically get constants

// // Initial axiom
// let axiom = KochCurve.axiom;

// // Grammar rules
// let rules = KochCurve.rules;

// set_system(KochCurve); // Set system according to radio button selection

let system = KochCurve; // Default system


// global variables
let start_point_X = 0; // canvas.width ; 
let start_point_Y = canvas.height;
let rotation = 0; // Initial rotation angle
let direction = 0; // Initial direction (0 = right, 1 = up, 2 = left, 3 = down)

// Function to generate the L-system string
// function generateLSystem(axiom, rules) {
//     var iterations = document.getElementById('iterations').value;
//     let result = axiom;
//     for (let i = 0; i < iterations; i++) {
//         let nextResult = "";
//         for (let char of result) {
//             nextResult += rules[char] || char; // Apply rules or keep the character
//             // TODO : Add aleatory behavior to the rules
//         }
//         result = nextResult;
//     }
//     return result;
// }

// Function to draw the L-system string
function drawLSystem(lSystemString) {
    // canvas.width = canvas.width;
    // context.clearRect(0, 0, canvas.width, canvas.height);
    context.reset();
    console.log(`Drawing L-system string: ${lSystemString}`);
    direction = 0; // Reset direction to right
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


let generate_button = document.getElementById("generate_button");
generate_button.addEventListener("click", () => {
    // Generate the L-system string
    let iterations = document.getElementById('iterations').value;
    let lSystemString = system.generateLSystem(iterations);
    // Initialize current position
    context.currentX = start_point_X;
    context.currentY = start_point_Y;
    // Draw the L-system string
    drawLSystem(lSystemString);
});