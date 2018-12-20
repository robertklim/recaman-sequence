let numbers = [];
let counter = 1;
let sequence = [];
let index = 0;

function setup() {
    createCanvas(600, 400);
    background(0);

    // initialize
    numbers[index] = true;
    sequence.push(index);

}

function step() {
    // attempt go backwards
    let next = index - counter;
    if (next < 0 || numbers[next]) {
        next = index + counter;
    }
    numbers[next] = true;
    sequence.push(next);

    let diameter = next - index;
    let x = (next + index) / 2;
    stroke(255);
    noFill();
    ellipse(x, floor(height / 2), diameter);

    index = next;
    counter++;
}

function draw() {
    step();
}