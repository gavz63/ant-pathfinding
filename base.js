class Base extends Entity {
    constructor(game) {
        super(game, 0, 600);
        this.spritesheet = ASSET_MANAGER.getAsset("./img/hill.png");
        this.scale = 100;
    }
}