const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game
const sizeBlocks = 25;
var speed = 1000;
var points = 0;
var shapes = [];
var blocksNotActive = [];
var shapeCounter = 0;
var activeShape;

function setConrols() {
    document.body.addEventListener('keydown', function (event) {
        const key = event.key;
        switch (key) {
            case "ArrowDown":
                speed = 250;
                break;
            case "ArrowUp":
                rotateShape();
                redraw();
                break;
            case "ArrowLeft":
                moveLeft(activeShape);
                redraw();
                break;
            case "ArrowRight":
                moveRight(activeShape);
                redraw();
                break;
        }
    });
    document.body.addEventListener('keyup', function (event) {
        const key = event.key;
        switch (key) {
            case "ArrowDown":
                speed = 1000;
                break;
        }
    });
}

function drawBlocks() {
    shapes.forEach(shape => shape.blocks.forEach((block) => {
        ctx.fillStyle = block.color;
        ctx.fillRect(block.x, block.y, sizeBlocks, sizeBlocks)
    })
    )
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function createRandomShape() {
    var rndInt = getRandomArbitrary(1, 6);
    switch (rndInt) {
        case 1:
            createSqaure();
            break;
        case 2:
            createTShape();
            break;
        case 3:
            createLine();
            break;
        case 4:
            createLShape();
            break;
        case 5:
            createZShape();
        default:
            createRandomShape();
            break;
    }
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
    blocks.push(createBlock((canvas.width / 2) + sizeBlocks, 0, "#00ff00"));
    // Under Left Block
    blocks.push(createBlock((canvas.width / 2), sizeBlocks, "#00ff00"));
    // Under Right Block
    blocks.push(createBlock((canvas.width / 2) + sizeBlocks, sizeBlocks, "#00ff00"));

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
    blocks.push(createBlock((canvas.width / 2) + sizeBlocks, 0, "#ff7700"));
    // Upper Right Block
    blocks.push(createBlock((canvas.width / 2), 0, "#ff7700"));
    // Under Left Block
    blocks.push(createBlock((canvas.width / 2) - sizeBlocks, 0, "#ff7700"));
    // Under Right Block
    blocks.push(createBlock((canvas.width / 2), sizeBlocks, "#ff7700"));

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
    blocks.push(createBlock((canvas.width / 2) + sizeBlocks, 0, "#00ffff"));
    // Upper Right Block
    blocks.push(createBlock((canvas.width / 2), 0, "#00ffff"));
    // Under Left Block
    blocks.push(createBlock((canvas.width / 2) - sizeBlocks, 0, "#00ffff"));
    // Under Right Block
    blocks.push(createBlock((canvas.width / 2) - sizeBlocks * 2, 0, "#00ffff"));

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
    blocks.push(createBlock((canvas.width / 2), sizeBlocks, "#ff0000"));
    // Under Left Block
    blocks.push(createBlock((canvas.width / 2), sizeBlocks * 2, "#ff0000"));
    // Under Right Block
    blocks.push(createBlock((canvas.width / 2) + sizeBlocks, sizeBlocks * 2, "#ff0000"));

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
    blocks.push(createBlock((canvas.width / 2), sizeBlocks, "#ff00ff"));
    // Under Left Block
    blocks.push(createBlock((canvas.width / 2) + sizeBlocks, sizeBlocks, "#ff00ff"));
    // Under Right Block
    blocks.push(createBlock((canvas.width / 2) + sizeBlocks, sizeBlocks * 2, "#ff00ff"));

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
        if (checkShapeTouchingGround(shape) && checkShapeTouchAnotherShape(shape)) {
            shape.blocks.forEach(block => {
                block.y = block.y + sizeBlocks;
            });
            shape.y = shape.y + sizeBlocks;
        } else {
            shape.blocks.forEach(block => {
                blocksNotActive.push(block);
            });
            shape.isActive = false;
            console.log(shape);
        }
    }
}

function moveLeft(shape) {
    if (shape.isActive) {
        if (!checkShapeHitsLeftWall(shape) && !checkShapeHitsLeftShape(shape)) {
            shape.blocks.forEach(block => {
                block.x = block.x - sizeBlocks;
            });
            shape.x = shape.x - sizeBlocks;
        }
    }
}

