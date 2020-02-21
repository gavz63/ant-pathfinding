class Food extends Entity {
    constructor(game, x, y) {
        super(game, x, y);
        game.food = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./img/cheese.png");
        this.scale = 100;
        this.radius = 50;
    }
}