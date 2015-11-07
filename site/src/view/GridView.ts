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

        public constructor(grid, w, h) {
            super();
            this.grid = grid;
            this._width = w;
            this._height = h;
            this.createBox();
            this.createText();
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
            this.text.text = this.grid.bioCount;
            this.text.width = this._width;
            this.text.height = this._height;
            this.text.x = 4;
            this.text.y = 6;

            this.addChild(this.text);
        }

        private update():void {
            //this.updateColor();
            this.text.text = this.grid.bioCount;
        }

        private updateColor():void {
            this.box.graphics.clear();
            this.box.graphics.beginFill(this.getColor(this.grid));
            console.log(this.getColor(this.grid));
            this.box.graphics.drawRect(0, 0, this._width, this._height);
            this.box.graphics.endFill();
        }

        private getColor(grid) {
            return Math.round((0x0099ff) * ((grid.envLv + 10) / 20) + (0x00ff99) * ((10 - grid.envLv) / 20));
        }
    }
}