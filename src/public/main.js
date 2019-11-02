var canvas;
var trash;
var bin;

var currentPage = 1;

// button =  createButton('click me');
// button.addClass('btn btn-primary');
// button.position(19, 19);
// button.mousePressed(someFunction);

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('page-2');
    trash = new Trash();
    bin = new Bin(trashNames[0], width - 50, 10, 40, 40);
    //setPage(3);
}

function draw() {
    background(220);
    bin.draw();
    if (trash.moveToward(bin)) {
        trash.draw();
    } else {
        // now trash is in the bin
        console.log('reached the bin!');
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setPage(pageNumber) {
    document.getElementById(`page-${currentPage}`).classList.add('hidden');
    document.getElementById(`page-${pageNumber}`).classList.remove('hidden');
    currentPage = pageNumber;
}
