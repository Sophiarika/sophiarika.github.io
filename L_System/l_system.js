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

    set_global_variables(startX, startY, initialRotation, initialDirection) {
        this.start_point_X = startX;
        this.start_point_Y = startY;
        this.rotation = initialRotation;
        this.direction = initialDirection; // Initial direction (0 = right, 1 = up, 2 = left, 3 = down)
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

    drawLSystem() {
        this.generated_system
        // TODO : Implement drawing function
    }
}

//// Basic Systems ////
/// Koch Curve ///
let KochCurve = new System(
    ["F"], // Variables
    {"+": "+",
        "-": "-" }, // Constants
    "F", // Axiom
    {"F": "F+F-F-F+F"} // Rules
);

/// Binary tree ///
let BinaryTree = new System(
    ["0", "1"], // Variables
    { "[": "[", "]": "]" }, // Constants
    "0", // Axiom
    { "1": "11", "0": "1[0]0" } // Rules
);

//// General implementation ////

const canvas = document.getElementById("lSystemCanvas");
const context = canvas.getContext("2d");
// context.fillStyle = "red";
// context.fillRect(0, 0, 250, 250);


let system = KochCurve; // Default system

system.set_global_variables(0, canvas.height, 0, 0); // canvas.width ; canvas.height ; Initial rotation angle ; Initial direction (0 = right, 1 = up, 2 = left, 3 = down) 
// Set starting point at bottom-left corner, facing right

// Function to draw the L-system string
function drawLSystem(lSystemString) {
    // canvas.width = canvas.width;
    // context.clearRect(0, 0, canvas.width, canvas.height);
    context.reset();
    console.log(`Drawing L-system string: ${lSystemString}`);
    system.direction = 0; // Reset direction to right
    context.beginPath();
    context.moveTo(system.start_point_X, system.start_point_Y);

    for (let char of lSystemString) {
        if (char === "F") {
            switch (system.direction) {
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
            system.rotation += Math.PI / 2; // Rotate 90 degrees clockwise
            // context.rotate(rotation);
            // context.lineTo(context.currentX - 10, context.currentY); // Move left
            // context.currentX -= 10;
            system.direction = ((system.direction + 1) % 4 + 4) % 4;
        } else if (char === "-") {
            // context.translate(context.currentX, context.currentY); // Save current position
            system.rotation -= Math.PI / 2; // Rotate 90 degrees counter-clockwise
            // context.rotate(rotation);
            system.direction = ((system.direction - 1) % 4 + 4) % 4; // ((this % n) + n) % n
        }
        console.log(`Character: ${char}, Current Position: (${context.currentX}, ${context.currentY}), direction: ${system.direction})`);
    }
    context.stroke();
}


let generate_button = document.getElementById("generate_button");
generate_button.addEventListener("click", () => {
    // Generate the L-system string
    let iterations = document.getElementById('iterations').value;
    system.generateLSystem(iterations);
    // Initialize current position
    context.currentX = system.start_point_X;
    context.currentY = system.start_point_Y;
    // Draw the L-system string
    drawLSystem(system.generated_system);
});