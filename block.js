function Block(Col, Row, Color)
{
	this.col = Col;
	this.row = Row;
	this.color = Color;
	
	this.fall = function()
	{
		this.row++;	
	}
	
	this.draw = function()
	{
		game.ctx.fillStyle = this.color;
		game.ctx.strokeStyle = "#000000";
		game.ctx.lineWidth = 2;
		
		game.ctx.strokeRect(this.col * 17 + 173, this.row * 17 + 43, 16, 16);
		game.ctx.fillRect(this.col * 17 + 173, this.row * 17 + 43, 16, 16);
		game.ctx.lineWidth = 1;
		game.ctx.strokeRect(this.col * 17 + 173 + 4, this.row * 17 + 43 + 4, 8, 8);
	}
	
}