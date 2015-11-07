/**
 * Created by ComMouse on 2015/11/7.
 */
var scene;
(function (scene) {
    var TitleScene = (function (_super) {
        __extends(TitleScene, _super);
        function TitleScene() {
            _super.apply(this, arguments);
        }
        var d = __define,c=TitleScene;p=c.prototype;
        p.create = function () {
            this.createBg();
            this.createTitle();
            this.createButtons();
            this.registerEvents();
            this.grids = new model.GridMap(20, 10);
            this.grids.center(10, 5);
            for (var i = 0; i < this.grids.map.length; i++) {
                var row = this.grids.map[i];
                var str = '';
                for (var j = 0; j < row.length; j++) {
                    str += row[j].envLv + '\t' + '\t';
                }
                console.log(str);
            }
        };
        p.update = function () {
            // TODO
        };
        p.destroy = function () {
            this.removeChild(this.btnText);
            this.removeChild(this.title);
            this.removeChild(this.bg);
        };
        p.createBg = function () {
            //this.bg = new egret.Bitmap(RES.getRes('titleBg'));
            this.bg = new egret.Shape();
            this.bg.graphics.beginGradientFill(egret.GradientType.LINEAR, [0x006ec0, 0x0064c2], [1, 1], [0, 255]);
            this.bg.graphics.drawRect(0, 0, scene.SceneManager.stage.stageWidth, scene.SceneManager.stage.stageHeight);
            this.bg.graphics.endFill();
            this.addChild(this.bg);
        };
        p.createTitle = function () {
            this.title = new egret.TextField();
            this.title.fontFamily = '\'Microsoft YaHei Light\', SimHei, sans-serif';
            this.title.textColor = 0xffffff;
            this.title.textAlign = 'center';
            this.title.fontSize = 80;
            this.title.text = 'Truth';
            this.title.width = 200;
            this.title.x = (scene.SceneManager.stage.stageWidth - this.title.width) / 2;
            this.title.y = 100;
            this.addChild(this.title);
        };
        p.createButtons = function () {
            this.btnText = new egret.TextField();
            this.btnText.fontFamily = '\'Microsoft YaHei Light\', SimHei, sans-serif';
            this.btnText.textColor = 0xffffff;
            this.btnText.textAlign = 'center';
            this.btnText.verticalAlign = 'middle';
            this.btnText.text = 'Start';
            this.btnText.border = true;
            this.btnText.borderColor = 0xffffff;
            this.btnText.width = 200;
            this.btnText.height = 60;
            this.btnText.x = (scene.SceneManager.stage.stageWidth - this.btnText.width) / 2;
            this.btnText.y = scene.SceneManager.stage.stageHeight - 200;
            this.btnText.touchEnabled = true;
            this.addChild(this.btnText);
        };
        p.registerEvents = function () {
            this.btnText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        };
        p.onTouch = function () {
            console.log('a');
            this.grids.expand();
            for (var i = 0; i < this.grids.map.length; i++) {
                var row = this.grids.map[i];
                var str = '';
                for (var j = 0; j < row.length; j++) {
                    str += row[j].bioCount + '\t\t';
                }
                console.log(str);
            }
            //scene.SceneManager.transfer(MainScene);
        };
        return TitleScene;
    })(egret.DisplayObjectContainer);
    scene.TitleScene = TitleScene;
    egret.registerClass(TitleScene,"scene.TitleScene");
})(scene || (scene = {}));
