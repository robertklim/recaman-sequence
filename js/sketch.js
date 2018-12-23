let numbers = [];
let counter = 1;
let sequence = [];
let index = 0;

let arcs = [];

let biggest = 0;

let osc;

let env;

var attackLevel = 1.0;
var releaseLevel = 0;

var attackTime = 0.001
var decayTime = 0.2;
var susPercent = 0.2;
var releaseTime = 0.5;

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
            arc(x, 0, diameter, diameter, PI, 0);
        } else {
            arc(x, 0, diameter, diameter, 0, PI);
        }
    }

}

function setup() {
    frameRate(5);
    createCanvas(windowWidth, windowHeight);
    background(0);

    // create an envelope
    env = new p5.Envelope();
    env.setADSR(attackTime, decayTime, susPercent, releaseTime);
    env.setRange(attackLevel, releaseLevel);

    // create an oscilator
    osc = new p5.Oscillator();
    osc.setType('sine');
    //osc.freq(240);
    osc.amp(env);
    osc.start();

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

    let n = (index % 25) + 48;

    let freq = pow(2, (n - 49) / 12) * 440;
    osc.freq(freq);
    env.play();

    if (index > biggest) {
        biggest = index;
    }

    counter++;
}

function draw() {
    step();
    
    background(0);
    translate(0, floor(height / 2));
    scale(width / biggest);

    for (let arc of arcs) {
       arc.show(); 
    }

}