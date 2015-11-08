/**
 * Created by ComMouse on 2015/11/8.
 */
module view {
    export class GridView extends egret.DisplayObjectContainer {
        private grid;
        public _width;
        public _height;
        private box;
        private text;
        private _color;

        public constructor(grid, w, h) {
            super();
            this.grid = grid;
            this._width = w;
            this._height = h;
            this._color = 0;
            this.createBox();
            this.createText();

            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event:egret.TouchEvent) {
                this.grid.bioCount[Math.floor(Math.random() * 2)] += 2;
                this.update();
            }, this);
        }

        private createBox():void {
            this.box = new egret.Shape();
            this.addChild(this.box);
            this.updateColor();
        }

        private createText():void {
            this.text = new egret.TextField();
            this.text.fontFamily = '\'Microsoft YaHei Light\', SimHei, sans-serif';
            this.text.stroke = 1;
            this.text.strokeColor = 0x000000;
            this.text.textColor = 0xffffff;
            this.text.textAlign = 'middle';
            this.text.size = 10;
            this.text.text = Math.max(this.grid.bioCount[0], this.grid.bioCount[1]);
            this.text.width = this._width;
            this.text.height = this._height;
            this.text.x = 4;
            this.text.y = 6;

            //this.addChild(this.text);
        }

        private update():void {
            this.visible = this.grid.isShown;
            if (!this.visible) {
                return;
            }
            this.updateColor();
            //this.text.text = this.grid.bioCount;
        }

        private updateColor():void {
            var color = this.getColor(this.grid);
            if (color != this._color) {
                //console.log('Repaint!');
                this.box.graphics.clear();
                this.box.graphics.beginFill(color);
                //console.log(this.getColor(this.grid));
                this.box.graphics.drawRect(0, 0, this._width, this._height);
                this.box.graphics.endFill();
                this._color = color;
            }
        }

        private getColor(grid) {
            var alpha = (grid.envLv + 10) / 20;
            var color = Math.round((0x009900) * alpha + (0x0055ff) * (1 - alpha));
            if (grid.bioCount[0] > 1 || grid.bioCount[1] > 1) {
                var num = Math.max(grid.bioCount[0], grid.bioCount[1]);
                var alpha = Math.min(num / 10000, 1);
                var baseColor = 0;
                var toColor = 0;
                if (grid.bioCount[0] < grid.bioCount[1]) {
                    baseColor = 0x9900ff;
                    toColor = 0x9966ff;
                } else {
                    baseColor = 0xff0000;
                    toColor = 0xFF7373;
                }
                return Math.round(baseColor * alpha + toColor * (1 - alpha));
            } else {
                return color;
            }
        }
    }
}