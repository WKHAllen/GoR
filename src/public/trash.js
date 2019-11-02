const movementConstant = 20;

const trashNames = {
    'plastic/metal': [

    ],
    'cardboard': [

    ],
    'paper': [

    ],
    'landfill': [

    ],
    'compost': [

    ]
};

function randomTrashType() {
    var trashTypes = Object.keys(trashNames);
    return trashTypes[Math.floor(Math.random() * trashTypes.length)];
}

function randomTrashName(trashType) {
    var trashTypeNames = trashNames[trashType];
    return trashTypeNames[Math.floor(Math.random() * trashTypeNames.length)];
}

class Trash {
    constructor() {
        this.type = randomTrashType();
        this.name = randomTrashName(this.type);
        this.x = width / 2;
        this.y = height - 10;
        this.scale = 1;

    }

    moveToward(bin) {
        if (this.x === bin.x && this.y === bin.y) return false;
        var angle = Math.atan((this.y - bin.y) / (bin.x - this.x));
        if (angle < 0) angle += Math.PI;
        var newX = this.x + movementConstant * Math.cos(angle);
        var newY = this.y - movementConstant * Math.sin(angle);
        var distFromPrev = Math.sqrt((newX - this.x) ** 2 + (newY - this.y) ** 2);
        var distFromBin = Math.sqrt((newX - bin.x) ** 2 + (newY - bin.y) ** 2);
        if (distFromBin >= distFromPrev) {
            this.x = newX;
            this.y = newY;
            return true;
        } else {
            this.x = bin.x;
            this.y = bin.y;
            return false;
        }
    }

    draw() {
        
    }

    inCorrectBin(bin) {
        return this.type === bin.type;
    }

    putInBin(bin) {
        bin.items.push(this);
    }
}
