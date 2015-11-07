/**
 *
 * @author ComMouse
 *
 */
class Demo2 extends egret.DisplayObjectContainer {
	public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.startGame,this);
	}
	
	public startGame():void {
        alert("hello");
	}
}
