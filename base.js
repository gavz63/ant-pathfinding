class Base extends Entity {
    constructor(game, x, y, numOfAnts) {
        super(game, x, y);
        game.base = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./img/hill.png");
        this.scale = 100;
        this.radius = 50;
        let that = this;
        for (let i = 0; i < numOfAnts; i++) {
            this.spawn();
        }
    }

    spawn() {
        this.game.addEntity(new Ant(this.game, this.x + this.scale/2, this.y - 20), LAYERS.ANTS);
        console.log("ant");
    }
}