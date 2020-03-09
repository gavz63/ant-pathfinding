// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/bg.jpg");
ASSET_MANAGER.queueDownload("./img/hill.png");
ASSET_MANAGER.queueDownload("./img/cheese.png");
ASSET_MANAGER.queueDownload("./img/Ant.png");
ASSET_MANAGER.queueDownload("./img/breadcrumb.png");
ASSET_MANAGER.queueDownload("./img/path.png");
ASSET_MANAGER.queueDownload("./img/start.png");

ASSET_MANAGER.downloadAll(function () {

    var socket = io.connect("http://24.16.255.56:8888");

    socket.on("load", function (data) {
        console.log(data);
        data = data.data;
        gameEngine._clock._time = data.gameTime;

        gameEngine.base.x = data.base.x;
        gameEngine.base.y = data.base.y;

        gameEngine.food.x = data.cheese.x;
        gameEngine.food.y = data.cheese.y;

        gameEngine.clear();

        data.ants.forEach(function (antData) {
            let ant = new Ant(gameEngine, antData.x, antData.y);
            ant.hasFood = antData.hasFood;

            antData.breadcrumbs.forEach(function (crumb) {
                ant.breadcrumbArray.push(new Breadcrumb(gameEngine, crumb.x, crumb.y));
            });

            gameEngine.addEntity(ant, LAYERS.ANTS);
        });

        data.paths.forEach(function (pathData) {
            let path = new Path(gameEngine, pathData.x, pathData.y);
            gameEngine.addEntity(path, LAYERS.PATH);
        });

        text.innerHTML = "State Loaded.";
    });

    var text = document.getElementById("text");
    var saveButton = document.getElementById("save");
    var loadButton = document.getElementById("load");

    saveButton.onclick = function () {
        console.log("save");
        text.innerHTML = "State Saved.";

        let ants = [];
        gameEngine.entities[LAYERS.ANTS].forEach(function (ant) {
            let antData = {
                hasFood: ant.hasFood,
                x: ant.x,
                y: ant.y,
            };
            antData.breadcrumbs = [];
            ant.breadcrumbArray.array.forEach(function (crumb) {
                let crumbData = {
                    x: crumb.x,
                    y: crumb.y
                };
                antData.breadcrumbs.push(crumbData);
            });
            ants.push(antData);
        });

        let paths = [];
        gameEngine.entities[LAYERS.PATH].forEach(function (pathElem) {
            let pathData = {
                x: pathElem.x,
                y: pathElem.y
            };
            paths.push(pathData);
        });

        let cheese = {x: gameEngine.food.x, y: gameEngine.food.y};

        let base = {x: gameEngine.base.x, y: gameEngine.base.y};

        socket.emit("save", {
            studentname: "Gavin Montes", statename: "aState", data: {
                ants: ants,
                paths: paths,
                gameTime: gameEngine._clock.time,
                cheese: cheese,
                base: base,
            }
        });
    };

    loadButton.onclick = function () {
        console.log("load");
        text.innerHTML = "Loaded.";
        socket.emit("load", {studentname: "Gavin Montes", statename: "aState"});
    };

    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine(ctx);

    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine), LAYERS.BG);
    gameEngine.addEntity(new Food(gameEngine, 500, 200), LAYERS.GOALS);
    gameEngine.addEntity(new Base(gameEngine, 50, 650), LAYERS.GOALS);
});