function moveRight(shape) {
    if (shape.isActive) {
        if (!checkShapeHitsRightWall(shape) && !checkShapeHitsRightShape(shape)) {
            shape.blocks.forEach(block => {
                block.x = block.x + sizeBlocks;
            });
            shape.x = shape.x + sizeBlocks;
        }
    }
}

function checkShapeHitsLeftWall(shape) {
    for (let i = 0; i < shape.blocks.length; i++) {
        const block = shape.blocks[i];
        if (block.x - sizeBlocks <= 0) {
            console.log('true');
            return true;
        }
    }
    return false;
}


function checkShapeHitsRightWall(shape) {
    for (let i = 0; i < shape.blocks.length; i++) {
        const block = shape.blocks[i];
        if (block.x + sizeBlocks + sizeBlocks >= 500) {
            console.log('true');
            return true;
        }
    }
    return false;
}

function checkShapeHitsLeftShape(shape) {
    for (let i = 0; i < shape.blocks.length; i++) {
        const block = shape.blocks[i];
        for (let j = 0; j < blocksNotActive.length; j++) {
            const blockNotActive = blocksNotActive[j];
            if (block.x - sizeBlocks == blockNotActive.x && (block.y + sizeBlocks) >= blockNotActive.y && (block.y) <= blockNotActive.y + sizeBlocks) {
                return true;
            }
        }
    }
    return false;
}
function checkShapeHitsRightShape(shape) {
    for (let i = 0; i < shape.blocks.length; i++) {
        const block = shape.blocks[i];
        for (let j = 0; j < blocksNotActive.length; j++) {
            const blockNotActive = blocksNotActive[j];
            if (block.x + sizeBlocks == blockNotActive.x && (block.y + sizeBlocks) >= blockNotActive.y && (block.y) <= blockNotActive.y + sizeBlocks) {
                return true;
            }
        }
    }
    return false;
}

function checkShapeTouchAnotherShape(shape) {
    for (let i = 0; i < shape.blocks.length; i++) {
        const block = shape.blocks[i];
        for (let j = 0; j < blocksNotActive.length; j++) {
            const blockNotActive = blocksNotActive[j];
            if (block.x == blockNotActive.x && (block.y + sizeBlocks) >= blockNotActive.y && (block.y + sizeBlocks) <= blockNotActive.y + sizeBlocks) {
                return false;
            }
        }
    }
    return true;
}

function checkShapeTouchingGround(shape) {
    if (shape.blocks[0].y + sizeBlocks + sizeBlocks > 700) {
        return false;
    } else if (shape.blocks[1].y + sizeBlocks + sizeBlocks > 700) {
        return false;
    }
    else if (shape.blocks[2].y + sizeBlocks + sizeBlocks > 700) {
        return false;
    }
    else if (shape.blocks[3].y + sizeBlocks + sizeBlocks > 700) {
        return false;
    }
    else {
        return true;
    }
}

function rotateShape() {
    shapes.forEach(shape => {
        if (shape.isActive) {
            switch (shape.shapeName) {
                case 'tShape':
                    rotateTShape(shape);
                    break;
                case 'zShape':
                    rotateZShape(shape);
                    break;
                case 'lShape':
                    rotateLShape(shape);
                    break;
                case 'line':
                    rotateLine(shape);
                    break;
                default:
                    break;
            }
        }
    })
}

function rotateTShape(shape) {
    console.log(shape);
    if (shape.rotation == 0) {
        shape.blocks[0].y += sizeBlocks * 2;
        shape.blocks[0].x -= sizeBlocks;
        shape.blocks[2].y += sizeBlocks;
    }
    else if (shape.rotation == 90) {

        shape.blocks[0].x += sizeBlocks;
        shape.blocks[0].y -= sizeBlocks;
    }

    else if (shape.rotation == 180) {
        shape.blocks[2].x += sizeBlocks;
        shape.blocks[2].y += sizeBlocks;
    }

    else if (shape.rotation == 270) {
        shape.blocks[1].y += sizeBlocks;
        shape.blocks[2].y -= sizeBlocks;
        shape.blocks[2].x -= sizeBlocks;
        shape.blocks[3].y += sizeBlocks;
    }
    shape.rotation = shape.rotation + 90;
    if (shape.rotation > 270) {
        shape.rotation = 0;
    }
}

