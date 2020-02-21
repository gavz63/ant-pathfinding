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
        if (this.x > 800) {
            this.x = 0;
        }
        if (this.y > 700) {
            this.y = 0;
        }

        if (this.x < 0) {
            this.x = 800;
        }
        if (this.y < 0) {
            this.y = 700;
        }
    }

    draw() {
        if (this.game.showOutlines && this.radius) {
            this.game.ctx.beginPath();
            this.game.ctx.strokeStyle = "red";
            this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            this.game.ctx.stroke();
            this.game.ctx.closePath();
        }

        this.game._ctx.drawImage(this.spritesheet,
            this.x - this.scale/2, this.y - this.scale/2, this.scale, this.scale);
    }
}