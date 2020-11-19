

let wordRanker;
let rankedWords;
let st;
let sngtxt;

function preload(){

    st = loadStrings('songtext.txt');
    
}

function setup(){
    createCanvas(800,800);

    console.log(st[0]);

    for(let i = 0; i<st.length; i++){
        sngtxt = sngtxt + ' ' + st[i];
    }
    
    console.log(sngtxt);
    
    wordRanker = new WordRanker(sngtxt, 5);
    rankedWords = wordRanker.rank();

    for(i=0; i<10; i++){
        text(rankedWords[i], 20, (i+1)*50);
    }
}

