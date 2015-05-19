var ReadyLayer = cc.Layer.extend({
	ctor: function(){
		this._super();
		
		this.init();
	},

	init:function(){
		this._super();
		var bg = new cc.LayerColor(cc.color(0, 0, 0, 180));
		this.addChild(bg);
		/*
		var clickLabel = new cc.LabelTTF("点击屏幕任意位置开始", "Helvetica", 30);
		clickLabel.setColor(cc.color(255,255,255));//black color
		clickLabel.setPosition(cc.p(320, 400));
		this.addChild(clickLabel);*/
		var tempo = new cc.Sprite(res.readyTempo_png);
		tempo.setPosition(cc.winSize.width/2, cc.winSize.height-260);
		this.addChild(tempo);
		var click = new cc.Sprite(res.readyClick_png);
		click.setPosition(cc.winSize.width/2, cc.winSize.height/2);
		this.addChild(click);
		click.runAction(cc.repeatForever(cc.sequence(cc.fadeIn(0.5),cc.fadeOut(0.5))));
		var cookie = new cc.Sprite(res.readyCookie_png);
		cookie.setPosition(cc.winSize.width/2-140, 180);
		this.addChild(cookie);
		var pong = new cc.Sprite(res.readyPong_png);
		pong.setPosition(cc.winSize.width/2+140, 180);
		this.addChild(pong);
		
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: this.onTouchBegan,
		}, this);
	},
	
	onTouchBegan:function(touch, event) {
		var target = event.getCurrentTarget();
		target.parent.start();
		return true;
	},

	
});
