
var table;
var afinn;

examplestring = "I am alone at home";

function preload()
{
    afinn = loadJSON('afinn_check.json');
}

function setup()
{
   checkString(examplestring);
   console.log(afinn[0][0] + "hello");
}

function checkString(string)
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