function rotateZShape(shape) {
    console.log(shape);
    if (shape.rotation == 0) {
        shape.blocks[0].x += sizeBlocks * 2;
        shape.blocks[0].y += sizeBlocks;
        shape.blocks[1].x += sizeBlocks;
        shape.blocks[2].y += sizeBlocks;
        shape.blocks[3].x -= sizeBlocks;
    }
    else if (shape.rotation == 90) {
        shape.blocks[0].x -= sizeBlocks * 2;
        shape.blocks[0].y -= sizeBlocks;
        shape.blocks[1].x -= sizeBlocks;
        shape.blocks[2].y -= sizeBlocks;
        shape.blocks[3].x += sizeBlocks;
    }

    shape.rotation = shape.rotation + 90;
    if (shape.rotation > 90) {
        shape.rotation = 0;
    }
}

function rotateLShape(shape) {
    console.log(shape);
    if (shape.rotation == 0) {
        shape.blocks[0].y += sizeBlocks;
        shape.blocks[0].x += sizeBlocks * 2;
        shape.blocks[1].x += sizeBlocks;
        shape.blocks[2].y -= sizeBlocks;
        shape.blocks[3].x -= sizeBlocks;
    }
    else if (shape.rotation == 90) {
        shape.blocks[0].y += sizeBlocks;
        shape.blocks[0].x -= sizeBlocks * 2;
        shape.blocks[1].x -= sizeBlocks;
        shape.blocks[2].y -= sizeBlocks;
        shape.blocks[3].y -= sizeBlocks * 2;
        shape.blocks[3].x -= sizeBlocks;

    }

    else if (shape.rotation == 180) {
        shape.blocks[0].y -= sizeBlocks;
        shape.blocks[0].x -= sizeBlocks;
        shape.blocks[2].y += sizeBlocks;
        shape.blocks[2].x += sizeBlocks;
        shape.blocks[3].x += sizeBlocks * 2;
    }

    else if (shape.rotation == 270) {
        shape.blocks[0].y -= sizeBlocks;
        shape.blocks[0].x += sizeBlocks;
        shape.blocks[2].y += sizeBlocks;
        shape.blocks[2].x -= sizeBlocks;
        shape.blocks[3].y += sizeBlocks * 2;
    }
    shape.rotation = shape.rotation + 90;
    if (shape.rotation > 270) {
        shape.rotation = 0;
    }
}


function rotateLine(shape) {
    console.log(shape);
    if (shape.rotation == 0) {
        shape.blocks[0].y -= sizeBlocks * 1;
        shape.blocks[0].x -= sizeBlocks;
        shape.blocks[2].y += sizeBlocks * 1;
        shape.blocks[2].x += sizeBlocks;
        shape.blocks[3].y += sizeBlocks * 2;
        shape.blocks[3].x += sizeBlocks * 2;
    }
    else if (shape.rotation == 90) {
        shape.blocks[0].y += sizeBlocks * 1;
        shape.blocks[0].x += sizeBlocks;
        shape.blocks[2].y -= sizeBlocks * 1;
        shape.blocks[2].x -= sizeBlocks;
        shape.blocks[3].y -= sizeBlocks * 2;
        shape.blocks[3].x -= sizeBlocks * 2;
    }

    shape.rotation = shape.rotation + 90;
    if (shape.rotation > 90) {
        shape.rotation = 0;
    }
}


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function runGame() {
    activeShape = shapes[shapes.findIndex(shape => shape.isActive === true)];
    if (activeShape === null || activeShape === undefined) {
        createRandomShape();
        activeShape = shapes[shapes.findIndex(shape => shape.isActive === true)];
    }
    moveDown(activeShape);
    clearCanvas();
    drawBlocks();
    setTimeout(() => {
        requestAnimationFrame(runGame);
    }, speed);
}

function redraw() {
    activeShape = shapes[shapes.findIndex(shape => shape.isActive === true)];
    if (activeShape === null || activeShape === undefined) {
        createRandomShape();
        activeShape = shapes[shapes.findIndex(shape => shape.isActive === true)];
    }
    clearCanvas();
    drawBlocks();
}

createRandomShape();
drawBlocks();
setConrols();
requestAnimationFrame(runGame)