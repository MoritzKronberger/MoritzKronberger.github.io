let songInfo;
let patternwidth;
let colorpallete = [];

function preload(){
    songInfo = loadJSON('eyeOfTheTiger.json')
}

function setup(){
    createCanvas(200,200);
    background(255);
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
            if(songInfo.danceability > 0.5){
                if(songInfo.key>4){
                    let cv = colorpallete[0][int(random(0,3))];
                    noStroke();
                    fill(cv.x,cv.y,cv.z);
                }else{
                    let cv = colorpallete[1][int(random(0,3))];
                    noStroke();
                    fill(cv.x,cv.y,cv.z);
                }
            }else{
                if(songInfo.key>4){
                    let cv = colorpallete[0][c];
                    noStroke();
                    fill(cv.x,cv.y,cv.z);
                    c++;
                    if(c==3){
                        c=0;
                    }
                }else{
                    let cv = colorpallete[1][c];
                    noStroke();
                    fill(cv.x,cv.y,cv.z);
                    c++;
                    if(c==3){
                        c=0;
                    }
                }
            }
            if(songInfo.instrumentalness > 0.4){
                rect(i*patternwidth, h*patternwidth, patternwidth,patternwidth);
            }else{
                ellipse(i*patternwidth, h*patternwidth, patternwidth,patternwidth);
            }
            
        }
    }
    
    let opacity = map(songInfo.energy,0,1,255,0);
    fill(0,0,0,opacity);
    rect(0,0,width,height);
}