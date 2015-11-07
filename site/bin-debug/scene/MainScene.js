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
        };
        p.update = function () {
        };
        p.destroy = function () {
            this.timer.stop();
        };
        p.a = function () {
            this.grids.expand();
            for (var i = 0; i < this.grids.map.length; i++) {
                var row = this.grids.map[i];
                var str = '';
                for (var j = 0; j < row.length; j++) {
                    str += row[j].bioCount + '\t\t';
                }
            }
        };
        p.createGrids = function () {
            this.grids = new model.GridMap(80, 45);
            this.grids.center(40, 22);
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
                    this.addChild(item);
                }
                this.map.push(row);
            }
        };
        p.registerListeners = function () {
            this.timer = new egret.Timer(100);
            this.timer.addEventListener(egret.TimerEvent.TIMER, function (event) {
                this.grids.expand();
                for (var i = 0; i < this.grids.height; i++) {
                    var row = this.map[i];
                    for (var j = 0; j < this.grids.width; j++) {
                        row[j].update();
                    }
                }
            }, this);
            this.timer.start();
        };
        return MainScene;
    })(egret.DisplayObjectContainer);
    scene.MainScene = MainScene;
    egret.registerClass(MainScene,"scene.MainScene");
})(scene || (scene = {}));
