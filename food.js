class Food extends Entity {
    constructor(game, x, y) {
        super(game, x, y);
        this.spritesheet = ASSET_MANAGER.getAsset("./img/cheese.png");
        this.scale = 100;
    }
}