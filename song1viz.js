// vars for songtext
let songtext;
let st;
let lyrics;

// vars for background pattern
let song;
let songInfo;
let patternwidth;
let colorpallete = [];

let sWords;
let supportedWords = '';

// vars for sketchRNN
let model;
let previous_pen = 'down';
let x, y;
let strokePath;
let figures = [];

// vars for StyleTransfer
let inputImg;
let style1;
let resultImg;

function preload(){
    st = loadStrings('songtext2.txt');
    songInfo = loadJSON('song1.json');
    sWords = loadStrings('sketchSupportedWords.txt');
    console.log('start now');
}

function setup(){
    normalizeText();
    cvns = createCanvas(200,200);
    cvns.hide();
    canv = createGraphics(200,200);
    canv.hide();
    canv.background(255);
    renderPattern();
    renderAIdrawing();
    stylizeImage();
    im = image(canv,0,0);
}

function normalizeText(){
    for(let i = 0; i<st.length; i++){
        lyrics = lyrics + ' ' + st[i];
    }
}

function stylizeImage(){
    inputImg = canv;

    resultImg = createImg('','resultingImg');
    resultImg.hide();
    let mdlsLight = ['la_muse', 'rain_princess', 'wreck'];
    let mdlsDark = ['scream', 'udnie', 'wave'];
    let s=0;
    if(songInfo.key>4){
        s = mdlsLight[int(random(0,3))];
    }else{
        s = mdlsDark[int(random(0,3))];
    }
    //let s = mdls[int(random(0,6))]
    //let s = mdls[5]
    // Create two Style methods with different pre-trained models
    style1 = ml5.styleTransfer('STmodels/'+s, modelLoaded);
}

// A function to be called when the models have loaded
function modelLoaded() {
    // Check if both models are loaded
    if(style1.ready){
     console.log('Ready!');
      style1.transfer(inputImg, gotResult);
    }
  }
  
function gotResult(err,img) {
    console.log('gotResult');
    if(err){
        console.log(err);
    }
    resultImg.attribute('src', img.src);
    resultImg.attribute('style', 'display: block');

    document.getElementById("loading").style.display = "none";

    console.log('Done!');
}

function renderAIdrawing(){
    supportedWords = sWords[0].split(',');
    
    console.log(lyrics);
    console.log(supportedWords);
    
    wordRanker = new WordRanker(lyrics, 5);
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
  
  // Reset the drawing
  function startDrawing() {
    //background(220);
    // Start in the middle
    x = 100;
    y = 100;
    model.reset();
    // Generate the first stroke path
    model.generate(gotStroke);
  }
  
  function aiDraw() {
      
    // If something new to draw
    if (strokePath) {
        
      // If the pen is down, draw a line
      if (previous_pen == 'down') {
        canv.stroke(240);
        canv.strokeWeight(3.0);
        canv.line(x, y, x + strokePath.dx, y + strokePath.dy);
        console.log(x,y);
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
    
      if(err){
          console.log(err);
      }
    strokePath = s;
    aiDraw();
  }

function renderPattern(){
    canv.background(255);
    console.log(songInfo);

    let cpLight = [createVector(232,72,85),createVector(225,155,113), createVector(225,253,130)];
    let cpDark = [createVector(45,48,71),createVector(27,153,139), createVector(131, 84, 240)];

    colorpallete.push(cpLight);
    colorpallete.push(cpDark);

    patternwidth = map(songInfo.tempo, 0, 200, width/15, 1);
    console.log(patternwidth);

    for(h=0; h< height/patternwidth; h++){
        let c = 0;
        for(i=0; i< width/patternwidth;i++){
            if(songInfo.danceability < 0.5){
                if(songInfo.key>4){
                    let cv = colorpallete[0][int(random(0,3))];
                    canv.noStroke();
                    canv.fill(cv.x,cv.y,cv.z);
                }else{
                    let cv = colorpallete[1][int(random(0,3))];
                    canv.noStroke();
                    canv.fill(cv.x,cv.y,cv.z);
                }
            }else{
                if(songInfo.key>4){
                    let cv = colorpallete[0][c];
                    canv.noStroke();
                    canv.fill(cv.x,cv.y,cv.z);
                    c++;
                    if(c==3){
                        c=0;
                    }
                }else{
                    let cv = colorpallete[1][c];
                    canv.noStroke();
                    canv.fill(cv.x,cv.y,cv.z);
                    c++;
                    if(c==3){
                        c=0;
                    }
                }
            }
            if(songInfo.instrumentalness > 0.4){
                canv.rect(i*patternwidth, h*patternwidth, patternwidth,patternwidth);
            }else{
                canv.ellipse(i*patternwidth, h*patternwidth, patternwidth,patternwidth);
            }
            
        }
    }
    
    let opacity = map(songInfo.energy,0,1,255,0);
    canv.fill(0,0,0,opacity);
    canv.rect(0,0,width,height);
}