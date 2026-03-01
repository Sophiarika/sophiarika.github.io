//// System class ////
System.register("systems", [], function (exports_1, context_1) {
    "use strict";
    var System, KochCurve, BinaryTree, Empty;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {//// System class ////
            System = /** @class */ (function () {
                function System(axiom, rules, angle) {
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
                System.prototype.set_global_variables = function (startX, startY, initialDirection) {
                    this.start_point_X = startX;
                    this.start_point_Y = startY;
                    this.initial_direction = initialDirection; // Initial direction (0 = right, 1 = up, 2 = left, 3 = down)
                    // this.initial_rotation = initialRotation;
                };
                System.prototype.generateLSystem = function (iterations) {
                    this.generated_system = this.axiom;
                    for (var i = 0; i < iterations; i++) {
                        var nextResult = "";
                        for (var _i = 0, _a = this.generated_system; _i < _a.length; _i++) {
                            var char = _a[_i];
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
                };
                System.prototype.drawLSystem = function (context) {
                    // TODO : Add the possibility to change line length
                    context.reset();
                    console.log("Drawing L-system string: ".concat(this.generated_system));
                    var direction = this.initial_direction; // Reset direction
                    var rotation = 0; // Reset rotation
                    var X = this.start_point_X;
                    var Y = this.start_point_Y;
                    context.beginPath();
                    context.moveTo(X, Y);
                    var xv = 0;
                    var xy = 0;
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
                    var lifo = [];
                    var lifo_pop; // = {}; // FIXME : Define better type
                    for (var _i = 0, _a = this.generated_system; _i < _a.length; _i++) {
                        var char = _a[_i];
                        if (char === "F" || char === "G") {
                            // Move forward and draw
                            X = context.currentX + ((xv * Math.cos(rotation) - xy * Math.sin(rotation)) * 10);
                            Y = context.currentY + ((xv * Math.sin(rotation) + xy * Math.cos(rotation)) * 10);
                            context.lineTo(X, Y);
                            context.currentX = X;
                            context.currentY = Y;
                        }
                        else if (char === "f" || char === "g") {
                            // Move forward without drawing
                            context.currentX = context.currentX + ((xv * Math.cos(rotation) - xy * Math.sin(rotation)) * 10);
                            context.currentY = context.currentY + ((xv * Math.sin(rotation) + xy * Math.cos(rotation)) * 10);
                            context.moveTo(context.currentX, context.currentY);
                        }
                        else if (char === "+") {
                            // Rotate counter-clockwise
                            rotation -= this.angle; // sens trigo
                        }
                        else if (char === "-") {
                            // Rotate clockwise
                            rotation += this.angle;
                        }
                        else if (char === "[") {
                            // Push current state to stack
                            lifo.push({ x: context.currentX, y: context.currentY, rotation: rotation, direction: direction });
                        }
                        else if (char === "]") {
                            // Pop previous state from stack
                            lifo_pop = lifo.pop();
                            context.currentX = lifo_pop.x;
                            context.currentY = lifo_pop.y;
                            rotation = lifo_pop.rotation;
                            direction = lifo_pop.direction;
                            context.moveTo(context.currentX, context.currentY);
                        }
                        console.log("Character: ".concat(char, ", Current Position: (").concat(context.currentX, ", ").concat(context.currentY, "), rotation: ").concat(rotation, ", direction: ").concat(direction, ")"));
                    }
                    context.stroke();
                };
                return System;
            }());
            exports_1("System", System);
            //// Basic Systems ////
            /// Koch Curve ///
            exports_1("KochCurve", KochCurve = new System("F", // Axiom
            { "F": "F+F-F-F+F" }, // Rules
            Math.PI / 2 // Angle
            ));
            /// Binary tree ///
            exports_1("BinaryTree", BinaryTree = new System("G", // Axiom
            { "F": "FF", "G": "F[+G]-G" }, // Rules
            Math.PI / 4 // Angle
            ));
            exports_1("Empty", Empty = new System("", // Axiom
            {}, // Rules
            0 // Angle
            ));
        }
    };
});
System.register("misc", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    //// Misc ////
    function rad2deg(rad) {
        return rad * (180 / Math.PI);
    }
    exports_2("rad2deg", rad2deg);
    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
    exports_2("deg2rad", deg2rad);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("main", ["systems", "misc"], function (exports_3, context_3) {
    "use strict";
    var systems_1, misc_1, canvas, context, system, add_rule_button, generate_button, system_radio;
    var __moduleName = context_3 && context_3.id;
    //// General implementation ////
    function setLsystem() {
        document.getElementById('x_start').value = system.start_point_X;
        document.getElementById('y_start').value = system.start_point_Y;
        document.getElementById('axiom').value = system.axiom;
        document.getElementById('rules').value = JSON.stringify(system.rules); // TODO : Make one rules per line
        document.getElementById('angle').value = misc_1.rad2deg(system.angle);
        switch (system.initial_direction) {
            case 0: // Right
                document.getElementById("right").checked = true;
                break;
            case 1: // Up
                document.getElementById("up").checked = true;
                break;
            case 2: // Left
                document.getElementById("left").checked = true;
                break;
            case 3: // Down
                document.getElementById("down").checked = true;
                break;
        }
    }
    function updateLsystem() {
        system.start_point_X = parseFloat(document.getElementById('x_start').value);
        system.start_point_Y = parseFloat(document.getElementById('y_start').value);
        system.axiom = document.getElementById('axiom').value;
        system.rules = JSON.parse(document.getElementById('rules').value);
        system.angle = misc_1.deg2rad(parseFloat(document.getElementById('angle').value));
        if (document.getElementById("right").checked === true) {
            system.initial_direction = 0;
        }
        else if (document.getElementById("up").checked === true) {
            system.initial_direction = 1;
        }
        else if (document.getElementById("left").checked === true) {
            system.initial_direction = 2;
        }
        else if (document.getElementById("down").checked === true) {
            system.initial_direction = 3;
        }
    }
    function parseRule() {
    }
    function addRule() {
        var new_rule = document.createElement('li');
        var rule_text = document.createElement("span");
        var supress_btn = document.createElement("button");
        supress_btn.textContent = "X";
        supress_btn.addEventListener("click", function () {
            // Remove the rule from the list
            new_rule.remove();
            // TODO : supress rule from system
        });
        new_rule.appendChild(rule_text);
        new_rule.appendChild(supress_btn);
        rule_text.textContent = JSON.stringify(rule);
        var rules_list = document.getElementById("rules_list");
        rules_list.appendChild(new_rule);
    }
    return {
        setters: [
            function (systems_1_1) {
                systems_1 = systems_1_1;
            },
            function (misc_1_1) {
                misc_1 = misc_1_1;
            }
        ],
        execute: function () {
            //// Constants ////
            canvas = document.getElementById("lSystemCanvas");
            context = canvas.getContext("2d");
            // context.fillStyle = "red";
            // context.fillRect(0, 0, 250, 250);
            //// Basic Systems ////
            /// Koch Curve ///
            // let KochCurve = new System(
            //     "F", // Axiom
            //     {"F": "F+F-F-F+F"}, // Rules
            //     Math.PI/2 // Angle
            // );
            // let something = { // FIXME 
            //     "F": {rules: ["F+F-F-F+F", "F+F+F-F-F-F+F+F+F"], // Example of multiple rules for the same variable
            //         probabilities: [0.5, 0.5]} // Example of probabilities for each rule (should sum to 1)
            // Use weight instead of probabilities ?
            // }
            // canvas.width ; canvas.height ; Initial rotation angle ; Initial direction (0 = right, 1 = up, 2 = left, 3 = down)
            systems_1.KochCurve.set_global_variables(0, canvas.height, 0); // Set starting point at bottom-left corner, facing right
            /// Binary tree ///
            // let BinaryTree = new System(
            //     "G", // Axiom
            //     { "F": "FF", "G": "F[+G]-G" }, // Rules
            //     Math.PI/4 // Angle
            // );
            // canvas.width ; canvas.height ; Initial rotation angle ; Initial direction (0 = right, 1 = up, 2 = left, 3 = down) 
            systems_1.BinaryTree.set_global_variables(canvas.width / 2, canvas.height, 1); // Set starting point at the bottom-center of the canvas, facing up
            // let Empty = new System(
            //     [], // Variables
            //     {}, // Constants
            //     "", // Axiom
            //     {}, // Rules
            //     0 // Angle
            // );
            systems_1.Empty.set_global_variables(canvas.width / 2, canvas.height / 2, 0);
            system = systems_1.KochCurve; // Default system
            setLsystem();
            /// Rule add button ///
            add_rule_button = document.getElementById("add_rule_button");
            // add_rule_button.addEventListener("click", addRule);
            /// Generate button ///
            generate_button = document.getElementById("generate_button");
            generate_button.addEventListener("click", function () {
                // Generate the L-system string
                var iterations = document.getElementById('iterations').value;
                updateLsystem();
                system.generateLSystem(iterations);
                // Initialize current position
                context.currentX = system.start_point_X;
                context.currentY = system.start_point_Y;
                // Draw the L-system string
                system.drawLSystem(context);
            });
            /// System selection ///
            system_radio = document.forms["system_form"].elements["system"];
            document.getElementById("kochCurve").checked = true; // FIXME : Use that for all the onclick functions ? 
            console.log(system_radio.value);
            console.log(system_radio[0]);
            for (i = 0; i < system_radio.length; i++) {
                system_radio[i].onclick = function () {
                    if (this.value === "kochCurve") {
                        system = systems_1.KochCurve;
                    }
                    else if (this.value === "binaryTree") {
                        system = systems_1.BinaryTree;
                    }
                    else if (this.value === "Empty") {
                        system = systems_1.Empty;
                    }
                    setLsystem();
                    console.log("System changed to: ".concat(this.value));
                };
            }
        }
    };
});
