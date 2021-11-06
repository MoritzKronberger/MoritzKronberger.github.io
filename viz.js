let canv

function drawSection(section){
    for (let i=0; i<section.length; i++){
        let vert = section[i]
        vertex(vert.x, vert.y)
    }
}

function drawShape(sections) {
    section = []
    sections[0].forEach(vert => {
        section.push(vert)
    });
    sections[1].reverse().forEach(vert => {
        section.push(vert)
    });

    fill(210)
    noStroke()
    beginShape()
    drawSection(section)
    endShape(CLOSE)

    stroke(150)
    strokeWeight(4)
    beginShape(POINTS)
    drawSection(section)
    endShape()
}

function transformShapes(shapes, width, height){
    let min = createVector(width, height)
    let max_x = 0
    let linearized = []

    shapes.forEach(shape => {
        shape.forEach(vert => {
            linearized.push(vert)
        });
    });

    linearized.forEach(vert => {
        if(vert.x < min.x){
            min.x = vert.x
        }
        if(vert.y < min.y){
            min.y = vert.y
        }
    });

    linearized.forEach(vert => {
        vert.sub(min)
    });

    linearized.forEach(vert => {
        if(vert.x > max_x){
            max_x = vert.x
        }
    });

    sx = width/max_x
    let scale = createVector(sx, sx)

    shapes.forEach(shape => {
        shape.forEach(vert => {
            vert.mult(scale)       
        });
    });
}

function vectorize(obj){
    vectors = []
    for (let part of Object.entries(obj)){
        arr = []
        part[1].forEach(vert => {
            v = createVector(vert[0], vert[1])
            arr.push(v)
        });
        vectors.push(arr)
    }
    return vectors
}

function setup() {
    createCanvas(500, 500)
    canv = document.getElementsByClassName('p5Canvas')[0]
    canv.style.display = 'none'
    background(255)
    main()
}

function draw(){
    if(Object.keys(lip).length > 0){
        canv.style.display = 'block'
        let shapes = vectorize(lip)
        transformShapes(shapes, width, height)
        background(255)
        let lowerLip =[shapes[0], shapes[1]]
        let upperLip =[shapes[2], shapes[3]]

        drawShape(lowerLip)
        drawShape(upperLip)
    }
}