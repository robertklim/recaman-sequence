let numbers = [];
let counter = 1;
let sequence = [];
let index = 0;

let arcs = [];

class Arc {
    constructor(start, end, dir) {
        this.start = start;
        this.end = end;
        this.dir = dir;
    }

    show() {
        let diameter = abs(this.end - this.start);
        let x = (this.end + this.start) / 2;
        stroke(255);
        noFill();
        if (this.dir === 0) {
            arc(x, floor(height / 2), diameter, diameter, PI, 0);
        } else {
            arc(x, floor(height / 2), diameter, diameter, 0, PI);
        }
    }

}

function setup() {
    createCanvas(600, 400);
    background(0);

    // initialize
    numbers[index] = true;
    sequence.push(index);

    // for (let i = 0; i < 152; i++) {
    //     step();
    // }

}

function step() {
    // attempt go backwards
    let next = index - counter;
    if (next < 0 || numbers[next]) {
        next = index + counter;
    }
    numbers[next] = true;
    sequence.push(next);

    let a = new Arc(index, next, counter % 2);
    arcs.push(a);

    index = next;
    counter++;
}

function draw() {
    background(0);
    step();

    for (let arc of arcs) {
       arc.show(); 
    }

}