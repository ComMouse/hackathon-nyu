/**
 * Created by ComMouse on 2015/11/7.
 */
var scene;
(function (scene) {
    var MainScene = (function (_super) {
        __extends(MainScene, _super);
        function MainScene() {
            _super.apply(this, arguments);
        }
        var d = __define,c=MainScene;p=c.prototype;
        p.create = function () {
        };
        p.update = function () {
        };
        p.destroy = function () {
        };
        return MainScene;
    })(egret.DisplayObjectContainer);
    scene.MainScene = MainScene;
    egret.registerClass(MainScene,"scene.MainScene");
})(scene || (scene = {}));
