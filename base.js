class Base extends Entity {
    constructor(game, x, y) {
        super(game, x, y);
        game.base = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./img/hill.png");
        this.scale = 100;
        this.radius = 50;
        this.moving = false;
        this.start();
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
                this.x = this.game.mouseX;
                this.y = this.game.mouseY;
            } else {
                this.moving = false;
                this.game.entities[LAYERS.PATH].forEach(function(elem) { elem.destroy() });

                this.start();
            }
        }
    }

    start() {
        let numOfAnts = document.getElementById("numOfAnts").value;
        if (isNaN(numOfAnts) || numOfAnts < 0) {
            numOfAnts = 1;
        }
        for (let i = 0; i < numOfAnts; i++) {
            this.spawn();
        }
    }

    spawn() {
        this.game.addEntity(new Ant(this.game, this.x + this.scale / 2, this.y - 20), LAYERS.ANTS);
        console.log("ant");
    }
}