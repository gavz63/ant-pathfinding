class Ant extends Entity {
    constructor(game, x, y) {
        super(game, x, y);
        this.spritesheet = ASSET_MANAGER.getAsset("./img/Ant.png");
        this.scale = 40;
        this.radius = 15;
        this.speed = 5;
        this.senseRadius = this.radius * 4;
        this.hasFood = false;
        let that = this;
        this.dropTimer = new TimerCallback(this.game, 0.1, true, function() {
            if (that.hasFood) {
                that.dropPath();
            } else {
                that.dropBreadcrumb();
            }
        });

        this.shouldWiggle = true;
        this.wiggle();
        this.wiggleTimer = new TimerCallback(this.game, 0.4, true, function() {
            that.wiggle();
        });

        this.breadcrumbArray = new ArrayEntity(this);
        this.game.addEntity(this.breadcrumbArray, LAYERS.BREADCRUMBS);
    }

    update() {
        if (this.hasFood) {
            if (circleToCircle(this, this.game.base)) {
                this.breadcrumbArray.destroy();
                this.destroy();
                this.game.base.spawn();
            } else {
                let vecsToAvg = [this.vec];

                for (let i = 0; i < this.breadcrumbArray.array.length; i++) {
                    if (pointToCircle(this, this.breadcrumbArray.array[i], this.breadcrumbArray.array[i].radius)) {
                        this.breadcrumbArray.array.splice(i);
                    } else if (pointToCircle(this, this.breadcrumbArray.array[i],
                        this.senseRadius + this.breadcrumbArray.array[i].radius)) {

                        vecsToAvg.push(normalizeV(dirV(this, this.breadcrumbArray.array[i])));
                    }
                }
                this.vec = normalizeV(avgV(vecsToAvg));
            }
        } else {
            // wiggle until we find the food or a path to food
            if (pointToCircle(this, this.game.food, this.senseRadius + this.game.food.radius)) {
                if (circleToCircle(this, this.game.food)) {
                    this.hasFood = true;
                    this.vec = scaleV(this.vec, -1);
                } else {
                    this.wiggleTimer.destroy();
                    this.vec = normalizeV(dirV(this, this.game.food));
                }
            } else {
                let vecsToAvg = [this.vec];

                for (let i = 0; i < this.game.entities[LAYERS.PATH].length; i++) {
                    if (pointToCircle(this, this.game.entities[LAYERS.PATH][i],
                        this.senseRadius + this.game.entities[LAYERS.PATH][i].radius)) {

                        let breadcrumbTouching = false;
                        for (let j = 0; j < this.breadcrumbArray.array.length; j++) {
                            if (circleToCircle(this.game.entities[LAYERS.PATH][i], this.breadcrumbArray.array[j])) {
                                breadcrumbTouching = true;
                            }
                        }

                        if (!breadcrumbTouching) {
                            vecsToAvg.push(normalizeV(dirV(this, this.game.entities[LAYERS.PATH][i])));
                        }
                    }
                }
                this.vec = normalizeV(avgV(vecsToAvg));
            }
        }

        this.x = this.x + this.speed * this.vec.x;
        this.y = this.y + this.speed * this.vec.y;

        super.update();
    }

    draw() {
        super.draw();
        if (this.game.showOutlines) {
            this.game.ctx.beginPath();
            this.game.ctx.strokeStyle = "blue";
            this.game.ctx.arc(this.x, this.y, this.senseRadius, 0, Math.PI * 2, false);
            this.game.ctx.stroke();
            this.game.ctx.closePath();
        }
    }

    dropBreadcrumb() {
        this.breadcrumbArray.push(new Breadcrumb(this.game, this.x, this.y, this));
    }

    dropPath() {
        this.game.addEntity(new Path(this.game, this.x, this.y, this), LAYERS.PATH);
    }

    wiggle() {
        if (this.shouldWiggle) {
            this.vec = normalizeV({x: Math.random() * this.posOrNeg(), y: Math.random() * this.posOrNeg()});
        } else {
            this.vec = vector(1, 0);
        }
        this.shouldWiggle = !this.shouldWiggle;
    }

    posOrNeg() {
        let posOrNeg = Math.random();
        if (posOrNeg > 0.5) {
            return 1;
        }
        return -1;
    }

    destroy() {
        super.destroy();
        this.wiggleTimer.destroy();

        this.dropTimer.destroy();
    }
}