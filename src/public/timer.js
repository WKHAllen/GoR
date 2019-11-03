class Timer {
    constructor() {
        this.showing = false;
    }

    start(seconds, prefix, color, x, y, align, callback) {
        this.seconds = seconds;
        this.prefix = prefix;
        this.color = color !== undefined ? color : [0];
        this.x = x !== undefined ? x : width / 2;
        this.y = y !== undefined ? y : height / 2;
        this.align = align !== undefined ? align : CENTER;
        this.callback = callback;
        this.showing = true;
        this.stop();
        this.interval = setInterval(() => {
            this.seconds -= 1;
            if (this.seconds === 0) {
                this.stop();
                if (this.callback !== undefined) this.callback();
            }
        }, 1000);
    }

    stop() {
        if (this.interval !== undefined) clearInterval(this.interval);
    }

    draw() {
        if (this.showing) {
            fill(...this.color);
            textAlign(this.align);
            text(this.prefix + this.seconds, this.x, this.y);
        }
    }
}
