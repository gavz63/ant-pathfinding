// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/bg.jpg");
ASSET_MANAGER.queueDownload("./img/hill.png");
ASSET_MANAGER.queueDownload("./img/cheese.png");
ASSET_MANAGER.queueDownload("./img/Ant.png");
ASSET_MANAGER.queueDownload("./img/breadcrumb.png");
ASSET_MANAGER.queueDownload("./img/path.png");


ASSET_MANAGER.downloadAll(function () {
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine(ctx);

    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine), LAYERS.BG);
    gameEngine.addEntity(new Food(gameEngine, 500, 200), LAYERS.GOALS);
    gameEngine.addEntity(new Base(gameEngine, 50, 650, 10), LAYERS.GOALS);
});
