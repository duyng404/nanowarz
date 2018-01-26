var game;
var
	Main = function () {},
	Util = function () {},
	gameSettings = {
		gameHeight: 600,
		gameWidth: 800,
		scaleRatio: 1.2,
		xOffset: 0,
		yOffset: 0
	};

Util.calculateRatio = function(){
		var res;
		var windowRatio = window.innerWidth / window.innerHeight;
		var gameRatio = gameSettings.gameWidth / gameSettings.gameHeight;
		if (windowRatio > gameRatio){
			res = window.innerHeight / gameSettings.gameHeight;
		} else {
			res = window.innerWidth / gameSettings.gameWidth;
		}
		//res = (Math.floor(res*10))/10;
		return res;
	}

window.onload = function(){
	game = new Phaser.Game(gameSettings.gameWidth, gameSettings.gameHeight, Phaser.AUTO, '');
	game.state.add('Main', Main);
	game.state.start('Main');
};

Main.prototype = {

	preload: function () {
		//game.load.image('brand',    './gameResources/assets/logo.png');
		game.load.script('splash',  './states/splash.js');

		// all the resize shenanigans
		gameSettings.scaleRatio = Util.calculateRatio();
		console.log(gameSettings.scaleRatio);
		window.addEventListener('resize',function(){
			gameSettings.scaleRatio = Util.calculateRatio();
			game.scale.setUserScale(gameSettings.scaleRatio,gameSettings.scaleRatio);
			console.log('RESIZED!!!');
		},true);
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		game.scale.setUserScale(gameSettings.scaleRatio,gameSettings.scaleRatio);
		console.log(gameSettings.scaleRatio);
	},

	create: function () {
		game.state.add('Splash', Splash);
		game.state.start('Splash');
	},
};
