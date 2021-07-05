function startCounter(parent)
{
	var timer = 0;
	var text = "";
	
	this.update = function()
	{
		timer++;
		
		if (timer <= 30)
		{
			
		}
		else if (timer <= 90)
		{
			text = "3";
		}
		else if (timer <= 150)
		{
			text = "2";
		}
		else if (timer <= 210)
		{
			text = "1";
		}
		else if (timer <= 270)
		{
			text = "GO";
		}
		
		if (timer >= 270)
		{
			parent.startGame();	
		}
	}
	
	
	this.draw = function()
	{
		game.ctx.textAlign = "center";
		game.ctx.font = "60px Impact";
		game.ctx.shadowColor = "#000000";
		game.ctx.shadowBlur = 8;
		game.ctx.lineWidth = 1;
		for (var n = 1; n <= 50; n++)
		{
			game.ctx.strokeText(text, 275, 190);
		}
		game.ctx.shadowBlur = 0;
		game.ctx.strokeStyle = "#999900";
		game.ctx.lineWidth = 5;
		game.ctx.fillStyle = "#FFFF00";
		
		game.ctx.strokeText(text, 275, 190);
		game.ctx.fillText(text, 275, 190);
	}
}