class Bin {
    constructor(binType, x, y, width, height) {
        this.type = binType;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.items = [];
    }

    draw() {
        rect(this.x, this.y, this.width, this.height);
    }
}
