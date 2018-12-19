let numbers = [];
let counter = 1;
let sequence = [];
let index = 0;

function setup() {
    createCanvas(600, 400);
    
    // initialize
    numbers[index] = true;
    sequence.push(index);

    for (let i = 0; i < 10; i++) {
        step();
    }

    console.log(sequence);

}

function step() {
    // attempt go backwards
    let next = index - counter;
    if (next < 0 || numbers[next]) {
        next = index + counter;
    }
    numbers[next] = true;
    sequence.push(next);
    index = next;
    counter++;
}

function draw() {
    background(0);
}