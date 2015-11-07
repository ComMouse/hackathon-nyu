/**
 * Created by ComMouse on 2015/11/8.
 */
module model {
    export class GridMap {
        grids:Array<Array<GridModel> >;
        width:number;
        height:number;
        growRate:number;
        total:number;

        static UP = 8;
        static DOWN = 2;
        static LEFT = 4;
        static RIGHT = 6;

        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.growRate = 1.2;
            this.total = 0;

            this.initArray();
        }

        public center(x, y):void {
            this.grids[y][x].envLv = 5;
            this.grids[y][x].bioCount = 1;
            this.total = 1;
        }

        private initArray():void {
            this.grids = [];
            for (var i = 0; i < this.height; i++) {
                var row = [];
                for (var j = 0; j < this.width; j++) {
                    var grid = new GridModel();
                    grid.envLv = Math.round(Math.random() * 20) - 10;
                    grid.bioCount = 0;
                    grid.newCount = 0;
                    grid.x = j;
                    grid.y = i;
                    row.push(grid);
                }
                this.grids.push(row);
            }
        }

        get map():Array<Array<GridModel> > {
            return this.grids;
        }

        expand():void {
            this.total = 0;
            for (var i = 0; i < this.height; i++) {
                for (var j = 0; j < this.width; j++) {
                    this.updateLiveCount(this.grids[i][j]);
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
                    this.total += this.grids[i][j].bioCount;
                }
            }
            this.growRate = 1000 / this.total > 1 ? Math.sqrt(this.growRate) : 1000 / this.total;
        }

        private expandGrid(grid):void {
            this.expandGridDir(grid, GridMap.UP);
            this.expandGridDir(grid, GridMap.LEFT);
            this.expandGridDir(grid, GridMap.DOWN);
            this.expandGridDir(grid, GridMap.RIGHT);
        }

        private expandGridDir(grid, dir:Number):void {
            //console.log(grid, dir);
            var newGrid:GridModel = this.moveGrid(grid, dir);
            if (!newGrid || newGrid.bioCount > grid.bioCount) {
                return;
            }
            newGrid.newCount += Math.round(grid.bioCount * 0.1 * (Math.random() * 0.1 + 0.95));
            //grid.newCount -= Math.round(grid.bioCount * 0.4);
        }

        private updateLiveCount(grid:GridModel):void {
            var liveRate = 1;
            var rate = 1;
            if (grid.envLv < liveRate) {
                //console.log();
                rate = Math.exp(-Math.pow(2, liveRate - grid.envLv));
                rate = Math.min(rate, 0);
                //console.log(rate);
            }
            grid.bioCount = Math.ceil(grid.bioCount * this.growRate * rate * (Math.random() * 0.1 + 0.95));
        }

        private updateNewCount(grid:GridModel):void {
            grid.bioCount += grid.newCount;
            grid.newCount = 0;
        }

        public moveGrid(grid, dir:Number):GridModel {
            switch (dir) {
                case GridMap.UP:
                    if (grid.y == 0) {
                        return null;
                        return this.grids[this.height - 1][grid.x];
                    }
                    return this.grids[grid.y - 1][grid.x];
                    break;
                case GridMap.DOWN:
                    if (grid.y == this.height - 1) {
                        return null;
                        return this.grids[0][grid.x];
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
    }
}