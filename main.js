// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/bg.jpeg");
ASSET_MANAGER.queueDownload("./img/hill.png");
ASSET_MANAGER.queueDownload("./img/cheese.png");
ASSET_MANAGER.queueDownload("./img/Ant.png");

ASSET_MANAGER.downloadAll(function () {
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine(ctx);

    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine), LAYERS.BG);
    gameEngine.addEntity(new Base(gameEngine), LAYERS.GOALS);
    gameEngine.addEntity(new Food(gameEngine, 500, 200), LAYERS.GOALS);

});
