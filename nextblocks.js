function NextBlocks()
{
	this.pieces = [];
	
	for (var n = 0; n < 4; n++)
	{
		this.pieces[n] = new FallPiece(Math.floor(Math.random() * 7));
	}
	
	
	this.update = function()
	{	
		this.pieces.shift();
		this.pieces.push(new FallPiece(Math.floor(Math.random() * 7)));
	}
	
	this.draw = function()
	{
		for (var n = 0; n < 4; n++)
		{
			for (var i = 0; i < 4; i++)
			{
				var b = this.pieces[n].blocks[i];
				game.ctx.fillStyle = b.color;
				game.ctx.strokeStyle = "#000000";
				game.ctx.lineWidth = 2;
				
				game.ctx.strokeRect(b.col * 17 + 370, b.row * 17 + n*50 + 120, 16, 16);
				game.ctx.fillRect(b.col * 17 + 370, b.row * 17 + n*50 + 120, 16, 16);
				game.ctx.lineWidth = 1;
				game.ctx.strokeRect(b.col * 17 + 370 + 4, b.row * 17 + n*50 + 120 + 4, 8, 8);
			}
		}
	}
	
}