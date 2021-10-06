const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game 
var speed = 0.4;
var points = 0;
var shapes = [];
var blocksNotActive = [];
var shapeCounter = 0;


function setConrols() {
    document.body.addEventListener('keydown', function (event) {
        const key = event.key;
        switch (key) {
            case "ArrowDown":
                speed = 2;
                break;
            case "ArrowUp":
                break;
        }
    });
    document.body.addEventListener('keyup', function (event) {
        const key = event.key;
        switch (key) {
            case "ArrowDown":
                speed = 0.4;
                break;
        }
    });
}

function drawBlocks() {
    shapes.forEach(shape => shape.blocks.forEach((block) => {
        ctx.fillStyle = block.color;
        ctx.fillRect(block.x, block.y, 50, 50)
    })
    )
}

function createBlock(x, y, color) {
    var block = {
        x,
        y,
        color,
        isActive: true
    }
    return block
}

function createSqaure() {
    shapeCounter++;
    var blocks = [];
    // Upper Left Block
    blocks.push(createBlock((canvas.width / 2), 0, "#00ff00"));
    // Upper Right Block
    blocks.push(createBlock((canvas.width / 2) + 50, 0, "#00ff00"));
    // Under Left Block
    blocks.push(createBlock((canvas.width / 2), 50, "#00ff00"));
    // Under Right Block
    blocks.push(createBlock((canvas.width / 2) + 50, 50, "#00ff00"));

    var square = {
        id: shapeCounter,
        shapeName: "square",
        x: (canvas.width / 2),
        y: 0,
        blocks,
        isActive: true,
        rotation: 0
    }
    shapes.push(square);
}

function createTShape() {
    shapeCounter++;
    var blocks = [];
    // Upper Left Block
    blocks.push(createBlock((canvas.width / 2) + 50, 0, "#ff7700"));
    // Upper Right Block
    blocks.push(createBlock((canvas.width / 2), 0, "#ff7700"));
    // Under Left Block
    blocks.push(createBlock((canvas.width / 2) - 50, 0, "#ff7700"));
    // Under Right Block
    blocks.push(createBlock((canvas.width / 2), 50, "#ff7700"));

    var tShape = {
        id: shapeCounter,
        shapeName: "tShape",
        x: (canvas.width / 2),
        y: 0,
        blocks,
        isActive: true,
        rotation: 0
    }
    shapes.push(tShape);
}

function createLine() {
    shapeCounter++;
    var blocks = [];
    // Upper Left Block
    blocks.push(createBlock((canvas.width / 2) + 50, 0, "#00ffff"));
    // Upper Right Block
    blocks.push(createBlock((canvas.width / 2), 0, "#00ffff"));
    // Under Left Block
    blocks.push(createBlock((canvas.width / 2) - 50, 0, "#00ffff"));
    // Under Right Block
    blocks.push(createBlock((canvas.width / 2) - 100, 0, "#00ffff"));

    var line = {
        id: shapeCounter,
        shapeName: "line",
        x: (canvas.width / 2),
        y: 0,
        blocks,
        isActive: true,
        rotation: 0
    }
    shapes.push(line);
}

function createLShape() {
    shapeCounter++;
    var blocks = [];
    // Upper Left Block
    blocks.push(createBlock((canvas.width / 2), 0, "#ff0000"));
    // Upper Right Block
    blocks.push(createBlock((canvas.width / 2), 50, "#ff0000"));
    // Under Left Block
    blocks.push(createBlock((canvas.width / 2), 100, "#ff0000"));
    // Under Right Block
    blocks.push(createBlock((canvas.width / 2) + 50, 100, "#ff0000"));

    var lShape = {
        id: shapeCounter,
        shapeName: "lShape",
        x: (canvas.width / 2),
        y: 0,
        blocks,
        isActive: true,
        rotation: 0
    }
    shapes.push(lShape);
}

function createZShape() {
    shapeCounter++;
    var blocks = [];
    // Upper Left Block
    blocks.push(createBlock((canvas.width / 2), 0, "#ff00ff"));
    // Upper Right Block
    blocks.push(createBlock((canvas.width / 2), 50, "#ff00ff"));
    // Under Left Block
    blocks.push(createBlock((canvas.width / 2) + 50, 50, "#ff00ff"));
    // Under Right Block
    blocks.push(createBlock((canvas.width / 2) + 50, 100, "#ff00ff"));

    var zShape = {
        id: shapeCounter,
        shapeName: "zShape",
        x: (canvas.width / 2),
        y: 0,
        blocks,
        isActive: true,
        rotation: 0
    }
    shapes.push(zShape);
}

function moveDown(shape) {
    if (shape.isActive) {
        if (checkIfShapeIsNotTouchingGround(shape) && checkIfShapeIsNotTouchingAnotherShape(shape)) {
            shape.blocks.forEach(block => {
                block.y = block.y + speed;
            });
            shape.y = shape.y + speed;
        } else {
            shape.blocks.forEach(block => {
                blocksNotActive.push(block);
            });
            shape.isActive = false;
            console.log(shape);
        }
    }
}

function checkIfShapeIsNotTouchingAnotherShape(shape) {
    shape.blocks.forEach(block => {
        blocksNotActive.forEach(blockNotActive => {
            if (block.x == blockNotActive.x && (block.y + 50) > blockNotActive.y) {
                console.log('flase');
                return false;
            }
        })
    });
    return true;
}

function checkIfShapeIsNotTouchingGround(shape) {
    if (shape.blocks[0].y + 50 + speed > 700) {
        return false;
    } else if (shape.blocks[1].y + 50 + speed > 700) {
        return false;
    }
    else if (shape.blocks[2].y + 50 + speed > 700) {
        return false;
    }
    else if (shape.blocks[3].y + 50 + speed > 700) {
        return false;
    }
    else {
        return true;
    }
}

function rotateShape() {
    var tempShape;
    shapes.forEach(shape => {
        if (shape.isActive) {
            switch (shape.shapeName) {
                case 'tShape':
                    tempShape = rotateTShape(shape);
                    break;
                case 'zShape':
                    break;
                case 'lShape':
                    break;
                case 'line':
                    break;
                default:
                    break;
            }
        }
    })
    shapes.map(obj => {
        if (obj.id == tempShape.id) {
            return tempShape
        } else {
            return obj;
        }
    });
}

function rotateTShape(shape) {
    if (shape.rotation == 0) {
        shape.blocks.forEach((block, index) => {
            if (index == 0) {
                block.x -= 50;
                block.y += 100;
            }
            else if (index == 2) {
                block.y += 50;
            }
        });
        return shape;
    }
    else if (shape.rotation == 90) {

    }

    else if (shape.rotation == 180) {

    }

    else if (shape.rotation == 270) {

    }

    if (shape.rotation == 270) {
        shape.rotation = 0;
    }
    shape.rotation = shape.rotation + 90;
}


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function runGame() {
    var activeShape = shapes.find(shape => shape.isActive === true);
    if (activeShape === null || activeShape === undefined) {
        createLShape();
        activeShape = shapes.find(shape => shape.isActive === true);
    }
    moveDown(activeShape);
    clearCanvas();
    drawBlocks();
    requestAnimationFrame(runGame);
}

createTShape();
drawBlocks();
setConrols();
requestAnimationFrame(runGame)