let video
let model

let lipObject = {}
let ready = false
let p_ready = ready
let shapes = []

let show = document.querySelector("#show")

async function loadWebcamVideo(){
    // from https://github.com/tensorflow/tfjs-models/blob/master/face-landmarks-detection/demo/index.js
    video = document.querySelector("#videoElement")

    const stream = await navigator.mediaDevices.getUserMedia({
        'audio': false,
        'video': {
            facingMode: 'user',
        },
    });
    video.srcObject = stream;

    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            resolve(video);
        };
    });
}



async function loadTfModel() {
    model = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
        //modelConfig
    );
    console.log("<---- downloaded model: ---->")
    console.log(model)
}

async function predictLandmarks() {
  // Load the MediaPipe Facemesh package.

  // Pass in a video stream (or an image, canvas, or 3D tensor) to obtain an
  // array of detected faces from the MediaPipe graph. If passing in a video
  // stream, a single prediction per frame will be returned.
  const predictions = await model.estimateFaces({
    input: video,
  });

  if (predictions.length > 0) {
    for (let i = 0; i < predictions.length; i++) {
      /*const keypoints = predictions[i].scaledMesh;

      // Log facial keypoints.
      for (let i = 0; i < keypoints.length; i++) {
        const [x, y, z] = keypoints[i];

        console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
      }*/
    }
    lip["lowerInner"] = predictions[0].annotations.lipsLowerInner
    lip["lowerOuter"] = predictions[0].annotations.lipsLowerOuter
    lip["upperInner"] = predictions[0].annotations.lipsUpperInner
    lip["upperOuter"] = predictions[0].annotations.lipsUpperOuter
    ready = true
    show.style.display = "none"
  }
  rafID = requestAnimationFrame(()=> predictLandmarks());
}

async function main() {
    await loadWebcamVideo()
    show.innerHTML = "Loading Model ..."
    await loadTfModel()
    predictLandmarks()
}

main()
