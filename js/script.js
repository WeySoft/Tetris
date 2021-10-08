const canvas = document.getElementById("gameCanvas");
const scoreSpan = document.getElementById("score");
const ctx = canvas.getContext("2d");

// Game
const sizeBlocks = canvas.width / 20;
let speed = 1000;
let score = 0;
let blocks = [];
let shapes = [];
let blocksNotActive = [];
let shapeCounter = 0;
let activeShape;

function setConrols() {
    document.body.addEventListener('keydown', function (event) {
        const key = event.key;
        switch (key) {
            case "ArrowDown":
                speed = 125;
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
    blocks.forEach((block) => {
        ctx.fillStyle = block.color;
        ctx.fillRect(block.x, block.y, sizeBlocks, sizeBlocks)
    })
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function createRandomShape() {
    let rndInt = getRandomArbitrary(1, 6);
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
            break;
        default:
            createRandomShape();
            break;
    }
}

function createBlock(x, y, color) {
    let block = {
        x,
        y,
        color,
        isActive: true
    }
    blocks.push(block)
    return block
}

function createSqaure() {
    shapeCounter++;
    let blocks = [];
    // Upper Left Block
    blocks.push(createBlock((canvas.width / 2), 0, "#00ff00"));
    // Upper Right Block
    blocks.push(createBlock((canvas.width / 2) + sizeBlocks, 0, "#00ff00"));
    // Under Left Block
    blocks.push(createBlock((canvas.width / 2), sizeBlocks, "#00ff00"));
    // Under Right Block
    blocks.push(createBlock((canvas.width / 2) + sizeBlocks, sizeBlocks, "#00ff00"));

    let square = {
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
    let blocks = [];
    // Upper Left Block
    blocks.push(createBlock((canvas.width / 2) + sizeBlocks, 0, "#ff7700"));
    // Upper Right Block
    blocks.push(createBlock((canvas.width / 2), 0, "#ff7700"));
    // Under Left Block
    blocks.push(createBlock((canvas.width / 2) - sizeBlocks, 0, "#ff7700"));
    // Under Right Block
    blocks.push(createBlock((canvas.width / 2), sizeBlocks, "#ff7700"));

    let tShape = {
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
    let blocks = [];
    // Upper Left Block
    blocks.push(createBlock((canvas.width / 2) + sizeBlocks, 0, "#00ffff"));
    // Upper Right Block
    blocks.push(createBlock((canvas.width / 2), 0, "#00ffff"));
    // Under Left Block
    blocks.push(createBlock((canvas.width / 2) - sizeBlocks, 0, "#00ffff"));
    // Under Right Block
    blocks.push(createBlock((canvas.width / 2) - sizeBlocks * 2, 0, "#00ffff"));

    let line = {
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
    let blocks = [];
    // Upper Left Block
    blocks.push(createBlock((canvas.width / 2) - sizeBlocks, 0, "#ff0000"));
    // Upper Right Block
    blocks.push(createBlock((canvas.width / 2) - sizeBlocks, sizeBlocks, "#ff0000"));
    // Under Left Block
    blocks.push(createBlock((canvas.width / 2) - sizeBlocks, sizeBlocks * 2, "#ff0000"));
    // Under Right Block
    blocks.push(createBlock((canvas.width / 2), sizeBlocks * 2, "#ff0000"));

    let lShape = {
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
    let blocks = [];
    // Upper Left Block
    blocks.push(createBlock((canvas.width / 2) - sizeBlocks, 0, "#ff00ff"));
    // Upper Right Block
    blocks.push(createBlock((canvas.width / 2) - sizeBlocks, sizeBlocks, "#ff00ff"));
    // Under Left Block
    blocks.push(createBlock((canvas.width / 2), sizeBlocks, "#ff00ff"));
    // Under Right Block
    blocks.push(createBlock((canvas.width / 2), sizeBlocks * 2, "#ff00ff"));

    let zShape = {
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
                block.isActive = false;
                blocksNotActive.push(block);
            });
            shape.isActive = false;
            setScore();
            // createRandomShape();
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
        if (block.x - sizeBlocks < 0) {
            return true;
        }
    }
    return false;
}


function checkShapeHitsRightWall(shape) {
    for (let i = 0; i < shape.blocks.length; i++) {
        const block = shape.blocks[i];
        if (block.x + sizeBlocks >= 500) {
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
    if (shape.blocks[0].y + sizeBlocks + sizeBlocks > canvas.height) {
        return false;
    } else if (shape.blocks[1].y + sizeBlocks + sizeBlocks > canvas.height) {
        return false;
    }
    else if (shape.blocks[2].y + sizeBlocks + sizeBlocks > canvas.height) {
        return false;
    }
    else if (shape.blocks[3].y + sizeBlocks + sizeBlocks > canvas.height) {
        return false;
    }
    else {
        return true;
    }
}

function checkFullLine() {
    let blocksInLine;
    for (let i = 25; i < canvas.height; i += 25) {
        blocksInLine = blocksNotActive.filter(block => block.y === i);
        if (blocksInLine.length === 20) {
            delteBlocksInLine(blocksInLine, i);
        }
    }
}

function delteBlocksInLine(blocksInLine, line) {
    let blockInLine;
    console.log(shapes);
    for (let i = 0; i < blocksInLine.length; i++) {
        blockInLine = blocksInLine[i];
        for (let j = 0; j < blocks.length; j++) {
            const block = blocks[j];
            if (block.x === blockInLine.x && block.y === blockInLine.y) {
                blocks.splice(j, 1);
            }
        }

        for (let j = 0; j < blocksNotActive.length; j++) {
            const notActiveBlock = blocksNotActive[j];
            if (notActiveBlock.x === blockInLine.x && notActiveBlock.y === blockInLine.y) {
                blocksNotActive.splice(j, 1);
            }
        }

        for (let j = 0; j < shapes.length; j++) {
            const shape = shapes[j];
            for (let n = 0; n < shape.blocks; n++) {
                const shapeBlock = shape.blocks;
                if (shapeBlock.x === blockInLine.x && shapeBlock.y === blockInLine.y) {
                    shape.blocks.splice((n), 1);
                }
            }
            if (shape.blocks.length === 0) {
                shapes.splice(shapes.findIndex(shapeFull => shapeFull.id === shape.id), 1);
            }
        }
    }
    moveBlocksAboveLineDown(line);
}

function moveBlocksAboveLineDown(line) {
    for (let i = 0; i < blocksNotActive.length; i++) {
        const block = blocksNotActive[i];
        if (block.y < line) {
            block.y += sizeBlocks;
        }
    }
}

function checkGameOver() {
    for (let i = 0; i < blocksNotActive.length; i++) {
        const blockNotActive = blocksNotActive[i];
        if (blockNotActive.y === 0) {
            return true;
        }
        for (let j = 0; j < activeShape.blocks.length; j++) {
            const activeBlock = activeShape.blocks[j];
            if (activeBlock.x === blockNotActive.x && activeBlock.y === blockNotActive.y) {
                return true;
            }
        }
    }
    return false;
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

function drawRaster() {
    for (let i = 0; i < canvas.width; i += sizeBlocks) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += sizeBlocks) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
}

function setScore() {
    score += getRandomArbitrary(25, 43);;
    scoreSpan.innerHTML = score;
}

function runGame() {
    activeShape = shapes[shapes.findIndex(shape => shape.isActive === true)];
    if (activeShape === null || activeShape === undefined) {
        createLine();
        activeShape = shapes[shapes.findIndex(shape => shape.isActive === true)];
    }
    if (!checkGameOver()) {
        moveDown(activeShape);
        checkFullLine();
        clearCanvas();
        drawBlocks();
        drawRaster();
        setTimeout(() => {
            requestAnimationFrame(runGame);
        }, speed);
    } else {
        let restart = confirm("GameOver :( Do you want to restart the Game");
        if (restart) {
            restartgame();
        }
    }
}
function redraw() {
    activeShape = shapes[shapes.findIndex(shape => shape.isActive === true)];
    if (activeShape === null || activeShape === undefined) {
        createLine();
        activeShape = shapes[shapes.findIndex(shape => shape.isActive === true)];
    }
    clearCanvas();
    drawBlocks();
    drawRaster();
}

setConrols();
requestAnimationFrame(runGame);