class Food extends Entity {
    constructor(game, x, y) {
        super(game, x, y);
        game.food = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./img/cheese.png");
        this.scale = 100;
        this.radius = 50;
    }

    update() {
        super.update();

        if (this.game.click && pointToCircle(this.game.mousePos, this, this.radius)) {
            this.game.click = false;
            this.game.entities[LAYERS.PATH].forEach(function(elem) { elem.destroy() });
            this.game.entities[LAYERS.BREADCRUMBS].forEach(function(elem) { elem.destroy() });
            this.game.entities[LAYERS.ANTS].forEach(function(elem) { elem.destroy() });

            this.moving = true;
        }

        if (this.moving) {
            if (this.game.clicking) {
                this.game.entities[LAYERS.PATH].forEach(function(elem) { elem.destroy() });

                this.x = this.game.mouseX;
                this.y = this.game.mouseY;
            } else {
                this.moving = false;
                this.game.base.start();
            }
        }
    }
}