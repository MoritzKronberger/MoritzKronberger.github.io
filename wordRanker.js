function WordRanker(songtext, threshold){

    
    this.words = [];
    this.wordset = new Set();
    this.songtext = songtext;
    this.countedWords = {};
    this.rankedWords;
    
    this.threshold = threshold;
    
    this.rank = function(){
        console.log(this.songtext);
        this.words = this.songtext.split(' ');
        console.log(this.words);
    
        for( i=1; i< this.words.length; i++){
            this.wordset.add(this.words[i]);
        }
        console.log(this.wordset);
        console.log(this.words);

        let ws = this.words;
        let th = this.threshold;
        let cW = {};
    
        this.wordset.forEach(function(e){
            let count = 0;
            for(let i = 0; i< ws.length; i++){
                if(ws[i]==e){
                    count++;
                }
            }
            if(count >= th){
                cW[e]=count;
            }
        });
        this.countedWords = cW;
        console.log(this.countedWords);
        this.rankedWords = sortWords(this.countedWords);
        console.log(this.rankedWords);
        
        return this.rankedWords;
    }
    
    function sortWords(obj) {
        var keys = keys = Object.keys(obj);
        return keys.sort(function(a,b){return obj[b]-obj[a]});
    }
}