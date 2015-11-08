/**
 * Created by ComMouse on 2015/11/7.
 */
module scene {
    export class TitleScene extends egret.DisplayObjectContainer implements BaseScene {

        private bg;
        private title;
        private btnText;

        public create() {
            this.createBg();
            this.createTitle();
            this.createButtons();
            this.registerEvents();
        }

        public update() {
            // TODO
        }

        public destroy() {
            this.removeChild(this.btnText);
            this.removeChild(this.title);
            this.removeChild(this.bg);
        }

        private createBg() {
            this.bg = new egret.Bitmap(RES.getRes('bgImage'));
            this.bg.width = SceneManager.stage.stageWidth;
            this.bg.height = SceneManager.stage.stageHeight;

            this.addChild(this.bg);
        }

        private createTitle() {
            this.title = new egret.TextField();
            this.title.fontFamily = '\'Microsoft YaHei Light\', SimHei, sans-serif';
            this.title.textColor = 0xffffff;
            this.title.textAlign = 'center';
            this.title.size = 80;
            this.title.text = 'Hacking the Planet';
            this.title.width = 800;
            this.title.height = 100;
            this.title.x = (SceneManager.stage.stageWidth - this.title.width) / 2;
            this.title.y = 100;

            this.addChild(this.title);
        }

        private createButtons() {
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
            this.btnText.x = (SceneManager.stage.stageWidth - this.btnText.width) / 2;
            this.btnText.y = SceneManager.stage.stageHeight - 200;
            this.btnText.touchEnabled = true;

            this.addChild(this.btnText);
        }

        private registerEvents() {
            this.btnText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        }

        private onTouch() {
            scene.SceneManager.transfer(StartScene);
        }
    }
}