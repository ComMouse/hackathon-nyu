/**
 * Created by ComMouse on 2015/11/7.
 */
module scene {
    export class SceneManager {

        private static main:Main;
        public static stage:egret.Stage;

        public static initScene() {
            return TitleScene;
        }

        public static bind(main:Main):void {
            this.main = main;
            this.stage = this.main.stage;
        }

        public static transfer(scene:BaseScene):void {
            console.log(scene);
            this.main.changeScene(scene);
        }
    }
}