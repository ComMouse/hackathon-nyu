/**
 * Created by ComMouse on 2015/11/8.
 */
module model {
    export class GridMap {
        grids:Array<Array<GridModel> >;
        width:number;
        height:number;
        growRate:Array<number>;
        total:Array<number>;
        suitEnv:Array<number>;
        limit:Array<number>;
        timer:Array<number>;
        _flag:Array<number>;
        allow:Boolean;

        playEffect:Boolean;
        sound;

        start:Date;

        static UP = 8;
        static DOWN = 2;
        static LEFT = 4;
        static RIGHT = 6;

        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.growRate = [1.11, 1.12];
            this.total = [0, 0];
            this.limit = [10000, 10000];
            this.timer = [0, 0];
            this.suitEnv = [0, 0];
            this.allow = false;
            this.playEffect = false;

            this.initArray();

            var sound:egret.Sound = new egret.Sound();
            sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function loadError(event:egret.IOErrorEvent) {
                console.log("loaded error!");
            }, this);
            sound.load("resource/assets/pair.wav");
            this.sound = sound;
        }

        public center(x, y, type):void {
            this.suitEnv[type] = this.grids[y][x].envLv;
            this.grids[y][x].bioCount[type] = 1;
            this.total[type] = 1;
        }

        private initArray():void {
            this.grids = [];
            for (var i = 0; i < this.height; i++) {
                var row = [];
                for (var j = 0; j < this.width; j++) {
                    var grid = new GridModel();
                    //grid.envLv = rawMap[j][i];
                    if (i > 0 && j > 0) {
                        grid.envLv = Math.min(Math.max(Math.round((this.grids[i - 1][j].envLv + row[j - 1].envLv) / 2 + Math.round(Math.random()) * 4 - 1), -10), 10);
                        //console.log(grid.envLv);
                    } else {
                        grid.envLv = Math.round(Math.random() * 20) - 10;
                    }
                    grid.bioCount = [0, 0];
                    grid.newCount = [0, 0];
                    grid.x = j;
                    grid.y = i;
                    grid.flag = false;
                    row.push(grid);
                }
                this.grids.push(row);
            }
        }

        get map():Array<Array<GridModel> > {
            return this.grids;
        }

        expand():void {
            this.total = [0, 0];
            for (var i = 0; i < this.height; i++) {
                for (var j = 0; j < this.width; j++) {
                    this.grids[i][j].isShown = false;
                }
            }
            for (var i = 0; i < this.height; i++) {
                for (var j = 0; j < this.width; j++) {
                    this.expandGrid(this.grids[i][j]);
                }
            }
            for (var i = 0; i < this.height; i++) {
                for (var j = 0; j < this.width; j++) {
                    this.updateNewCount(this.grids[i][j]);
                }
            }
            for (var i = 0; i < this.height; i++) {
                for (var j = 0; j < this.width; j++) {
                    this.updateLiveCount(this.grids[i][j]);
                    this.total[0] += this.grids[i][j].bioCount[0];
                    this.total[1] += this.grids[i][j].bioCount[1];
                }
            }
            this.growRate[0] = this.limit[0] / this.total[0] > 1 ? Math.sqrt(this.growRate[0]) : this.limit[0] / this.total[0];
            this.growRate[1] = this.limit[1] / this.total[1] > 1 ? Math.sqrt(this.growRate[1]) : this.limit[1] / this.total[1];
            if (this.total[0] > this.limit[0] && ++this.timer[0] > 30) {
                this.timer[0] = 0;
                this.limit[0] *= 1.1;
            }
            if (this.total[1] > this.limit[1] && ++this.timer[1] > 10) {
                this.timer[1] = 0;
                this.limit[1] *= 1.1;
            }
            //this.growRate = Math.sqrt(this.growRate);
        }

        private expandGrid(grid):void {
            this.expandGridDir(grid, GridMap.UP);
            this.expandGridDir(grid, GridMap.LEFT);
            this.expandGridDir(grid, GridMap.DOWN);
            this.expandGridDir(grid, GridMap.RIGHT);

            if (grid.bioCount[0] > 0 || grid.bioCount[1] > 0) {
                grid.isShown = true;
                this.expandGridShown(grid, 5);
            }
        }

        private expandGridShown(grid, recursionCount = 0):void {
            if (!grid) return;
            grid.isShown = true;
            var newGrid1 = this.moveGrid(grid, GridMap.UP);
            if (newGrid1 && recursionCount > 0 && (newGrid1.bioCount[0] == 0 || newGrid1.bioCount[1] == 0)) {
                this.expandGridShown(newGrid1, recursionCount - 1);
            }
            var newGrid2 = this.moveGrid(grid, GridMap.LEFT);
            if (newGrid2 && recursionCount > 0 && (newGrid2.bioCount[0] == 0 || newGrid2.bioCount[1] == 0)) {
                this.expandGridShown(newGrid2, recursionCount - 1);
            }
            var newGrid3 = this.moveGrid(grid, GridMap.DOWN);
            if (newGrid3 && recursionCount > 0 && (newGrid3.bioCount[0] == 0 || newGrid3.bioCount[1] == 0)) {
                this.expandGridShown(newGrid3, recursionCount - 1);
            }
            var newGrid4 = this.moveGrid(grid, GridMap.RIGHT);
            if (newGrid4 && recursionCount > 0 && (newGrid4.bioCount[0] == 0 || newGrid4.bioCount[1] == 0)) {
                this.expandGridShown(newGrid4, recursionCount - 1);
            }
        }

        private expandGridDir(grid, dir:Number):void {
            //console.log(grid, dir);
            var newGrid:GridModel = this.moveGrid(grid, dir);
            if (!newGrid) {
                return;
            }
            if (newGrid.bioCount[0] <= grid.bioCount[0]) {
                var rate = (dir == GridMap.DOWN || dir == GridMap.RIGHT) ? 0.5 : 2;
                newGrid.newCount[0] += Math.round(grid.bioCount[0] * 0.1 * (Math.random() * 0.1 + 0.95));
            }
            if (newGrid.bioCount[1] <= grid.bioCount[1]) {
                var rate = (dir == GridMap.UP || dir == GridMap.LEFT) ? 2 : 0.5;
                newGrid.newCount[1] += Math.round(grid.bioCount[1] * 0.2 * rate * (Math.random() * 0.2 + 0.9));
            }
            //grid.newCount -= Math.round(grid.bioCount * 0.4);
        }

        private updateLiveCount(grid:GridModel):void {
            var liveRate = this.suitEnv[0];
            var rate = 1;
            if (Math.abs(grid.envLv - liveRate) > 2) {
                rate = 0;
            } else if (Math.abs(grid.envLv - liveRate) > 1) {
                //console.log();
                rate = Math.exp(-Math.pow(2, liveRate - grid.envLv));
                rate = Math.min(rate, 1);
                //console.log(rate);
            } else {
                rate = 2 * (2 - Math.abs(grid.envLv - liveRate));
            }
            grid.bioCount[0] = Math.ceil(grid.bioCount[0] * this.growRate[0] * rate * (Math.random() * 0.1 + 0.95));

            var liveRate = this.suitEnv[1];
            var rate = 1;
            if (Math.abs(grid.envLv - liveRate) > 6) {
                rate = 0;
            } else if (Math.abs(grid.envLv - liveRate) > 1) {
                //console.log();
                rate = Math.exp(-Math.pow(1.5, liveRate - grid.envLv));
                rate = Math.min(rate, 1);
                //console.log(rate);
            } else {
                rate = 2 * (2 - Math.abs(grid.envLv - liveRate));
            }
            grid.bioCount[1] = Math.ceil(grid.bioCount[1] * this.growRate[1] * rate * (Math.random() * 0.1 + 0.95));
        }

        private updateNewCount(grid:GridModel):void {
            grid.bioCount[0] += grid.newCount[0];
            grid.newCount[0] = 0;
            grid.bioCount[1] += grid.newCount[1];
            grid.newCount[1] = 0;
            if ((grid.bioCount[0] & grid.bioCount[1]) != 0) {
                if (grid.bioCount[0] > grid.bioCount[1]) {
                    grid.bioCount[0] -= grid.bioCount[1];
                    grid.bioCount[1] = 0;
                } else {
                    grid.bioCount[1] -= grid.bioCount[0];
                    grid.bioCount[0] = 0;
                }

                if (!this.playEffect) {
                    this.playEffect = true;
                    this.sound.play(0, 1);

                    var _this = this;
                    setTimeout(function () {
                        _this.playEffect = false;
                    }, 200);
                }
            }
        }

        public moveGrid(grid, dir:Number):GridModel {
            if (grid == null) {
                return null;
            }
            switch (dir) {
                case GridMap.UP:
                    if (grid.y == 0) {
                        return null;
                    }
                    return this.grids[grid.y - 1][grid.x];
                    break;
                case GridMap.DOWN:
                    if (grid.y == this.height - 1) {
                        return null;
                    }
                    return this.grids[grid.y + 1][grid.x];
                    break;
                case GridMap.LEFT:
                    if (grid.x == 0) {
                        return this.grids[grid.y][this.width - 1];
                    }
                    return this.grids[grid.y][grid.x - 1];
                    break;
                case GridMap.RIGHT:
                    if (grid.x == this.width - 1) {
                        return this.grids[grid.y][0];
                    }
                    return this.grids[grid.y][grid.x + 1];
                    break;
            }
        }

        private flag(x, y):void {
            this.grids[y][x].flag = true;
            this._flag = [x, y];
        }
    }
}