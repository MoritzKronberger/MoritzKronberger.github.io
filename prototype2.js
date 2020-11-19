let model;
let strokepath = null;

let x, y;
let pen = "down";

function setup(){
    createCanvas(400,400);
    background(220);
    model = ml5.SketchRNN('cat', modelReady);
    x = width/2;
    y = height/2;
}

function draw()
{
   
    if(strokepath != null)
    {   let newX = x + strokepath.dx;
        let newY = y + strokepath.dy;
        if(pen == 'down')
        {
            line(x, y, newX, newY);
        }
        pen = strokepath.pen;
        strokepath = null;
        x = newX;
        y = newY;
        model.generate(gotSketch);
    }
}

function modelReady()
{
    console.log("modelready");
    model.reset();
    model.generate(gotSketch);
}

function gotSketch(error, s)
{
    if(error)
    {
        console.log("error");
    }
    else
    {
        strokepath = s;
        console.log(strokepath); 
    }
    
}