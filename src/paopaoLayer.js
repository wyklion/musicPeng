//随机值
var paopaoLevel = [
	[
		[1,1,2,2,2],
		[1,1,1,2,2],
		[1,2,2,1,2],
		[2,1,2,1,2],
		[2,1,1,1,2],
		[2,2,1,1,2],
	],
	[
		[1,1,1,2,1,2],
		[1,1,2,2,1,2],
		[1,1,1,2,1,2],
		[1,2,1,2,1,1],
		[1,2,2,1,1,2],
		[1,2,2,2,1,1],
		[2,2,1,1,1,2],
		[2,2,2,1,1,2],
		[2,1,2,2,1,1],
		[2,1,2,2,1,2],
	],
	[
		[1,1,2,2,1,2,1],
		[1,1,2,1,1,2,2],
		[1,1,2,1,2,2,2],
		[1,1,2,2,1,1,2],
		[1,2,1,2,1,1,2],
		[1,2,2,2,1,1,2],
		[1,2,1,2,1,2,2],
		[2,1,2,2,1,1,2],
		[2,1,1,2,1,1,2],
		[2,2,1,2,1,1,2],
		[2,2,1,1,2,2,1],
		[2,2,2,1,2,2,1],
	],
	[
		[1,1,1,2,2,1,1,2],
		[1,1,1,1,2,2,1,2],
		[1,2,1,2,1,1,1,2],
		[1,2,2,1,2,2,2,1],
		[2,1,2,2,1,2,1,2],
		[2,1,2,1,1,2,1,2],
		[2,1,2,1,2,2,1,1],
		[2,1,1,1,2,2,2,1],
		[2,2,1,1,2,2,1,2],
		[2,2,2,1,2,2,1,1],
		[2,2,2,1,2,1,1,2],
		[2,2,2,2,1,2,1,1],
		[2,2,2,1,1,2,1,2],
	],
];

