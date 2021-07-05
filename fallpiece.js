function FallPiece(Type)
{
	this.style = Type;
	var rot = 0;
	
	this.blocks = [];
	this.blocks[0] = new Block();
	this.blocks[1] = new Block();
	this.blocks[2] = new Block();
	this.blocks[3] = new Block();
	
	switch (this.style)
	{
		case 0: // linha
			this.blocks[0] = new Block(4,0,"#00CCFF");
			this.blocks[1] = new Block(5,0,"#00CCFF");
			this.blocks[2] = new Block(6,0,"#00CCFF");
			this.blocks[3] = new Block(7,0,"#00CCFF");
			break;
		case 1: // T
			this.blocks[0] = new Block(4,0,"#9933FF");
			this.blocks[1] = new Block(5,0,"#9933FF");
			this.blocks[2] = new Block(6,0,"#9933FF");
			this.blocks[3] = new Block(5,1,"#9933FF");
			break;
		case 2: // L invertido
			this.blocks[0] = new Block(4,1,"#0000FF");
			this.blocks[1] = new Block(5,1,"#0000FF");
			this.blocks[2] = new Block(6,1,"#0000FF");
			this.blocks[3] = new Block(4,0,"#0000FF");
			break;
		case 3: // L
			this.blocks[0] = new Block(4,1,"#FF8800");
			this.blocks[1] = new Block(5,1,"#FF8800");
			this.blocks[2] = new Block(6,1,"#FF8800");
			this.blocks[3] = new Block(6,0,"#FF8800");
			break;
		case 4:  // S
			this.blocks[0] = new Block(5,0,"#00FF00");
			this.blocks[1] = new Block(6,0,"#00FF00");
			this.blocks[2] = new Block(4,1,"#00FF00");
			this.blocks[3] = new Block(5,1,"#00FF00");
			break;
		case 5:  // Z
			this.blocks[0] = new Block(4,0,"#FF0000");
			this.blocks[1] = new Block(5,0,"#FF0000");
			this.blocks[2] = new Block(5,1,"#FF0000");
			this.blocks[3] = new Block(6,1,"#FF0000");
			break;
		case 6: // quadrado
			this.blocks[0] = new Block(5,0,"#FFFF00");
			this.blocks[1] = new Block(6,0,"#FFFF00");
			this.blocks[2] = new Block(5,1,"#FFFF00");
			this.blocks[3] = new Block(6,1,"#FFFF00");
			break;
	}
	
	this.landed = function(grid)
	{
		var landed = false;
			
		for (var i = 0; i < 4; i++)
		{
			// colisão com o fundo
			if (this.blocks[i].row == 19)
			{
				landed = true;
				break;
			}
			// colisão com outro bloco abaixo
			if (grid[this.blocks[i].row + 1][this.blocks[i].col] == 1)
			{
				landed = true;
				break;
			}
			
		}
		
		return landed;
	}
	
	this.checkMove = function(grid, dir)
	{
		var i;
		var b;
		var side = false;
		
		// Para o lado esquerdo
		if (dir == -1)
		{
			for (i = 0; i < 4; i++)
			{
				b = this.blocks[i];
				side = (b.col == 0) || (grid[b.row][b.col - 1] == 1);
				if (side) break;
			}
			// se não bate em ninguém
			if (!side) this.move(dir);				
		}
		// Para o lado direito
		else if (dir == 1)
		{
			for (i = 0; i < 4; i++)
			{
				b = this.blocks[i];
				side = (b.col == 11) || (grid[b.row][b.col + 1] == 1);
				if (side) break;
			}
			// se não bate em ninguém
			if (!side) this.move(dir);				
		}
	}
	
	this.move = function(dir)
	{
		for (var i = 0; i < 4; i++)
		{
			this.blocks[i].col += dir;			
		}
	}
	
	this.rotatePiece = function(grid, dir)
	{
		var side = false;
		rot += dir;
		switch (this.style)
		{
			case 0: // linha
				if (Math.abs(rot) % 2 == 0)
				{
					this.blocks[0].col -= 2;
					this.blocks[0].row = this.blocks[2].row;
					this.blocks[1].col -= 1;
					this.blocks[1].row = this.blocks[2].row;
					this.blocks[3].col += 1; 
					this.blocks[3].row = this.blocks[2].row;
				}
				else
				{
					this.blocks[0].col = this.blocks[2].col;
					this.blocks[0].row -= 2;
					this.blocks[1].col = this.blocks[2].col;
					this.blocks[1].row -= 1;
					this.blocks[3].col = this.blocks[2].col;
					this.blocks[3].row += 1;
				}
				break;
			case 1:  // T
				if (Math.abs(rot) % 4 == 0)
				{
					this.blocks[0].col = this.blocks[1].col - 1;
					this.blocks[0].row = this.blocks[1].row;
					this.blocks[2].col = this.blocks[1].col + 1;
					this.blocks[2].row = this.blocks[1].row;
					this.blocks[3].col = this.blocks[1].col;
					this.blocks[3].row = this.blocks[1].row + 1;
				}
				else if (Math.abs(rot) % 4 == 1)
				{
					this.blocks[0].col = this.blocks[1].col;
					this.blocks[0].row = this.blocks[1].row - 1;
					this.blocks[2].col = this.blocks[1].col;
					this.blocks[2].row = this.blocks[1].row + 1;
					this.blocks[3].col = this.blocks[1].col - 1;
					this.blocks[3].row = this.blocks[1].row;
				}
				else if (Math.abs(rot) % 4 == 2)
				{
					this.blocks[0].col = this.blocks[1].col + 1;
					this.blocks[0].row = this.blocks[1].row;
					this.blocks[2].col = this.blocks[1].col - 1;
					this.blocks[2].row = this.blocks[1].row;
					this.blocks[3].col = this.blocks[1].col;
					this.blocks[3].row = this.blocks[1].row - 1;
				}
				else if (Math.abs(rot) % 4 == 3)
				{
					this.blocks[0].col = this.blocks[1].col;
					this.blocks[0].row = this.blocks[1].row + 1;
					this.blocks[2].col = this.blocks[1].col;
					this.blocks[2].row = this.blocks[1].row - 1;
					this.blocks[3].col = this.blocks[1].col + 1;
					this.blocks[3].row = this.blocks[1].row;
				}
				break;
			case 2:  // L invertido
				if (Math.abs(rot) % 4 == 0)
				{
					this.blocks[0].col = this.blocks[1].col - 1;
					this.blocks[0].row = this.blocks[1].row;
					this.blocks[2].col = this.blocks[1].col + 1;
					this.blocks[2].row = this.blocks[1].row;
					this.blocks[3].col = this.blocks[1].col - 1;
					this.blocks[3].row = this.blocks[1].row - 1;
				}
				else if (Math.abs(rot) % 4 == 1)
				{
					this.blocks[0].col = this.blocks[1].col;
					this.blocks[0].row = this.blocks[1].row - 1;
					this.blocks[2].col = this.blocks[1].col;
					this.blocks[2].row = this.blocks[1].row + 1;
					this.blocks[3].col = this.blocks[1].col + 1;
					this.blocks[3].row = this.blocks[1].row - 1;
				}
				else if (Math.abs(rot) % 4 == 2)
				{
					this.blocks[0].col = this.blocks[1].col + 1;
					this.blocks[0].row = this.blocks[1].row;
					this.blocks[2].col = this.blocks[1].col - 1;
					this.blocks[2].row = this.blocks[1].row;
					this.blocks[3].col = this.blocks[1].col + 1;
					this.blocks[3].row = this.blocks[1].row + 1;
				}
				else if (Math.abs(rot) % 4 == 3)
				{
					this.blocks[0].col = this.blocks[1].col;
					this.blocks[0].row = this.blocks[1].row + 1;
					this.blocks[2].col = this.blocks[1].col;
					this.blocks[2].row = this.blocks[1].row - 1;
					this.blocks[3].col = this.blocks[1].col - 1;
					this.blocks[3].row = this.blocks[1].row + 1;
				}
				break;
			case 3:  // L
				if (Math.abs(rot) % 4 == 0)
				{
					this.blocks[0].col = this.blocks[1].col - 1;
					this.blocks[0].row = this.blocks[1].row;
					this.blocks[2].col = this.blocks[1].col + 1;
					this.blocks[2].row = this.blocks[1].row;
					this.blocks[3].col = this.blocks[1].col + 1;
					this.blocks[3].row = this.blocks[1].row - 1;
				}
				else if (Math.abs(rot) % 4 == 1)
				{
					this.blocks[0].col = this.blocks[1].col;
					this.blocks[0].row = this.blocks[1].row + 1;
					this.blocks[2].col = this.blocks[1].col;
					this.blocks[2].row = this.blocks[1].row - 1;
					this.blocks[3].col = this.blocks[1].col - 1;
					this.blocks[3].row = this.blocks[1].row - 1;
				}
				else if (Math.abs(rot) % 4 == 2)
				{
					this.blocks[0].col = this.blocks[1].col + 1;
					this.blocks[0].row = this.blocks[1].row;
					this.blocks[2].col = this.blocks[1].col - 1;
					this.blocks[2].row = this.blocks[1].row;
					this.blocks[3].col = this.blocks[1].col - 1;
					this.blocks[3].row = this.blocks[1].row + 1;
				}
				else if (Math.abs(rot) % 4 == 3)
				{
					this.blocks[0].col = this.blocks[1].col;
					this.blocks[0].row = this.blocks[1].row - 1;
					this.blocks[2].col = this.blocks[1].col;
					this.blocks[2].row = this.blocks[1].row + 1;
					this.blocks[3].col = this.blocks[1].col + 1;
					this.blocks[3].row = this.blocks[1].row + 1;
				}
				break;
			case 4: // S
				if (Math.abs(rot) % 2 == 0)
				{
					this.blocks[0].col = this.blocks[3].col;
					this.blocks[0].row = this.blocks[3].row - 1;
					this.blocks[1].col = this.blocks[3].col + 1;
					this.blocks[1].row = this.blocks[3].row - 1;
					this.blocks[2].col = this.blocks[3].col - 1;
					this.blocks[2].row = this.blocks[3].row;
				}
				else
				{
					this.blocks[0].col = this.blocks[3].col - 1;
					this.blocks[0].row = this.blocks[3].row;
					this.blocks[1].col = this.blocks[3].col - 1;
					this.blocks[1].row = this.blocks[3].row - 1;
					this.blocks[2].col = this.blocks[3].col;
					this.blocks[2].row = this.blocks[3].row + 1;
				}
				break;
			case 5: // Z
				if (Math.abs(rot) % 2 == 0)
				{
					this.blocks[0].col = this.blocks[2].col - 1;
					this.blocks[0].row = this.blocks[2].row - 1;
					this.blocks[1].col = this.blocks[2].col;
					this.blocks[1].row = this.blocks[2].row - 1;
					this.blocks[3].col = this.blocks[2].col + 1;
					this.blocks[3].row = this.blocks[2].row;
				}
				else
				{
					this.blocks[0].col = this.blocks[2].col + 1;
					this.blocks[0].row = this.blocks[2].row - 1;
					this.blocks[1].col = this.blocks[2].col + 1;
					this.blocks[1].row = this.blocks[2].row;
					this.blocks[3].col = this.blocks[2].col;
					this.blocks[3].row = this.blocks[2].row + 1;
				}
				break;
		}
	
		for (var i = 0; i < 4; i++)
		{
			var b = this.blocks[i];
			side = (b.col < 0) || (b.col > 11) || (b.row < 0) || (b.row > 19) || (grid[b.row][b.col] == 1);
			if (side) break;
		}
		if (side)
		{
			this.rotatePiece(grid, dir * -1);
		}
	}
	
	this.update = function()
	{
		for (var i = 0; i < 4; i++)
		{
			this.blocks[i].fall();
		}
	}
	
	this.draw = function()
	{
		for (var i = 0; i < 4; i++)
		{
			this.blocks[i].draw();
		}
	}
	
}
