
var logoData = "data:image/png;base64,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";
var LoadingLayer = cc.Scene.extend({
	_interval : null,
	_label : null,
	_className:"LoadingLayer",
	/**
	 * Contructor of cc.LoaderScene
	 * @returns {boolean}
	 */
	init : function(){
		var self = this;

		//logo
		var logoWidth = 160;
		var logoHeight = 200;

		// bg
		//var bgLayer = self._bgLayer = new cc.LayerColor(cc.color(32, 32, 32, 255));
		var bgLayer = self._bgLayer = new cc.LayerColor(cc.color(255, 255, 255, 255));
		self.addChild(bgLayer, 0);

		//image move to CCSceneFile.js
		var fontSize = 24, lblHeight =  -logoHeight / 2 + 100;
		if(logoData){
			//loading logo
			cc.loader.loadImg(logoData, {isCrossOrigin : false }, function(err, img){
				logoWidth = img.width;
				logoHeight = img.height;
				self._initStage(img, cc.visibleRect.center);
			});
			fontSize = 14;
			lblHeight = -logoHeight / 2 - 10;
		}
		//loading percent
		var label = self._label = new cc.LabelTTF("Loading... 0%", "Arial", fontSize);
		label.setPosition(cc.pAdd(cc.visibleRect.center, cc.p(0, lblHeight)));
		//label.setColor(cc.color(180, 180, 180));
		label.setColor(cc.color(0, 0, 0));
		bgLayer.addChild(this._label, 10);
		return true;
	},

	_initStage: function (img, centerPos) {
		var self = this;
		var texture2d = self._texture2d = new cc.Texture2D();
		texture2d.initWithElement(img);
		texture2d.handleLoadedTexture();
		var logo = self._logo = new cc.Sprite(texture2d);
		logo.setScale(cc.contentScaleFactor());
		logo.x = centerPos.x;
		logo.y = centerPos.y;
		self._bgLayer.addChild(logo, 10);
	},
	/**
	 * custom onEnter
	 */
	 onEnter: function () {
		 var self = this;
		 cc.Node.prototype.onEnter.call(self);
		 self.schedule(self._startLoading, 0.3);
	 },
	 /**
	  * custom onExit
	  */
	 onExit: function () {
		 cc.Node.prototype.onExit.call(this);
		 var tmpStr = "Loading... 0%";
		 this._label.setString(tmpStr);
	 },

	 /**
	  * init with resources
	  * @param {Array} resources
	  * @param {Function|String} cb
	  */
	 initWithResources: function (resources, cb) {
		 if(cc.isString(resources))
			 resources = [resources];
		 this.resources = resources || [];
		 this.cb = cb;
	 },

	 _startLoading: function () {
		 var self = this;
		 self.unschedule(self._startLoading);
		 var res = self.resources;
		 cc.loader.load(res,
				 function (result, count, loadedCount) {
			 var percent = (loadedCount / count * 100) | 0;
			 percent = Math.min(percent, 100);
			 self._label.setString("Loading... " + percent + "%");
		 }, function () {
			 if (self.cb)
				 self.cb();
		 });
	 }
});
/**
 * <p>cc.LoaderScene.preload can present a loaderScene with download progress.</p>
 * <p>when all the resource are downloaded it will invoke call function</p>
 * @param resources
 * @param cb
 * @returns {cc.LoaderScene|*}
 * @example
 * //Example
 * cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new HelloWorldScene());
    }, this);
 */
LoadingLayer.preload = function(resources, cb){
	if(!this.instance) {
		this.instance = new LoadingLayer();
		this.instance.init();
	}
	this.instance.initWithResources(resources, cb);

	cc.director.runScene(this.instance);
	return this.instance;
};