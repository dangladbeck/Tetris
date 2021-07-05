function GameOverBanner()
{
	var stage = 0;
	var x = -550;
	var h = 2;
	
	this.update = function()
	{
		if (stage == 0)
		{
			x += 27.5;
			if (x >= 0)
			{
				x = 0;
				stage = 1;	
			}
		}
		else if (stage == 1)
		{
			h += 7.4;
			if (h >= 150)
			{
				h = 150;
				stage = 2;	
			}
		}
	}
	
	this.draw = function()
	{
		if (stage == 0)
		{
			game.ctx.drawImage(game.imgUI, 237,74,550,2, x,199,550,2);
		}
		else if (stage == 1)
		{
			game.ctx.drawImage(game.imgUI, 237,(150-h)/2,550,h, 0,(400-h)/2,550,h);
		}
		else if (stage == 2)
		{
			game.ctx.drawImage(game.imgUI, 237,0,550,150, 0,125,550,150);
		}
	}
	
}