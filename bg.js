class Background extends Entity {
    constructor(game) {
        super(game, 0, 0);
        this.spritesheet = ASSET_MANAGER.getAsset("./img/bg.jpeg");
        this.scale = 800;
    }
}