/**
 * Created by ComMouse on 2015/11/7.
 */
var scene;
(function (scene) {
    var MainScene = (function (_super) {
        __extends(MainScene, _super);
        function MainScene() {
            _super.apply(this, arguments);
        }
        var d = __define,c=MainScene;p=c.prototype;
        p.create = function () {
            this.createGrids();
            this.createMap();
            this.registerListeners();
            setTimeout(function () {
                scene.SceneManager.transfer(scene.ResultScene);
            }, 90 * 1000);
            this.createMusic();
        };
        p.update = function () {
        };
        p.destroy = function () {
            this.timer.stop();
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            if (this.channel) {
                this.channel.stop();
            }
            for (var i = 0; i < this.grids.height; i++) {
                for (var j = 0; j < this.grids.width; j++) {
                    var item = this.map[i][j];
                    item.destroy();
                    this.removeChild(item);
                }
            }
        };
        p.createMusic = function () {
            var sound = new egret.Sound();
            sound.addEventListener(egret.Event.COMPLETE, function loadOver(event) {
                this.channel = sound.play();
            }, this);
            sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function loadError(event) {
                console.log("loaded error!");
            }, this);
            sound.load("resource/assets/bg.mp3");
            this.sound = sound;
        };
        p.createGrids = function () {
            this.grids = new model.GridMap(160, 90);
            this.grids.center(10, 10, 0);
            this.grids.center(150, 80, 1);
            this.grids.flag(80, 45);
        };
        p.createMap = function () {
            var w = scene.SceneManager.stage.stageWidth / this.grids.width;
            var h = scene.SceneManager.stage.stageHeight / this.grids.height;
            this.map = [];
            for (var i = 0; i < this.grids.height; i++) {
                var row = [];
                for (var j = 0; j < this.grids.width; j++) {
                    var item = new view.GridView(this.grids.map[i][j], w, h);
                    row.push(item);
                    item.x = j * w;
                    item.y = i * h;
                    //item.cacheAsBitmap = true;
                    this.addChild(item);
                }
                this.map.push(row);
            }
        };
        p.registerListeners = function () {
            var _this = this;
            setTimeout(function () {
                _this.timer = new egret.Timer(100);
                _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.onTimer, _this);
                _this.timer.start();
            }, 100);
        };
        p.onTimer = function (event) {
            this.grids.expand();
            for (var i = 0; i < this.grids.height; i++) {
                var row = this.map[i];
                for (var j = 0; j < this.grids.width; j++) {
                    row[j].update();
                }
            }
        };
        return MainScene;
    })(egret.DisplayObjectContainer);
    scene.MainScene = MainScene;
    egret.registerClass(MainScene,"scene.MainScene");
})(scene || (scene = {}));
