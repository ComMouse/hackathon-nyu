/**
 * Created by ComMouse on 2015/11/7.
 */
var scene;
(function (scene) {
    var BaseScene = (function (_super) {
        __extends(BaseScene, _super);
        function BaseScene() {
            _super.apply(this, arguments);
        }
        var d = __define,c=BaseScene;p=c.prototype;
        /**
         * Create a scene.
         */
        p.create = function () {
        };
        /**
         * Update a scene.
         */
        p.update = function () {
        };
        /**
         * Destory a scene.
         */
        p.destroy = function () {
        };
        return BaseScene;
    })(egret.DisplayObjectContainer);
    scene.BaseScene = BaseScene;
    egret.registerClass(BaseScene,"scene.BaseScene");
})(scene || (scene = {}));
