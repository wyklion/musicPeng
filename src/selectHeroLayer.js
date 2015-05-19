var SelectHeroLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
		
		var size = cc.winSize;
		var bg = new cc.Sprite(res.selectBg_jpg);
		bg.attr({
			x: size.width / 2,
			y: size.height / 2,
		});
		this.addChild(bg, 0);
		
		//猫狗头像选择
	    var catHead = new cc.MenuItemImage(
	        res.selectCatHead_png,
	        res.selectCatHead_png,
	        this.onCat, this);
	    var menuCat = new cc.Menu(catHead);
	    menuCat.setPosition(cc.p(size.width/2-100,size.height/2));
	    this.addChild(menuCat);
	
	    var dogHead = new cc.MenuItemImage(
			        res.selectDogHead_png,
			        res.selectDogHead_png,
			        this.onDog, this);
	    var menuDog = new cc.Menu(dogHead);
	    menuDog.setPosition(cc.p(size.width/2+100,size.height/2));
	    this.addChild(menuDog);
	},

	// callbacks
	onCat:function (sender) {
		this.parent.play(1);
	},
	onDog:function (sender) {
		this.parent.play(2);
	},
});