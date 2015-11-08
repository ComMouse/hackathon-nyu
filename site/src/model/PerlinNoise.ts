/**
 * Created by ComMouse on 2015/11/8.
 */
module model {
    export class PerlinNoise {
        public makeMap() {
            var res = RES.getRes('mapBg');
            var bmp = new egret.Bitmap(res);
            console.log(bmp);
            var result = this.genPerlinNoise(bmp.bitmapData, 1);
            return result;
        }

        public genWhiteNoide(width, height) {
            var arr = this.getEmptyArray(width, height);
            for (var i = 0; i < width; i++) {
                var row = arr[i];
                for (var j = 0; j < height; j++) {
                    var grid = new GridModel();
                    grid.envLv = Math.round(Math.random() * 20) - 10;
                    grid.bioCount = 0;
                    grid.newCount = 0;
                    grid.x = j;
                    grid.y = i;
                    row[j] = grid;
                }
            }
            return arr;
        }

        public genSmoothNoise(baseNoise, octave) {
          //console.log(baseNoise);
            var width = baseNoise.textureWidth;
            var height = baseNoise.textureHeight;

            var smoothNoise = this.getEmptyArray(width, height);

            var samplePeriod = 1 << octave; // calculates 2 ^ k
            var sampleFrequency = 1.0 / samplePeriod;

            for (var i = 0; i < width; i++) {
                //calculate the horizontal sampling indices
                var sample_i0 = Math.floor((i / samplePeriod) * samplePeriod);
                var sample_i1 = Math.floor((sample_i0 + samplePeriod) % width); //wrap around
                var horizontal_blend = (i - sample_i0) * sampleFrequency;

                for (var j = 0; j < height; j++) {
                    //calculate the vertical sampling indices
                    var sample_j0 = Math.floor((j / samplePeriod) * samplePeriod);
                    var sample_j1 = Math.floor((sample_j0 + samplePeriod) % height); //wrap around
                    var vertical_blend = (j - sample_j0) * sampleFrequency;
                    console.log([sample_i0, sample_i1, sample_j0, sample_j1]);

                    //blend the top two corners
                    var top = this.interpolate(this.getPixel(baseNoise, sample_i0, sample_j0),
                        this.getPixel(baseNoise, sample_i1, sample_j0), horizontal_blend);

                    //blend the bottom two corners
                    var bottom = this.interpolate(this.getPixel(baseNoise, sample_i0, sample_j1),
                        this.getPixel(baseNoise, sample_i1, sample_j1), horizontal_blend);

                    //final blend
                    smoothNoise[i][j] = this.interpolate(top, bottom, vertical_blend);
                }
            }

            return smoothNoise;
        }

        private interpolate(x0, x1, alpha) {
            return x0 * (1 - alpha) + alpha * x1;
        }

        private getEmptyArray(width, height) {
            var arr = [];
            for (var i = 0; i < width; i++) {
                var row = [];
                for (var j = 0; j < height; j++) {
                    row.push(0);
                }
                arr.push(row);
            }
            return arr;
        }

        public genPerlinNoise(baseNoise, octaveCount) {
            var width = baseNoise.textureWidth;
            var height = baseNoise.textureHeight;
            console.log(width);
            console.log(height);

            var smoothNoise = [];

            var persistance = 0.5;

            //generate smooth noise
            for (var i = 0; i < octaveCount; i++) {
                //console.log(i);
                smoothNoise.push(this.genSmoothNoise(baseNoise, i));
            }

            console.log(smoothNoise);

            var perlinNoise = this.getEmptyArray(width, height);
            var amplitude = 1.0;
            var totalAmplitude = 0.0;

            //blend noise together
            for (var octave = octaveCount - 1; octave >= 0; octave--) {
                amplitude *= persistance;
                totalAmplitude += amplitude;

                for (var i = 0; i < width; i++) {
                    for (var j = 0; j < height; j++) {
                        perlinNoise[i][j] += smoothNoise[octave][i][j] * amplitude;
                    }
                }
            }

            //normalisation
            for (var i = 0; i < width; i++) {
                for (var j = 0; j < height; j++) {
                    perlinNoise[i][j] /= totalAmplitude;
                }
            }

            return perlinNoise;
        }

        private getPixel(baseNoise:any, x:Number, y:Number) {
            var rgb = baseNoise.getPixel32(x, y);
            rgb = rgb[0] << 16 + rgb[1] << 8 + rgb[2];
            return rgb;
        }
    }
}