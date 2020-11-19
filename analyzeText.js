words = [];
wordset = new Set();
let songtext = '';
countedWords = {};
let rankedWords;

function preload(){
    st = loadStrings('songtext.txt');
}

function setup(){

    createCanvas(800,800);

    console.log(st);
    for(let i = 0; i<st.length; i++){
        songtext = songtext + ' ' + st[i];
    }
    console.log(songtext);
    words = songtext.split(' ');
    console.log(words);

    for( i=0; i< words.length; i++){
        wordset.add(words[i]);
    }
    console.log(wordset);

    wordset.forEach(function(e){
        let count = 0;
        for(let i =0; i< words.length; i++){
            if(words[i]==e){
                count++;
            }
        }
        countedWords[e]=count;
    });
    console.log(countedWords);
    rankedWords = sortWords(countedWords);
    console.log(rankedWords);

    for(i=0; i<10; i++){
        text(rankedWords[i], 20, (i+1)*50);
    }
}

function sortWords(obj) {
    var keys = keys = Object.keys(obj);
    return keys.sort(function(a,b){return obj[b]-obj[a]});
}