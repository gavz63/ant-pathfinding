class Background extends Entity {
    constructor(game) {
        super(game, 400, 400);
        this.spritesheet = ASSET_MANAGER.getAsset("./img/bg.jpg");
        this.scale = 800;
    }
}