//// Import ////
// import { KochCurve, BinaryTree } from './modules/systems.js';

//// System class ////
class System {
    constructor(variables, constants, axiom, rules, angle) {
        this.variables = variables;
        this.constants = constants;
        this.axiom = axiom;
        this.rules = rules;

        this.angle = angle;

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

    generateLSystem(iterations) {
        this.generated_system = this.axiom;
        for (let i = 0; i < iterations; i++) {
            let nextResult = "";
            for (let char of this.generated_system) {
                nextResult += this.rules[char] || char; // Apply rules or keep the character
                // TODO : Add aleatory behavior to the rules when needed
                // let rules = this.rules[char]; // FIXME : Work if rules are stored in an arrays => problem, doesn't allow to ponder probabilities
                // if (rules) {
                //     nextResult += rules[Math.floor(Math.random() * rules.length)];
                // } else {
                //     nextResult += char;
                // }
            }
            this.generated_system = nextResult;
        }
    }

    drawLSystem() { // FIXME : Use a path2D object to store the path and then draw it all at once
        // TODO : Add the possibility to change line length

        context.reset();
        console.log(`Drawing L-system string: ${this.generated_system}`);

        let direction = this.initial_direction; // Reset direction
        let rotation = this.initial_rotation; // Reset rotation
        let X = this.start_point_X;
        let Y = this.start_point_Y;
    
        context.beginPath();
        context.moveTo(X, Y);

        let xv = 0;
        let xy = 0;

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

        let lifo = [];
        let lifo_pop = {};

        for (let char of this.generated_system) {
            if (char === "F" || char === "G") {
                // Move forward and draw
                X = context.currentX + ((xv * Math.cos(rotation) - xy * Math.sin(rotation)) * 10);
                Y = context.currentY + ((xv * Math.sin(rotation) + xy * Math.cos(rotation)) * 10);

                context.lineTo(X, Y);
                context.currentX = X;
                context.currentY = Y;

            } else if (char === "f") {
                // Move forward without drawing
                context.currentX = context.currentX + ((xv * Math.cos(rotation) - xy * Math.sin(rotation)) * 10);
                context.currentY = context.currentY + ((xv * Math.sin(rotation) + xy * Math.cos(rotation)) * 10);

                context.moveTo(context.currentX, context.currentY);

            } else if (char === "+") {
                // Rotate counter-clockwise
                rotation -= this.angle;

            } else if (char === "-") {
                // Rotate clockwise
                rotation += this.angle;

            } else if (char === "[") {
                // Push current state to stack
                lifo.push({x: context.currentX, y: context.currentY, rotation: rotation, direction: direction});

            } else if (char === "]") {
                // Pop previous state from stack
                lifo_pop = lifo.pop();
                context.currentX = lifo_pop.x;
                context.currentY = lifo_pop.y;
                rotation = lifo_pop.rotation;
                direction = lifo_pop.direction;

                context.moveTo(context.currentX, context.currentY);
            }

            console.log(`Character: ${char}, Current Position: (${context.currentX}, ${context.currentY}), rotation: ${rotation}, direction: ${direction})`);
        }
        context.stroke();
    }
}


//// Constants ////
const canvas = document.getElementById("lSystemCanvas");
const context = canvas.getContext("2d");
// context.fillStyle = "red";
// context.fillRect(0, 0, 250, 250);

//// Basic Systems ////
/// Koch Curve ///
let KochCurve = new System(
    ["F"], // Variables
    { "+": "+",
        "-": "-" }, // Constants
    "F", // Axiom
    {"F": "F+F-F-F+F"}, // Rules
    Math.PI/2 // Angle
);

// canvas.width ; canvas.height ; Initial rotation angle ; Initial direction (0 = right, 1 = up, 2 = left, 3 = down)
KochCurve.set_global_variables(0, canvas.height, 0, 0); // Set starting point at bottom-left corner, facing right


/// Binary tree ///
let BinaryTree = new System(
    ["F", "G"], // Variables
    { "+": "+",
        "-": "-",
        "[": "[",
        "]": "]" }, // Constants
    "F", // Axiom
    { "G": "GG", "F": "G[+F]-F" }, // Rules
    Math.PI/4 // Angle
);

// canvas.width ; canvas.height ; Initial rotation angle ; Initial direction (0 = right, 1 = up, 2 = left, 3 = down) 
BinaryTree.set_global_variables(canvas.width/2, canvas.height, 0, 1); // Set starting point at the bottom-center of the canvas, facing up


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