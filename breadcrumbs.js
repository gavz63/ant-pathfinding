class Breadcrumb extends Entity {
    constructor(game, x, y) {
        super(game, x, y);
        this.spritesheet = ASSET_MANAGER.getAsset("./img/breadcrumb.png");
        this.scale = 15;
        this.radius = 15;
    }
}

class Path extends Entity {
    constructor(game, x, y) {
        super(game, x, y);
        this.spritesheet = ASSET_MANAGER.getAsset("./img/path.png");
        this.scale = 15;
        this.radius = 15;
    }
}

class ArrayEntity {
    constructor() {
        this.array = [];
    }

    //Update and draw my children
    update() {
        this.array.forEach(function(elem) {
            elem.update();
        })
    }

    draw() {
        this.array.forEach(function(elem) {
            elem.draw();
        })
    }

    push(elem) {
        this.array.push(elem);
    }

    forEach(fn) {
        this.array.forEach(fn);
    }

    destroy() {
        this.removeFromWorld = true;
    }
}