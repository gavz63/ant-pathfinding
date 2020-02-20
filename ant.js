class Ant extends Entity {
    constructor(game, x, y) {
        super(game, x, y, ASSET_MANAGER.getAsset("./img/Ant.png"));
        this.radius = 20;
    }

    draw() {
        super.draw();
        this.game.ctx.drawImage(this.spritesheet,
            this.x, this.y, 40, 40);
    }
}