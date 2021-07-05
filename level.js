function gameScreen()
{
	// variables
	var txtlevel = new glowText("Level",26,93,1);
	var numlevel = new glowText("1",136,135,2);
	var txtgoal = new glowText("Goal",26,193,1);
	var numgoal = new glowText("10",136,235,2);
	var txtscore = new glowText("Score",26,293,1);
	var numscore = new glowText("0",136,335,2);
	var txtnext = new glowText("Next",410,93,1);
	var startTimer = new startCounter(this);
	
	var level = 1;
	var goal = 10;
	var score = 0;
	var mainGrid = [];
	var gridBlocks = [];
	var fallPiece = null;
	var nextBlocks = null;
	var timer = 0;
	var gameOver = false;
	var gameOverBanner = new GameOverBanner();
	
	function AddFallPiece()
	{
		fallPiece = new FallPiece(nextBlocks.pieces[0].style);
	}
	
	
	this.startGame = function()
	{
		startTimer = null;
		for (var n = 0; n < 20; n++)
		{
			mainGrid[n] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		}
		gridblocks = [];
		nextBlocks = new NextBlocks();
		AddFallPiece();
		nextBlocks.update();
	}
	
	function updatePiece()
	{
		if (fallPiece.landed(mainGrid))
		{
			// check for game over
			if (fallPiece.blocks[0].row <= 0)
			{
				gameOver = true;
			}
			
			// transfere os blocos que caíram para o grid
			for (var i = 0; i < 4; i++)
			{
				mainGrid[fallPiece.blocks[i].row][fallPiece.blocks[i].col] = 1;
				gridBlocks.push(fallPiece.blocks[i]);
			}
			
			CheckFullLine();
			
			
			AddFallPiece();
			nextBlocks.update();
		}
		else
		{
			fallPiece.update();
		}
	}
	
	function CheckFullLine()
	{
		for (var i = 0; i < 20; i++)
		{
			var sum = 0;
			for (var j = 0; j < 12; j++)
			{
				sum += mainGrid[i][j];
			}
			if (sum == 12) // linha completa - remover
			{
				var n = 0;
				while (n < gridBlocks.length)
				{
					if (gridBlocks[n].row == i)
					{
						//removeChild(gridBlocks[n]);
						gridBlocks.splice(n, 1);
					}
					else if (gridBlocks[n].row < i)
					{
						gridBlocks[n].row++;
						//gridBlocks[n].y += 16;
						n++;
					}
					else n++;
				}
				mainGrid.splice(i, 1);
				mainGrid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
				score += 100;
				numscore.setText(score);
				goal--;
				numgoal.setText(goal);
				if (goal == 0)
				{
					goal = 10;
					numgoal.setText(goal);
					level++;
					numlevel.setText(level);
				}
			}
		}
	}
	
	
	// public methods
	this.update = function()
	{
		if (startTimer != null) startTimer.update();
		else if (!gameOver)
		{
			timer++;
			if (timer >= 60 - (level - 1)*3)
			{
				timer = 0;
				updatePiece();
			}
		}
		else // Game Over
		{
			gameOverBanner.update();
		}
	}
	
	this.draw = function()
	{
		// bg
		game.ctx.drawImage(game.imgBG, 0, 0);
		game.ctx.drawImage(game.imgBG, 189, 0);
		game.ctx.drawImage(game.imgBG, 378, 0);
		
		game.ctx.strokeStyle = "#003399";
		game.ctx.lineWidth = 8;
		game.ctx.strokeRect(15,52,134,298);  // left frame
		game.ctx.strokeRect(400,52,134,298); // right frame
		game.ctx.fillStyle = "#000000";
		game.ctx.fillRect(168,38,214,350);   // middle board
		game.ctx.strokeRect(168,38,214,350);
		game.ctx.fillStyle = "#333333";
		for (var row = 0; row < 12; row++)
		{
			for (var col = 0; col < 20; col++)
			{
				game.ctx.fillRect(row * 17 + 174, col * 17 + 44, 15, 15);	
			}
		}
		
		game.ctx.textAlign = "left";
		txtlevel.draw();
		txtgoal.draw();
		txtscore.draw();
		txtnext.draw();
		game.ctx.textAlign = "right";
		numlevel.draw();
		numgoal.draw();
		numscore.draw();
		
		// Start Counter
		if (startTimer != null) startTimer.draw();
		
		
		// Next Blocks
		if (nextBlocks != null)
		{
			nextBlocks.draw();	
			
			for (var i = 0; i < gridBlocks.length; i++)
			{
				gridBlocks[i].draw();	
			}
			
			fallPiece.draw();
		}
		
		if (gameOver)
		{
			gameOverBanner.draw();
		}
		
		
        
	}
	
	this.onClick = function(clickX, clickY)
	{
		if (gameOver)
		{
			changeScreen("title");	
		}
	}
	
	this.onKeyDown = function(Key)
	{
		if (!gameOver && fallPiece != null)
		{
			if (Key == 37) // left
			{
				fallPiece.checkMove(mainGrid, -1);
			}
			else if (Key == 39) // right
			{
				fallPiece.checkMove(mainGrid, 1);
			}
			else if (Key == 38) // up
			{
				fallPiece.rotatePiece(mainGrid, 1);
			}
			else if (Key == 17) // left CTRL
			{
				fallPiece.rotatePiece(mainGrid, -1);
			}
			else if (Key == 40) // down
			{
				score += 1;
				numscore.setText(score);
				updatePiece();
			}
		}
	}
	
	this.onKeyUp = function(Key)
	{
		
	}
}
