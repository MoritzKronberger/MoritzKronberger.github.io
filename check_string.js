
var table;
var afinn;
let songtext;
let myfont;
let mycolor;
let sum;


let colordict = {
    "sad": {
        r: 255,
        g: 0,
        b: 0,
    },

    "neutral": {
        r: 255,
        g: 100,
        b: 50,
    },

    "happy": {
        r: 255,
        g: 200,
        b: 0,
    },
}

let bethellen;
let indieFlower;
let roboto_bold;
let roboto_italic;
let happy_monkey;
let better_smile;

function preload()
{
    st = loadStrings('songtext2.txt');
    afinn = loadJSON('afinn_check.json');

    // LOAD FONTS //

    bethellen = loadFont("fonts/BethEllenRegular.ttf");
    indieFlower = loadFont("fonts/IndieFlower-Regular.ttf");
    roboto_italic = loadFont("fonts/Roboto-Italic.ttf");
    roboto_regular = loadFont("fonts/Roboto-Regular.ttf");
    roboto_bold = loadFont("fonts/Roboto-Bold.ttf");
    happy_monkey = loadFont("fonts/HappyMonkey-Regular.ttf");
    better_smile = loadFont("fonts/better-smile.otf");
}

function setup()
{
    for(let i = 0; i<st.length; i++)
    {
        songtext = songtext + ' ' + st[i];
    }

   checkString(songtext);
   generateFont();
   createCanvas(400, 400)
   background(255);
   textFont(myfont);
   textSize(50);
   fill(colordict[mycolor].r, colordict[mycolor].g, colordict[mycolor].b);
   text("My example music", 110, height/2);

}

let val_counter = 0;
let val_length = 0;
function checkString(string)
    {
    let words = string.split(" ");

    for(let i = 0; i < words.length; i++)
    {
        for(var property in afinn)
        {   
            if(property == words[i])
            {
                let val_string = afinn[property].slice(-1);
                val_counter += int(val_string);
                val_length ++;
            }
        }
    }
    sum = val_counter / val_length;
    sum = 3;
}

function generateFont()
{

    // FONT CHECK

    if(sum <= -3)
    {
        myfont = bethellen;
    }

    else if(sum == -2)
    {
        myfont = indieFlower;
    }

    else if(sum == -1)
    {
        myfont = roboto_italic; 
    }

    else if(sum == 0)
    {
        myfont = roboto_regular;
    }

    else if(sum == 1)
    {
        myfont = roboto_bold;
    }

    else if(sum == 2)
    {
        myfont = happy_monkey;
    }

    else 
    {
        myfont = better_smile;
    }

    /// COLOR CHECK
    if(sum <= -1)
    {
        mycolor = "sad";
    }

    else if(sum >= 2)
    {
        mycolor = "happy";
    }

    else
    {
        mycolor = "neutral";
    }


}

