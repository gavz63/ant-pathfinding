class Base extends Entity {
    constructor(game, spritesheet) {
        super(game, 0, 700);
        this.spritesheet = spritesheet;
    }

    draw() {
        super.draw();
        this.game.ctx.drawImage(this.spritesheet,
            this.x, this.y, 500, 500);
        console.log("Drawing");
    }
}