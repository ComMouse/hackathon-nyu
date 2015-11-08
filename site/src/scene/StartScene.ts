/**
 * Created by ComMouse on 2015/11/8.
 */
module scene {
    export class StartScene extends BaseScene {
        private text:egret.TextField;
        private count:number;

        public create() {
            this.count = 0;
            this.createLayout();
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            setTimeout(this.onTouch, 2000);
        }

        public update() {
            //this.text.y = (SceneManager.stage.stageHeight - this.text.height) / 2 + Math.sin(++this.count / (SceneManager.stage.frameRate * 2) * Math.PI / 2);
            if (++this.count > 30 && this.count <= 60) {
                this.text.alpha = Math.cos((30 - this.count) / 30 * Math.PI / 2);
            }
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
            this.text.text = '保卫你的旗帜 / Hold Your Flag';
            this.text.background = true;
            this.text.backgroundColor = 0xaaaaaa;
            this.text.width = SceneManager.stage.stageWidth;
            this.text.height = 120;
            this.text.x = 0;
            this.text.y = (SceneManager.stage.stageHeight - this.text.height) / 2;

            this.addChild(this.text);
        }

        private onTouch(event:egret.TouchEvent = null):void {
            SceneManager.transfer(MainScene);
        }
    }
}