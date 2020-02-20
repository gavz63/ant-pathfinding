const DIRECTION_LEFT = "LEFT";
const DIRECTION_RIGHT = "RIGHT";
const DIRECTION_UP = "UP";
const DIRECTION_DOWN = "DOWN";

const LAYERS = {
    BG: 0,
    GOALS: 1,
    ANTS: 2,
    BREADCRUMBS: 3,
    PATH: 4,
    HUD: 5
};

/**
 * The GameEngine class is the heart our game. It maintains the render-update
 * loop and provides all entities with the resources they need to exist and
 * interact.
 */
class GameEngine {

    /**
     * @param {Camera} camera The camera that's attached to the main character.
     * @param {Level} level The level being played by the main character.
     * @param {[]} spawners The list of spawners that will create enemies.
     */
    constructor(camera) {
        this._entities = [];
        this._entities[LAYERS.BG] = [];
        this._entities[LAYERS.GOALS] = [];
        this._entities[LAYERS.ANTS] = [];
        this._entities[LAYERS.BREADCRUMBS] = [];
        this._entities[LAYERS.PATH] = [];
        this._entities[LAYERS.HUD] = [];
        this._ctx = null;

        this.timers = [];
        this.click = false;
        this.rightClick = false;
        this.score = 0;
        this.chars = [];
        this.keyStack = [];
        this.lastChar = null;

        this.currentLevel = 0;
    }

    /**
     * Initializes the game.
     * @param {*} ctx The HTML canvas' 2D context.
     */
    init(ctx) {
        this._ctx = ctx;
        this._surfaceWidth = this._ctx.canvas.width;
        this._surfaceHeight = this._ctx.canvas.height;
        this.startInput();
        this._clock = new Clock();
    }

    /**
     * Starts the render-update loop.
     */
    start() {
        let that = this;
        (function gameLoop() {
            that.loop();
            requestAnimFrame(gameLoop, that._ctx.canvas);
        })();
    }

    /**
     * Initializes all event listeners for user input.
     */
    startInput = Input;

    /**
     * Adds the given entity to the list of entities in the requested layer.
     * @param {*} entity The entity to be added.
     * @param {number | string} layer The entity destination layer.
     *      Pass 0 or LAYERS.FLOOR for layer 0 (floor & wall tiles);
     *      Pass 1 or "enemy" for layer 1 (enemies);
     *      Pass 2 or "pps" for layer 2 (projectiles and pickups);
     *      Pass 3 or "main" for layer 3 (playable characters);
     *      Pass 4 or "hud" for layer 4 (HUD);
     */
    addEntity(entity, layer) {

        entity.layer = layer;
        if (layer < LAYERS.BG || layer > LAYERS.HUD) {
            throw "Invalid layer int parameter.";
        }

        entity.id = this._entities[layer].length;
        this._entities[layer].push(entity);
    }

    removeEntity(entity) {
        this.entities[entity.layer][entity.id] = this.entities[entity.layer][this.entities[entity.layer].length - 1];
        this.entities[entity.layer][entity.id].id = entity.id;
        this.entities[entity.layer][this.entities[entity.layer].length - 1] = entity;
        this.entities[entity.layer].pop();
    }

    addTimer(timer) {
        timer.id = this.timers.length;
        this.timers.push(timer);
    }

    removeTimer(timer) {
        this.timers[timer.id] = this.timers[this.timers.length - 1];
        this.timers[timer.id].id = timer.id;
        this.timers[this.timers.length - 1] = timer;
        this.timers.pop();
    }

    /**
     * Calls draw() on every entity in memory.
     */
    draw() {
        //this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
        //this._ctx.save();
        for (let i = 0; i < this._entities.length; i++) {
            for (let j = 0; j < this._entities[i].length; j++) {
                this._entities[i][j].draw(this._ctx);
            }
        }

        //this._ctx.restore();
    }

    /**
     * Calls update() on every entity while disposing of entities that aren't
     * needed anymore.
     */
    update() {
        for (var i = 0; i < this._entities.length; i++) {
            let entityCount = this._entities[i].length;
            for (var j = 0; j < entityCount; j++) {
                if (this.entities[i][j].removeFromWorld) {
                    this.removeEntity(this.entities[i][j]);
                    entityCount = this.entities[i].length;
                    j--;
                    continue;
                }

                this.entities[i][j].update();
            }
        }

        var timersCount = this.timers.length;

        for (var i = 0; i < timersCount; i++) {
            let tim = this.timers[i];
            if (tim.removeFromWorld) {
                this.removeTimer(tim);
                timersCount = this.timers.length;
                i--;
                continue;
            }
            this.timers[i].update();
        }
        // Clear input
        this._clicks = [];
    }


    /**
     * Loops while calling update() and draw().
     */
    loop() {
        this._clockTick = this._clock.tick();
        this.update();
        this.draw();
    }

    get entities() {
        return this._entities;
    }

    get ctx() {
        return this._ctx;
    }
}

// Used in start() to cap framerate.
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();