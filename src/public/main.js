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
var scoreText = new ScreenText();
var timer = new Timer();

var debug = false;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('page-2');
    trashArea = [windowWidth / 2 - 75, windowHeight - 150, 150, 150];
    binArea = [0, 0, windowWidth, 315];
    textSize(30);
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
                timer.start(5, 'Time remaining: ', [0], 8, 30, LEFT, tooSlow);
            }
        }
        if (trash.length > 0) {
            trash[trash.length - 1].draw();
        } else {
            trash.push(null);
            updatePageThree();
            setPage(3);
        }
        for (var bin of bins)
            bin.draw();
        screenText.draw();
        scoreText.draw();
        timer.draw();
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
        y = 170;
        bins.push(new Bin(trashTypes[i], x, y));
    }
    score = 0;
    scoreText.show('Score: 0', [0], width - 8, 30, RIGHT, -1);
    timer.start(5, 'Time remaining: ', [0], 8, 30, LEFT, tooSlow);
}

function beginAnimation(downPos, upPos) {
    if (pointInArea(downPos, trashArea) && pointInArea(upPos, binArea)) {
        animating = Math.floor(upPos[0] / (windowWidth / bins.length));
        if (trash[trash.length - 1].inCorrectBin(bins[animating])) {
            screenText.show('Correct', [0, 191, 63]);
            scoreText.show(`Score: ${++score}`, [0], width - 8, 30, RIGHT, -1);
        } else {
            screenText.show('Incorrect', [191, 0, 0]);
        }
        timer.stop();
    }
}

function pointInArea(point, area) {
    return area[0] <= point[0] && point[0] < area[0] + area[2] && area[1] <= point[1] && point[1] < area[1] + area[3];
}

function tooSlow() {
    timer.stop();
    screenText.show('Too slow', [191, 0, 0]);
    trash.pop();
    if (trash.length > 0) {
        timer.start(5, 'Time remaining: ', [0], 8, 30, LEFT, tooSlow);
        trash[trash.length - 1].draw();
    } else {
        trash.push(null);
        setPage(3);
    }
}

function updatePageThree() {
    document.getElementById('game-score').innerText = score;
}
