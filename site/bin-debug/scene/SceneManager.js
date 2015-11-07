/**
 * Created by ComMouse on 2015/11/7.
 */
var scene;
(function (_scene) {
    var SceneManager = (function () {
        function SceneManager() {
        }
        var d = __define,c=SceneManager;p=c.prototype;
        SceneManager.initScene = function () {
            return _scene.TitleScene;
        };
        SceneManager.bind = function (main) {
            this.main = main;
            this.stage = this.main.stage;
        };
        SceneManager.transfer = function (scene) {
            console.log(scene);
            this.main.changeScene(scene);
        };
        return SceneManager;
    })();
    _scene.SceneManager = SceneManager;
    egret.registerClass(SceneManager,"scene.SceneManager");
})(scene || (scene = {}));
