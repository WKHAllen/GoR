class ScreenText {
    constructor() {
        this.showing = false;
    }

    show(string, color, x, y, align, ms) {
        this.string = string;
        this.color = color !== undefined ? color : [0];
        this.x = x !== undefined ? x : width / 2;
        this.y = y !== undefined ? y : height / 2;
        this.align = align !== undefined ? align : CENTER;
        this.showing = true;
        if (this.timeout !== undefined) clearTimeout(this.timeout);
        this.timeout = ms !== -1 ? setTimeout(() => { this.hide(); }, ms !== undefined ? ms : 1000) : undefined;
    }

    hide() {
        this.showing = false;
    }

    draw() {
        if (this.showing) {
            fill(...this.color);
            textAlign(this.align);
            text(this.string, this.x, this.y);
        }
    }
}
