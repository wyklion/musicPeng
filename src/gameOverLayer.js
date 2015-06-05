
var scoreLevel = [];
scoreLevel[0] = 0;
scoreLevel[1] = 150;
scoreLevel[2] = 1170;
scoreLevel[3] = 3300;
scoreLevel[4] = 8000;
scoreLevel[5] = 23670;
scoreLevel[6] = 30000;
scoreLevel[7] = 39290;
scoreLevel[8] = 93360;
scoreLevel[9] = 116352;
scoreLevel[10] = 208320;

var GameOverLayer = cc.Layer.extend({
	score:0,
	rank:0,
	highScore:null,
	inApp:false,
	inWeixin:false,
	ctor: function(score){
		this._super();

		this.init(score);
	},

	init:function(score){
		cc.audioEngine.stopMusic();
		playEffect(res.resultMusic_mp3);
		this._super();

		this.inApp = g_playLayer.userName!=null;
		this.inWeixin = this.isWeixin();
		//背景
		/*
		var bg = new cc.Sprite(res.bg2_png);
		bg.setPosition(320,480);
		this.addChild(bg, 0);*/

		this.score = score;
		var ls = cc.sys.localStorage;
		if(LOCAL_STORAGE_OK)
			this.highScore = ls.getItem("highScore");
		else
			this.highScore = 0;
		if(this.highScore == null) this.highScore = 0;
		if(this.score>this.highScore){
			if(LOCAL_STORAGE_OK)
				ls.setItem("highScore", this.score);
			this.highScore = this.score;
		}
		
		var bg = new cc.LayerColor(cc.color(0, 0, 0, 180));
		this.addChild(bg,-2);
		
		var dtime = 0;
		//分数背景
		var resultY = cc.winSize.height/2+170;
		var resultBg = new cc.Sprite(res.resultBg_png);
		resultBg.setPosition(cc.winSize.width/2, resultY+400);
		this.addChild(resultBg);
		resultBg.runAction(cc.moveBy(0.5,cc.p(0,-400)).easing(cc.easeInOut(2.0)));
		dtime = dtime + 0.5
		//分数
		var resultLabel = new cc.Sprite(res.label_result_png);
		resultLabel.setPosition(cc.winSize.width/2, resultY);
		this.addChild(resultLabel);
		var scoreLabel = new cc.LabelBMFont(""+this.score, res.result_fnt);
		scoreLabel.setPosition(cc.p(cc.winSize.width/2+80, resultY+6));
		this.addChild(scoreLabel);
		resultLabel.setScale(0);
		scoreLabel.setScale(0);
		resultLabel.runAction(cc.sequence(cc.delayTime(dtime),
				cc.scaleTo(0.1,1.1),
				cc.scaleTo(0.1,1)));
		scoreLabel.runAction(cc.sequence(cc.delayTime(dtime),
				cc.scaleTo(0.1,1.1),
				cc.scaleTo(0.1,1)));
		dtime = dtime + 0.2;
		//超过百分比
		var overNode = new cc.Node();
		this.addChild(overNode,-1);
		var overLabel = new cc.Sprite(res.label_over_png);
		overLabel.setAnchorPoint(0,0.5);
		overLabel.setPosition(cc.winSize.width/2-220, PAO_LAYER_Y+20);
		overNode.addChild(overLabel);
		this.rank = this.getVirtualRank(this.score);
		var perLabel = new cc.LabelTTF(this.rank+"", "Helvetica", 30);
		perLabel.setColor(cc.color(255,211,20));//black color
		perLabel.setPosition(cc.p(cc.winSize.width/2+30, PAO_LAYER_Y+20));
		overNode.addChild(perLabel);
		overNode.setPosition(0,300);
		overLabel.setVisible(false);
		perLabel.setVisible(false);
		overNode.runAction(cc.sequence(
				cc.delayTime(dtime),
				cc.callFunc(function(){
					overLabel.setVisible(true);
					perLabel.setVisible(true);
				}),
				cc.moveBy(0.5,cc.p(0,-300)).easing(cc.easeInOut(2.0))));
		//历史最高
		var highNode = new cc.Node();
		this.addChild(highNode,-1);
		var historyLabel = new cc.Sprite(res.label_history_png);
		historyLabel.setAnchorPoint(0,0.5);
		historyLabel.setPosition(cc.winSize.width/2-220, PAO_LAYER_Y-20);
		highNode.addChild(historyLabel);
		var highLabel = new cc.LabelTTF(""+this.highScore, "Helvetica", 30);
		highLabel.setColor(cc.color(255,211,20));//black color
		highLabel.setPosition(cc.p(cc.winSize.width/2+30, PAO_LAYER_Y-20));
		highNode.addChild(highLabel);
		highNode.setPosition(0,300);
		historyLabel.setVisible(false);
		highLabel.setVisible(false);
		highNode.runAction(cc.sequence(
				cc.delayTime(dtime),
				cc.callFunc(function(){
					historyLabel.setVisible(true);
					highLabel.setVisible(true);
				}),
				cc.moveBy(0.5,cc.p(0,-300)).easing(cc.easeInOut(2.0))));
		dtime = dtime + 0.6
		//最高纪录的标记
		if(this.score == this.highScore){
			var bestTag = new cc.Sprite(res.bestTag_png);
			bestTag.setPosition(cc.winSize.width/2, resultY+120);
			this.addChild(bestTag);
			bestTag.setScale(0);
			bestTag.runAction(cc.sequence(cc.delayTime(dtime),
					cc.scaleTo(0.1,1.1),
					cc.scaleTo(0.1,1)));
			dtime = dtime + 0.4;
		}
		//重玩
	    var retry = new cc.MenuItemImage(
			        res.buttonRetry_png,
			        res.buttonRetry_png,
			        this.retry, this);
		//retry.setPosition(cc.p(180-300,180));
	    var menuRetry = new cc.Menu(retry);
	    menuRetry.setPosition(cc.p(cc.winSize.width/2-140-(cc.winSize.width/2+80),180));
	    this.addChild(menuRetry);
	    var share = new cc.MenuItemImage(
			        res.buttonShare_png,
			        res.buttonShare_png,
			        this.share, this);
	    var menuShare = new cc.Menu(share);
	    menuShare.setPosition(cc.p(cc.winSize.width/2+140+(cc.winSize.width/2+80),180));
	    this.addChild(menuShare);
		
		menuRetry.runAction(cc.sequence(cc.delayTime(dtime),cc.moveBy(0.5,cc.p((cc.winSize.width/2+80),0)).easing(cc.easeInOut(2.0))));
		menuShare.runAction(cc.sequence(cc.delayTime(dtime),cc.moveBy(0.5,cc.p(-(cc.winSize.width/2+80),0)).easing(cc.easeInOut(2.0))));
	},
	getVirtualRank:function(score){
		var idx = 0;
		while(score >= scoreLevel[idx] && idx <= 9)
			idx = idx + 1;
		cc.log("level:",idx);
		if(score >= scoreLevel[idx]) return 100;
		var k = Math.floor((idx-1)*10+(score - scoreLevel[idx-1])/(scoreLevel[idx] - scoreLevel[idx-1])*10);
		return k;
	},
	retry:function(){
		playEffect(res.buttonSound_mp3);		
		this.parent.retry();
	},
	share:function(){
		playEffect(res.buttonSound_mp3);
		if(!this.inApp)
			this.addChild(new ShareUI());
		else{
			var content = encodeURI("我是音乐家，我击败了全国"+this.rank+"%的玩家！");
			location.href = "youchong://sns/share?content="+content;
		}
	},
	isWeixin:function(){
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i)=="micromessenger") {
			return true;
		} else {
			return false;
		}
	},
});

var ShareUI = cc.LayerColor.extend({
	ctor: function () {
		this._super(cc.color(0, 0, 0, 188), cc.winSize.width, cc.winSize.height);

		var arrow = new cc.Sprite(res.Arrow_png);
		arrow.anchorX = 1;
		arrow.anchorY = 1;
		arrow.x = cc.winSize.width - 15;
		arrow.y = cc.winSize.height - 5;
		this.addChild(arrow);

		var label = new cc.LabelTTF("无分享，不快乐\n有宠游戏，带你嗨\nYCW.com", "黑体", 30, cc.size(cc.winSize.width*0.7, 250), cc.TEXT_ALIGNMENT_CENTER);
		label.x = cc.winSize.width/2;
		label.y = cc.winSize.height - 40;
		label.anchorY = 1;
		this.addChild(label);
	},
	onEnter: function () {
		this._super();
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			onTouchBegan: function (touch, event) {
				this.removeFromParent();
			}.bind(this)
		}, this);
	}
});
