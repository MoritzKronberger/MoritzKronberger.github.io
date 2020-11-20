// vars for raranking words
let wordRanker;
let rankedWords;
let st;
let sngtxt;
let sWords;
let supportedWords = '';

// vars for sketchRNN
let model;
let previous_pen = 'down';
let x, y;
let strokePath;

let figures = [];


function preload(){
    st = loadStrings('songtext2.txt');
    sWords = loadStrings('sketchSupportedWords.txt');
}

function setup(){
    createCanvas(800,800);

    for(let i = 0; i<st.length; i++){
        sngtxt = sngtxt + ' ' + st[i];
    }

    supportedWords = sWords[0].split(',');
    
    console.log(sngtxt);
    console.log(supportedWords);
    
    wordRanker = new WordRanker(sngtxt, 5);
    rankedWords = wordRanker.rank();

    for(let i=0; i<rankedWords.length; i++){
        for(let h=0; h<supportedWords.length; h++){
            if(rankedWords[i]== supportedWords[h]){
                figures.push(rankedWords[i]);
                break
            }
        }
    }

    console.log(figures)

    textSize(20);
    text('Song: Eye of the Tiger - Survivor',50,50);

    for(let i = 0; i<figures.length; i++){
        model = ml5.sketchRNN(figures[i]);
        //background(220);  
        // run sketchRNN
        startDrawing();
    }
}

function modelReady() {
  console.log('model loaded');
  startDrawing();
}

// Reset the drawing
function startDrawing() {
  //background(220);
  // Start in the middle
  x = width / 2;
  y = height / 2;
  model.reset();
  // Generate the first stroke path
  model.generate(gotStroke);
}

function draw() {
  // If something new to draw
  if (strokePath) {
    // If the pen is down, draw a line
    if (previous_pen == 'down') {
      stroke(0);
      strokeWeight(3.0);
      line(x, y, x + strokePath.dx, y + strokePath.dy);
    }
    // Move the pen
    x += strokePath.dx;
    y += strokePath.dy;
    // The pen state actually refers to the next stroke
    previous_pen = strokePath.pen;

    // If the drawing is complete
    if (strokePath.pen !== 'end') {
      strokePath = null;
      model.generate(gotStroke);
    }
  }
}

// A new stroke path
function gotStroke(err, s) {
  strokePath = s;
}
