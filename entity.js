const STANDARD_ENTITY_FRAME_WIDTH = 32;
const STANDARD_ENTITY_RADIUS = 20;
let ID = 0;

class Entity {
    constructor(game, x, y) {
        this.game = game;
        this.animation = null;
        this.x = x;
        this.y = y;
        this.id = 0;
        this.removeFromWorld = false;
        this.speed = 100;
        this.spritesheet = null;
        this.circle = false;
        this.radius = 10;
        this.scale = 0;
        this.oldPos = {x: 0, y: 0};
    }

    setAnimation(spritesheet) {
        this.animation = new Animation(spritesheet, 32, 32, {x: 0, y: 0}, {x: 0, y: 0}, 0, true, 10);
    }

    destroy() {
        this.removeFromWorld = true;
    }

    update() {
    }

    draw() {
        this.game._ctx.drawImage(this.spritesheet,
            this.x, this.y, this.scale, this.scale);
    }
}