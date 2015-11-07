/**
 *
 * @author ComMouse
 *
 */
var Demo2 = (function (_super) {
    __extends(Demo2, _super);
    function Demo2() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.startGame, this);
    }
    var d = __define,c=Demo2;p=c.prototype;
    p.startGame = function () {
        alert("hello");
    };
    return Demo2;
})(egret.DisplayObjectContainer);
egret.registerClass(Demo2,"Demo2");
