let inputImg;
let style1;
let resultImg;

function setup() {
  // !!!!!!!!!! DO NOT USE IMAGES WITH A RESOLUTION GREATER THAN 200x200 !!!!!!!!!!!
  inputImg = createImg('/imgs/testCover.png', 'ausgangsbild');

  resultImg = createImg('','resultingImg');
  resultImg.hide();

  // Create two Style methods with different pre-trained models
  style1 = ml5.styleTransfer('STmodels/scream', modelLoaded);
}

function keyReleased(){
    if(key == 't'){
        transferImages();
    }
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

  console.log('Done!');
}