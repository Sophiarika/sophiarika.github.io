//// System class ////

export class System {
    variables: string[];
    constants: any; // FIXME : Make a dict class
    axiom: string;
    rules: any;

    constructor(variables: string[], constants: any, axiom: string, rules: any) {
        this.variables = variables;
        this.constants = constants;
        this.axiom = axiom;
        this.rules = rules;
    }
}

//// Basic Systems ////

/// Koch Curve ///
export const KochCurve = new System(
    ["F"], // Variables
    {"+": "+",
        "-": "-" }, // Constants
    "F", // Axiom
    {"F": "F+F-F-F+F"} // Rules
);

/// Binary tree ///
export const BinaryTree = new System(
    ["0", "1"], // Variables
    { "[": "[", "]": "]" }, // Constants
    "0", // Axiom
    { "1": "11", "0": "1[0]0" } // Rules
);

// export { KochCurve, BinaryTree };