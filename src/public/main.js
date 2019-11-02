var canvas;
var trash = [];
var bins = [];

var currentPage = 1;

var animating = null;
var mouseDownPos = null;
var mouseUpPos = null;

var trashArea;
var binArea;

var debug = false;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('page-2');
    trashArea = [windowWidth / 2 - 25, windowHeight - 50, 50, 50];
    binArea = [0, 0, windowWidth, 100];
    initGame();
    // setPage(2); // TODO: remove this later
}

function draw() {
    background(220);
    if (debug) {
        fill(0, 255, 0);
        rect(...trashArea);
        fill(0, 0, 255);
        rect(...binArea);
    }
    fill(255);
    // TODO: game logic
    if (trash.length > 0) trash[trash.length - 1].draw();
    for (var bin of bins)
        bin.draw();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
    if (!animating)
        mouseDownPos = [mouseX, mouseY];
    else
        mouseDownPos = null;
}

function mouseReleased() {
    if (!animating && mouseDownPos !== null) {
        mouseUpPos = [mouseX, mouseY];
        beginAnimation(mouseDownPos, mouseUpPos);
    } else {
        mouseUpPos = null;
    }
}

function setPage(pageNumber) {
    document.getElementById(`page-${currentPage}`).classList.add('hidden');
    document.getElementById(`page-${pageNumber}`).classList.remove('hidden');
    currentPage = pageNumber;
    if (pageNumber === 2)
        initGame();
}

function initGame() {
    trash = [];
    trash.push(new Trash()); // TODO: push more trash (how much?)
    bins = [];
    bins.push(new Bin(trashNames[0], width - 50, 10, 40, 40)); // TODO: push 5 bins total
}

function beginAnimation(downPos, upPos) {
    if (pointInArea(downPos, trashArea) && pointInArea(upPos, binArea))
        animating = Math.floor(upPos[0] / (windowWidth / bins.length));
}

function pointInArea(point, area) {
    return area[0] <= point[0] && point[0] < area[0] + area[2] && area[1] <= point[1] && point[1] < area[1] + area[3];
}
