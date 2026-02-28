# L-system informations

An interactive website made to work in a navigator and allow to try some usual grammar for L-system and create your own.

[25/01/2026\] Need to be upgraded to typescrit and svelte for more versatility and easy upgrade 



| Character     | Meaning                                                     |
|---------------|-------------------------------------------------------------|
| F             | Move forward and draw a line                                |
| G             | Move forward and draw a line                                |
| f             | Move forward without drawing a line                         |
| g             | Move forward without drawing a line                         |
| other letters | Do nothing                                                  |
| +             | Turn left by a defined angle                                |
| -             | Turn right by a defined angle                               |
| [             | Push current drawing state to the stack                     |
| ]             | Pop previous drawing state from the stack                   |


```sh
tsc src/*.ts --outfile l_system.js
```