var PaopaoLayer = cc.Layer.extend({
	footLayer:null,//脚印层
	paoLayer:null,//显示气泡层
	userLayer:null,//玩家打出气泡层。
	tipLayer:null,//提示层。
	effectLayer:null,//特效层
	dx:70, //泡泡间距
	ppArray:[],
	totalCount:0,
	firstX:0, //第一个泡泡位置
	createIdx:0,//显示到第几个了。
	userIdx:0,//玩家输入第几个。
	inputState:false,//可输入状态
	ctor: function(){
		this._super();

		this.init();
	},

	init:function(){
		this._super();
		
		var bg = new cc.Sprite(res.paopaoBg_png)
		bg.setPosition(0,10);
		this.addChild(bg);
		this.footLayer = new cc.Node();
		this.addChild(this.footLayer);
		this.paoLayer = new cc.Node();
		this.addChild(this.paoLayer);
		this.userLayer = new cc.Node();
		this.addChild(this.userLayer);
		this.tipLayer = new cc.Node();
		this.addChild(this.tipLayer);
		this.effectLayer = new cc.SpriteBatchNode(res.xingxing_png);
		this.addChild(this.effectLayer);
	},
	clear:function(){
		this.footLayer.removeAllChildren();
		this.paoLayer.removeAllChildren();
		this.userLayer.removeAllChildren();
		this.tipLayer.removeAllChildren();
		this.effectLayer.removeAllChildren();
	},
	stop:function(){
		this.unscheduleAllCallbacks();
	},
	showPaopao:function(level){		
		this.createIdx = 0;
		this.userIdx = 0;
		var count = paopaoLevel[level].length;
		var idx = Math.floor(Math.random()*count);
		this.totalCount = paopaoLevel[level][idx].length;
		this.ppArray = [];
		for(var i = 0;i<this.totalCount;i++)
		{
			this.ppArray[i] = paopaoLevel[level][idx][i];
		}
		this.firstX = -this.dx*(this.totalCount-1)/2;
		//cc.log("random,count,array:",idx,this.totalCount,this.ppArray);

		//显示所有泡泡脚印
		this.footLayer.removeAllChildren();
		for(var i = 0; i < this.totalCount; i++)
		{
			var foot = new cc.Sprite(res.paoFoot_png);
			var x = this.firstX + i*this.dx;
			foot.setPosition(x,0);
			foot.setScale(0.8);
			this.footLayer.addChild(foot);
		}
		
		//逐一显示泡泡
		var interval = 1/this.totalCount;
		if(this.totalCount <= 5){
			interval = 0.3;
		}
		else if(this.totalCount <= 6){
			interval = 0.25;
		}
		else
			interval = 0.25;
		
		this.schedule(this.showNextPao, interval, this.totalCount-1);
	},

	getPao:function(type,idx){
		var picName;
		if(type == 1){ //猫
			picName = res.paoRed_png;
		}
		else{
			picName = res.paoBlue_png;
		}
		var pao = new cc.Sprite(picName);
		var x = this.firstX + idx*this.dx;
		pao.setPosition(x,0);
		return pao;
	},
	showNextPao:function(){
		var paoType = this.ppArray[this.createIdx];
		var pao = this.getPao(paoType,this.createIdx)
		this.paoLayer.addChild(pao,0,this.createIdx);
		pao.runAction(cc.sequence(cc.scaleTo(0.1,1.1),cc.scaleTo(0.1,1)));

		if(this.parent.type == 1){
			this.parent.spineDog.setAnimation(0, "cangge", false, 1);
			this.parent.spineDog.addAnimation(0, "daiji", true);
			if(paoType==1)
				playEffect(res.dog_cookie_mp3);
			else
				playEffect(res.dog_pong_mp3);	
		}
		else{
			this.parent.spineCat.setAnimation(0, "cangge", false, 1);
			this.parent.spineCat.addAnimation(0, "daiji", true);
			if(paoType==1)
				playEffect(res.cat_cookie_mp3);
			else
				playEffect(res.cat_pong_mp3);		
		}
		this.createIdx = this.createIdx + 1;
		if(this.createIdx == this.totalCount)
			this.scheduleOnce(this.finishShow, 0.2);
	},
	finishShow:function(){
		var pps = this.paoLayer.getChildren();
		for(i = 0; i<pps.length; i++)
		{
			var pp = pps[i];
			if(i==0){
				pp.runAction(cc.sequence(
						cc.scaleTo(0.5,0),
						cc.callFunc(function(){
							this.paoLayer.setVisible(false);
							this.paoLayer.removeAllChildren();
							this.paoLayer.setVisible(true);
							this.parent.playerTurn();
							this.inputState = true;
						},this)
				));
			}
			else{
				var curP = pp;
				pp.runAction(cc.scaleTo(0.5,0));
			}
		}
	},
	tip:function(){
		this.tipLayer.removeAllChildren();
		for(var i = 0; i < this.ppArray.length; i++)
		{
			var paoType = this.ppArray[i];
			var pao = this.getPao(paoType,i)
			this.tipLayer.addChild(pao);
		}
		var that = this;
		that.tipLayer.setVisible(true);
		this.tipLayer.runAction(cc.sequence(
				cc.delayTime(0.6),
				cc.callFunc(function(){
					that.tipLayer.setVisible(false);
				}),
				cc.delayTime(0.6),
				cc.callFunc(function(){
					that.tipLayer.setVisible(true);
				}),
				cc.delayTime(0.6),
				cc.callFunc(function(){
					that.tipLayer.setVisible(false);
					that.tipLayer.removeAllChildren();
				})));
	},
	stopTip:function(){
		this.tipLayer.removeAllChildren();
	},
	sendTempo:function(type){
		if(!this.inputState) return;
		var pao = this.getPao(type,this.userIdx)
		this.userLayer.addChild(pao);
		pao.runAction(cc.sequence(cc.scaleTo(0.1,1.1),cc.scaleTo(0.1,1)));
		var stand = this.ppArray[this.userIdx];
		if(type == stand){
			this.parent.bingoOneTempo();
			this.userIdx = this.userIdx + 1;
			if(this.userIdx == this.totalCount){
				this.finishRow();
			}
			else
			{
				if(type == 1)
					this.parent.setCatAnimation("cangge2");
				else
					this.parent.setCatAnimation("cangge");
			}
		}
		else{
			this.missTempo(pao);
		}
	},
	missTempo:function(pao){
		this.inputState = false;
		this.parent.enableButton(false);
		playEffect(res.miss_mp3);
		this.parent.showWord("miss");
		this.parent.setCatAnimation("shangxin");
		pao.runAction(cc.sequence(
				cc.delayTime(0.2),
				cc.repeat(cc.sequence(cc.rotateBy(0.1,30),cc.rotateBy(0.1,-30)), 3),
				cc.callFunc(function(){
					//var pps = this.userLayer.getChildren();
					//for(i = 0; i<pps.length; i++)
					//	pps[i].setVisible(false);							
					this.userLayer.removeAllChildren();
					this.parent.wrongTempo();
				},this)
		));		
	},
	finishRow:function(){
		this.inputState = false;
		this.parent.enableButton(false);
		if(this.parent.multiple == 2){
			playEffect(res.effectGood_mp3);
			this.parent.showWord("good");
		}
		else if(this.parent.multiple == 4){
			playEffect(res.effectGreat_mp3);
			this.parent.showWord("great");
		}
		else if(this.parent.multiple == 8){
			playEffect(res.effectPerfect_mp3);
			this.parent.showWord("perfect");
		}
		this.parent.setCatAnimation("gaoxing");
		//一条光效
		var pps = this.userLayer.getChildren();
		var le = new cc.Sprite("#lineEffect.png");
		le.setScale(0);
		this.addChild(le,1);
		le.runAction(cc.sequence(cc.scaleTo(0.2, 2.2*pps.length, 1),
				cc.fadeOut(0.6),
				cc.callFunc(function(){
					le.removeFromParent();
				},this)));
		/*
		for(i = 0; i<pps.length; i++)
		{
			var pp = pps[i];
			var s1 = new cc.Sprite("#pointEffect.png");
			s1.setPosition(pp.getPosition());
			s1.setScale(0);
			this.addChild(s1,2);
			s1.runAction(cc.sequence(cc.scaleTo(0.2, 1),
					cc.fadeOut(0.5),
					cc.callFunc(function(){
						s1.removeFromParent();
					},this)));
		}*/
		//消失效果
		this.scheduleOnce(this.finishRow2, 0.2);		
	},
	finishRow2:function(){
		this.scheduleOnce(function(){
			this.parent.finishOneRow()
		}, 0.6);
		var pps = this.userLayer.getChildren();
		for(i = 0; i<pps.length; i++)
		{
			var pp = pps[i];
			/*
			s1.setScale(2);
			this.effectLayer.addChild(s1);
			var animFrames = [];
			var str = "";
			var frame;
			var idx = "x"+Math.ceil(Math.random()*4)+"_";
			for (var j = 1; j < 6; j++) {
				str = idx + j + ".png";
				frame = cc.spriteFrameCache.getSpriteFrame(str);
				animFrames.push(frame);
			}
			var animation = new cc.Animation(animFrames, 0.08);
			var that = this;
			if(i == 0)
				s1.runAction(cc.sequence(cc.animate(animation),
						cc.callFunc(function(){
							that.effectLayer.removeAllChildren();
						})));
			else
				s1.runAction(cc.animate(animation));*/
			
			//向下散落
			var pt = pp.getPosition();
			var dx = -100+Math.random()*200;
			if(i==0){
				pp.runAction(cc.sequence(
						cc.spawn(
							cc.moveTo(1,cc.p(pt.x+dx,pt.y-500)).easing(cc.easeInOut(2.0)),
							cc.fadeOut(1)),
						cc.callFunc(function(){
							//this.parent.finishOneRow();
							this.userLayer.removeAllChildren();
						},this)
				));
			}
			else{
				pp.runAction(cc.spawn(
						cc.moveTo(1,cc.p(pt.x+dx,pt.y-500)).easing(cc.easeInOut(2.0)),
						cc.fadeOut(1)));
			}
			/*消失
			if(i==0){
				pp.runAction(cc.sequence(
						cc.scaleTo(0.1, 0),
						cc.delayTime(0.5),
						cc.callFunc(function(){
							this.parent.finishOneRow();
							this.userLayer.removeAllChildren();
						},this)
				));
			}
			else{
				pp.runAction(cc.scaleTo(0.1, 0));
			}*/
		}
	},
});
