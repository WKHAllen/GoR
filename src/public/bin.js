class Bin {
    constructor(binType, x, y, width, height) {
        this.type = binType;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.items = [];
        this.img;
        function preload() {
            this.img = loadImage('images/compost.png');  
        }
    }
       
    draw() {
        image(this.img, 0, 0);
    }
}
