class Bin {
    constructor(binType, x, y) {
        this.type = binType;
        this.x = x;
        this.y = y;
        this.width = 205;
        this.height = 295;
        this.items = [];
        this.img = loadImage(`images/${binType}.png`);
    }
    
    draw() {
        image(this.img, this.x - Math.floor(this.width / 2), this.y - Math.floor(this.height / 2));
    }
}
