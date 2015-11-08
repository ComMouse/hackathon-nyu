/**
 * Created by ComMouse on 2015/11/7.
 */
module scene {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    export class MainScene extends egret.DisplayObjectContainer implements BaseScene {
        private grids;
        private map;
        private timer;
        private sound;
        private channel;

        public create() {
            this.visible = false;
            this.createGrids();
            this.createMap();
            this.registerListeners();
            setTimeout(function () {
                SceneManager.transfer(ResultScene);
            }, 90 * 1000);
            this.createMusic();
        }

        public update() {
        }

        public destroy() {
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
        }

        private createMusic():void {
            var sound:egret.Sound = new egret.Sound();
            sound.addEventListener(egret.Event.COMPLETE, function loadOver(event:egret.Event) {
                this.channel = sound.play();
            }, this);
            sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function loadError(event:egret.IOErrorEvent) {
                console.log("loaded error!");
            }, this);
            sound.load("resource/assets/bg.mp3");
            this.sound = sound;
        }

        private createGrids():void {
            this.grids = new model.GridMap(160, 90);
            this.grids.center(10, 10, 0);
            this.grids.center(150, 80, 1);
            this.grids.flag(80, 45);
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
                    //item.cacheAsBitmap = true;
                    this.addChild(item);
                }
                this.map.push(row);
            }
        }

        private registerListeners():void {
            var _this = this;
            setTimeout(function () {
                _this.timer = new egret.Timer(100);
                _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.onTimer, _this);
                _this.timer.start();
            }, 100);
        }

        private onTimer(event:egret.TimerEvent):void {
            this.visible = true;
            this.grids.expand();
            for (var i = 0; i < this.grids.height; i++) {
                var row = this.map[i];
                for (var j = 0; j < this.grids.width; j++) {
                    row[j].update();
                }
            }
        }
    }
}