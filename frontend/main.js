var game;
var
	Main = function () {},
	gameSettings = {
		gameHeight: 600,
		gameWidth: 800,
		scaleRatio: 1,
		xOffset: 0,
		yOffset: 0
	};

window.onload = function(){
	// get user's window width and height
	//var windowWidth = window.innerWidth;
	//var windowHeight = window.innerHeight;
	//var ratio = windowWidth / windowHeight;
	//// resize accordingly
	//if (ratio > gameSettings.gameWidth / gameSettings.gameHeight){
	//	newWidth = gameSettings.gameHeight * ratio;
	//	gameSettings.xOffset = newWidth - gameSettings.gameWidth;
	//	gameSettings.gameWidth = newWidth;
	//}
	//if (ratio < gameSettings.gameWidth / gameSettings.gameHeight){
	//	newHeight = gameSettings.gameWidth / ratio;
	//	gameSettings.yOffset = newHeight - gameSettings.gameHeight;
	//	gameSettings.gameHeight = newHeight;
	//}
	//var scaleRatio = windowWidth / gameSettings.gameWidth;
	//scaleRatio = (Math.floor(scaleRatio*10))/10;
	//gameSettings.scaleRatio = scaleRatio;
	game = new Phaser.Game(gameSettings.gameWidth, gameSettings.gameHeight, Phaser.AUTO, '');
	game.state.add('Main', Main);
	game.state.start('Main');
};

Main.prototype = {

	preload: function () {
		//game.load.image('brand',    './gameResources/assets/logo.png');
		game.load.script('splash',  './states/splash.js');
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.refresh();
	},

	create: function () {
		game.state.add('Splash', Splash);
		game.state.start('Splash');
	}

};