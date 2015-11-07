/**
 * Created by ComMouse on 2015/11/7.
 */
module scene {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    export class MainScene extends egret.DisplayObjectContainer implements BaseScene {
        private grids;
        private map;
        private timer;

        public create() {
            this.createGrids();
            this.createMap();
            this.registerListeners();
        }

        public update() {
        }

        public destroy() {
            this.timer.stop();
        }

        public a() {
            this.grids.expand();
            for (var i = 0; i < this.grids.map.length; i++) {
                var row = this.grids.map[i];
                var str = '';
                for (var j = 0; j < row.length; j++) {
                    str += row[j].bioCount + '\t\t';
                }
                //console.log(str);
            }
        }

        private createGrids():void {
            this.grids = new model.GridMap(80, 45);
            this.grids.center(40, 22);
        }

        private createMap():void {
            var w = scene.SceneManager.stage.stageWidth / this.grids.width;
            var h = scene.SceneManager.stage.stageHeight / this.grids.height;
            this.map = [];
            for (var i = 0; i < this.grids.height; i++) {
                var row = [];
                for (var j = 0; j < this.grids.width; j++) {
                    var item:egret.DisplayObjectContainer = new view.GridView(this.grids.map[i][j], w, h);
                    row.push(item);
                    item.x = j * w;
                    item.y = i * h;
                    this.addChild(item);
                }
                this.map.push(row);
            }
        }

        private registerListeners():void {
            this.timer = new egret.Timer(100);
            this.timer.addEventListener(egret.TimerEvent.TIMER, function (event:egret.TimerEvent) {
                this.grids.expand();
                for (var i = 0; i < this.grids.height; i++) {
                    var row = this.map[i];
                    for (var j = 0; j < this.grids.width; j++) {
                        row[j].update();
                    }
                }
            }, this);
            this.timer.start();
        }
    }
}