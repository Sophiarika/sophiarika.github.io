//// System class ////

export class System {
    variables: string[];
    constants: {"+":string, "-":string, "[":string, "]":string}; 
    axiom: string;
    rules: any; // FIXME : Make a dict class
    angle: number;
    generated_system: string;
    start_point_X: number;
    start_point_Y: number;
    initial_direction: number;

    constructor(axiom: string, rules: any, angle: number) {
        this.variables = ["F", "G", "f", "g"]; // Variables
        this.constants = { "+": "+",
            "-": "-",
            "[": "[",
            "]": "]" }, // Constants

        this.axiom = axiom; // TODO : Add safeguard to make sure axiom is valid
        this.rules = rules; // TODO : Add safeguard to make sure rules are valid

        this.angle = angle;

        this.generated_system = "";
        this.start_point_X = 0;
        this.start_point_Y = 0;
        this.initial_direction = 0; // Initial direction (0 = right, 1 = up, 2 = left, 3 = down)
        // this.initial_rotation = initialRotation;
    }

    set_global_variables(startX: number, startY: number, initialDirection: number) {
        this.start_point_X = startX;
        this.start_point_Y = startY;
        this.initial_direction = initialDirection; // Initial direction (0 = right, 1 = up, 2 = left, 3 = down)
        // this.initial_rotation = initialRotation;
    }

    generateLSystem(iterations: number) {
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

    drawLSystem(context:any) { // FIXME : Use a path2D object to store the path and then draw it all at once
        // TODO : Add the possibility to change line length

        context.reset();
        console.log(`Drawing L-system string: ${this.generated_system}`);

        let direction = this.initial_direction; // Reset direction
        let rotation = 0; // Reset rotation
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
        let lifo_pop: any; // = {}; // FIXME : Define better type

        for (let char of this.generated_system) {
            if (char === "F" || char === "G") {
                // Move forward and draw
                X = context.currentX + ((xv * Math.cos(rotation) - xy * Math.sin(rotation)) * 10);
                Y = context.currentY + ((xv * Math.sin(rotation) + xy * Math.cos(rotation)) * 10);

                context.lineTo(X, Y);
                context.currentX = X;
                context.currentY = Y;

            } else if (char === "f" || char === "g") {
                // Move forward without drawing
                context.currentX = context.currentX + ((xv * Math.cos(rotation) - xy * Math.sin(rotation)) * 10);
                context.currentY = context.currentY + ((xv * Math.sin(rotation) + xy * Math.cos(rotation)) * 10);

                context.moveTo(context.currentX, context.currentY);

            } else if (char === "+") {
                // Rotate counter-clockwise
                rotation -= this.angle; // sens trigo

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

//// Basic Systems ////

/// Koch Curve ///
export const KochCurve = new System(
    "F", // Axiom
    {"F": "F+F-F-F+F"}, // Rules
    Math.PI/2 // Angle
);

/// Binary tree ///
export const BinaryTree = new System(
    "G", // Axiom
    { "F": "FF", "G": "F[+G]-G" }, // Rules
    Math.PI/4 // Angle
);

export let Empty = new System(
    "", // Axiom
    {}, // Rules
    0 // Angle
);