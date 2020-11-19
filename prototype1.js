let img;
let objDet

objects = [];

function preload(){
    img = loadImage('/imgs/catDog.jpg')
}

function setup() {
    createCanvas(img.width, img.height);
    background(20);
    fill(245,245,245,150);
    fill(0);
    objDet = ml5.objectDetector('yolo', {}, modelLoaded);

    objDet.detect(img, function(error, results){
        if(error){
            console.log(error);
        }
        for(let i =0; i<results.length; i++){
            console.log(results[i]);
            objects.push(results[i]['label']);
            textSize((results[i]['width']*results[i]['height'])/200);
            text(results[i]['label'], results[i]['x']+(results[i]['width']/2),results[i]['y']+(results[i]['height']/2));
        }
    });
    image(img, 0,0,width,height)
}

// When the model is loaded
function modelLoaded() {
    console.log('Model Loaded!');
} 
