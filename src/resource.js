var res = {
	//背景图
	bg_png : "res/bg.png",
	timeBar_png : "res/timeBar.png",
	//打包图
	xingxing_png : "res/xingxing.png",
	xingxing_plist : "res/xingxing.plist",
	pics_png : "res/pics.png",
	pics_plist : "res/pics.plist",
	//只用名字
	readyTempo_png : "#ready_tempo.png",
	readyClick_png : "#ready_click.png",
	readyCookie_png : "#ready_cookie.png",
	readyPong_png : "#ready_pong.png",
	buttonCat_png : "#buttonCat.png",
	buttonDog_png : "#buttonDog.png",
	spriteCat_png : "#spriteCat.png",
	spriteDog_png : "#spriteDog.png",
	paopaoBg_png : "#paopaoBg.png",
	paoBlue_png : "#paoBlue.png",
	paoRed_png : "#paoRed.png",
	buttonRetry_png : "#buttonRetry.png",
	buttonShare_png : "#buttonShare.png",
	label_history_png : "#label_history.png",
	label_over_png : "#label_over.png",
	label_result_png : "#label_result.png",
	resultBg_png : "#resultBg.png",
	bestTag_png : "#bestTag.png",
	Arrow_png : "#arrow.png",
	paoFoot_png : "#paoFoot.png",	
	resultFoot_png : "#resultFoot.png",
	//mp3
	/*
	bg_mp3 : "res/sound/bgMusic.ogg",
	cat_cookie_mp3 : "res/sound/cat_cookie.ogg",
	dog_cookie_mp3 : "res/sound/dog_cookie.ogg",
	cat_pong_mp3 : "res/sound/cat_pong.ogg",
	dog_pong_mp3 : "res/sound/dog_pong.ogg",
	effectReady_mp3 : "res/sound/effectReady.ogg",
	effectGo_mp3 : "res/sound/effectGo.ogg",
	effectGood_mp3 : "res/sound/effectGood.ogg",
	effectGreat_mp3 : "res/sound/effectGreat.ogg",
	effectPerfect_mp3 : "res/sound/effectPerfect.ogg",
	resultMusic_mp3 : "res/sound/resultMusic.ogg",
	buttonSound_mp3 : "res/sound/bottonSound.ogg",
	miss_mp3 : "res/sound/miss.ogg",*/
	bg_mp3 : "res/sound/bgMusic.mp3",
	cat_cookie_mp3 : "res/sound/cat_cookie.mp3",
	dog_cookie_mp3 : "res/sound/dog_cookie.mp3",
	cat_pong_mp3 : "res/sound/cat_pong.mp3",
	dog_pong_mp3 : "res/sound/dog_pong.mp3",
	effectReady_mp3 : "res/sound/effectReady.mp3",
	effectGo_mp3 : "res/sound/effectGo.mp3",
	effectGood_mp3 : "res/sound/effectGood.mp3",
	effectGreat_mp3 : "res/sound/effectGreat.mp3",
	effectPerfect_mp3 : "res/sound/effectPerfect.mp3",
	resultMusic_mp3 : "res/sound/resultMusic.mp3",
	buttonSound_mp3 : "res/sound/bottonSound.mp3",
	miss_mp3 : "res/sound/miss.mp3",
	//骨骼动画
	catSpine_atlas : "res/spineCat.atlas",
	spineCat_json : "res/spineCat.json",
	spineCat_png : "res/spineCat.png",
	spineDog_atlas : "res/spineDog.atlas",
	spineDog_json : "res/spineDog.json",
	spineDog_png : "res/spineDog.png",
	//字体
	nowScore_fnt : "res/nowScore.fnt",
	nowScore_png : "res/nowScore.png",
	timeFont_fnt : "res/timeFont.fnt",
	timeFont_png : "res/timeFont.png",	
	result_fnt : "res/resultFont.fnt",
	result_png : "res/resultFont.png",
	high_fnt : "res/highFont.fnt",
	high_png : "res/highFont.png",
};

var g_resources = [];
for (var i in res) {
	if(res[i].charAt(0) != '#')
		g_resources.push(res[i]);
}