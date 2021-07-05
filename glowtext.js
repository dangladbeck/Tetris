function glowText(Text, X, Y, type)
{
	var color1;
	var color2;
	var text = Text;
	if (type == 1)
	{
		color1 = "#3399FF";
		color2 = "#FFFFFF";
	}
	else if (type == 2)
	{
		color1 = "#999900";
		color2 = "#FFFF00";
	}
	
	this.setText = function(value)
	{
		text = value;
	}
	
	this.draw = function()
	{
		game.ctx.font = "36px Impact";
		game.ctx.shadowColor = "#000000";
		game.ctx.shadowBlur = 8;
		game.ctx.lineWidth = 1;
		for (var n = 1; n <= 50; n++)
		{
			game.ctx.strokeText(text, X, Y);
		}
		game.ctx.shadowBlur = 0;
		game.ctx.strokeStyle = color1;
		game.ctx.lineWidth = 5;
		game.ctx.strokeText(text, X, Y);
		game.ctx.fillStyle = color2;
		game.ctx.fillText(text, X, Y);
	}

	
}