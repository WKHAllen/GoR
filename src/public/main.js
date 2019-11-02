var trash;
var bin;

function setup() {
    createCanvas(800, 600);
    trash = new Trash();
    bin = new Bin(trashNames[0], width - 50, 10, 40, 40);
}

function draw() {
    background(220);
    if (trash.moveToward(bin)) {
        bin.draw();
        trash.draw();
    } else {
        // now trash is in the bin
        console.log('reached the bin!');
    }
}
