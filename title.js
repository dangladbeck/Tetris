function titleScreen()
{
	// variables
	var text1 = new glowText("Click to Start", 180, 175, 1);

	// public methods
	this.update = function()
	{
		
	}
	
	this.draw = function()
	{
		// bg
		game.ctx.drawImage(game.imgBG, 0, 0);
		game.ctx.drawImage(game.imgBG, 189, 0);
		game.ctx.drawImage(game.imgBG, 378, 0);
		
		// logo
		game.ctx.drawImage(game.imgUI, 0,0,236,162, 157,50,236,162);
		// controls
		game.ctx.drawImage(game.imgUI, 788,0,146,114, 10,270,146,114);
		
		game.ctx.textAlign = "left";
		text1.draw();
		
	}
	
	this.onClick = function(X, Y)
	{
		changeScreen("game");
	}
	
	this.onKeyDown = function(Key)
	{
		
	}
	
	this.onKeyUp = function(Key)
	{
		
	}
}