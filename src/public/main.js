var canvas;
var trash = [null];
var bins = [];

var currentPage = 1;

var animating = null;
var mouseDownPos = null;
var mouseUpPos = null;

var trashArea;
var binArea;

var score;

var screenText = new ScreenText();

var debug = false;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('page-2');
    trashArea = [windowWidth / 2 - 25, windowHeight - 50, 50, 50];
    binArea = [0, 0, windowWidth, 315];
    textSize(30);
    initGame();
}

function draw() {
    if (trash.length > 0 && trash[0] !== null) {
        background(220);
        if (debug) {
            fill(0, 255, 0);
            rect(...trashArea);
            fill(0, 0, 255);
            rect(...binArea);
        }
        fill(255);
        if (animating !== null) {
            if (!trash[trash.length - 1].moveToward(bins[animating])) {
                trash[trash.length - 1].putInBin(bins[animating]);
                trash.pop();
                animating = null;
            }
        }
        if (trash.length > 0) {
            trash[trash.length - 1].draw();
        } else {
            trash.push(null);
            setPage(3);
        }
        for (var bin of bins)
            bin.draw();
        screenText.draw();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
    if (animating === null)
        mouseDownPos = [mouseX, mouseY];
    else
        mouseDownPos = null;
}

function mouseReleased() {
    if (animating === null && mouseDownPos !== null) {
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
    var trashTypes = Object.keys(trashNames);
    var x, y;
    trash = [];
    for (var i = 0; i < 10; i++)
        trash.push(new Trash());
    bins = [];
    for (var i = 0; i < trashTypes.length; i++) {
        x = Math.floor(width / trashTypes.length * (i + 0.5));
        y = 10;
        bins.push(new Bin(trashTypes[i], x, y));
    }
    score = 0;
}

function beginAnimation(downPos, upPos) {
    if (pointInArea(downPos, trashArea) && pointInArea(upPos, binArea)) {
        animating = Math.floor(upPos[0] / (windowWidth / bins.length));
        if (trash[trash.length - 1].inCorrectBin(bins[animating])) {
            score++;
            screenText.show('Correct', [0, 191, 63]);
        } else {
            score--;
            screenText.show('Incorrect', [191, 0, 0]);
        }
    }
}

function pointInArea(point, area) {
    return area[0] <= point[0] && point[0] < area[0] + area[2] && area[1] <= point[1] && point[1] < area[1] + area[3];
}
