class Ant extends Entity {
    constructor(game, x, y) {
        super(game, x, y);
        this.spritesheet = ASSET_MANAGER.getAsset("./img/Ant.png");
        this.scale = 40;
        this.radius = 10;
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
        this.vec = normalizeV(dirV(this, this.game.food));

        this.breadcrumbArray = new ArrayEntity(this);
        this.game.addEntity(this.breadcrumbArray, LAYERS.BREADCRUMBS);


        this.pathArray = new ArrayEntity(this);
        this.game.addEntity(this.pathArray, LAYERS.PATH);
    }

    update() {
        if (this.hasFood) {
            if (pointToCircle(this, this.game.base, this.senseRadius + this.game.base.radius)) {
                this.breadcrumbArray.destroy();
                this.destroy();
                this.game.base.spawn();
            } else {
                let that = this;
                let vecsToAvg = [vector(this.vec.x * 5, this.vec.y * 5)];
                this.breadcrumbArray.forEach(function(elem) {
                    if (pointToCircle(that, elem, that.senseRadius + elem.radius)) {
                        vecsToAvg.push(normalizeV(dirV(that, elem)));
                    }
                });
                this.vec = normalizeV(avgV(vecsToAvg));
            }
        } else {
            // wiggle until we find the food
            if (pointToCircle(this, this.game.food, this.senseRadius + this.game.food.radius)) {
                if (circleToCircle(this, this.game.food)) {
                    this.hasFood = true;
                    this.vec = vector(this.vec.x * -1, this.vec.y * -1);
                } else {
                    this.wiggleTimer.destroy();
                    this.vec = normalizeV(dirV(this, this.game.food));
                }
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
        this.pathArray.push(new Path(this.game, this.x, this.y, this));
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
}