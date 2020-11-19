
var table;
var afinn;
let songtext;

function preload()
{
    st = loadStrings('songtext.txt');
    afinn = loadJSON('afinn_check.json');
}

function setup()
{
    for(let i = 0; i<st.length; i++)
    {
        songtext = songtext + ' ' + st[i];
    }

   checkString(songtext);
   //console.log(songtext);
}

function checkString(string )
    {
    let words = string.split(" ");

    for(let i = 0; i < words.length; i++)
    {
        for(var property in afinn)
        {   
            if(property == words[i])
            {
                console.log(property + " " + afinn[property]);
            }
        }
    }
}

