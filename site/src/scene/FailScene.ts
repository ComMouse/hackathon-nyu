/**
 * Created by ComMouse on 2015/11/8.
 */
module scene {
    export class FailScene extends BaseScene {
        private text:egret.TextField;
        private count:number;

        public create() {
            this.count = 0;
            this.createLayout();
            this.touchEnabled = true;
            var _this = this;
            setTimeout(function () {
                _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouch, _this);
            }, 100);
        }

        public update() {
        }

        public destroy() {
            this.removeChild(this.text);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        }

        private createLayout():void {
            this.text = new egret.TextField();
            this.text.fontFamily = '\'Microsoft YaHei Light\', SimHei, sans-serif';
            this.text.textColor = 0xffffff;
            this.text.textAlign = 'center';
            this.text.verticalAlign = 'middle';
            this.text.text = '保卫失败 / You Lose';
            this.text.background = true;
            this.text.backgroundColor = 0xaaaaaa;
            this.text.width = SceneManager.stage.stageWidth;
            this.text.height = 120;
            this.text.x = 0;
            this.text.y = (SceneManager.stage.stageHeight - this.text.height) / 2;

            this.addChild(this.text);
        }

        private onTouch(event:egret.TouchEvent = null):void {
            SceneManager.transfer(TitleScene);
        }
    }
}