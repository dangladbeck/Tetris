var game = 
{
	// global variables
	canvas: null,
	ctx: null,
	imgBG: new Image(),
	imgUI: new Image(),
};

var currentScreen;
var resLoaded;

var transition = false;
var fadein = true;
var alpha = 0;

window.onload = function()
{
	// initialize canvas
	game.canvas = document.getElementById("canvas");
	game.canvas.addEventListener("click", onClick, false);
	addEventListener("keydown", onKeyDown, false);
	addEventListener("keyup", onKeyUp, false);
	game.ctx = game.canvas.getContext('2d');
	
	resLoaded = 0;
	
	// Load all resources, in the form:
	game.imgBG.src = "bg.jpg";
	game.imgBG.onload = loadRes;
	game.imgUI.src = "ui.png";
	game.imgUI.onload = loadRes;
	
}

function loadRes()
{
	resLoaded++;	
	if (resLoaded == 2) // if this is the last resource loaded
	{
		run();	
	}
}

function run()
{
	document.getElementById("loadtxt").style.display = "none";
	game.canvas.style.display = "block";
	
	// set game loop - at fixed frame rate
	setInterval(loop, 1000 / 60); // 60 fps
	
	// begin with first screen
	currentScreen = new titleScreen();
}

function loop()
{
	// call update and draw methods
    update();
    draw();
}

function update()
{
	currentScreen.update(); // update screen
	
	if (transition)
	{
		if (fadein)
		{
			alpha += 0.04;
			if (alpha >= 1)
			{
				alpha = 1;
				fadein = false;
				// change screen
				changeS();
			}
		}
		else
		{
			alpha -= 0.08;
			if (alpha <= 0)
			{
				transition = false;
			}
		}
	}
}

function draw()
{
	currentScreen.draw();  // draw current screen
	
	if (transition)
	{
		game.ctx.globalAlpha = alpha;
		game.ctx.fillStyle = "#FFFFFF";
		game.ctx.fillRect(0, 0, 800, 480);
		game.ctx.globalAlpha = 1;
	}
}

function onClick(e)
{
	currentScreen.onClick(e.offsetX, e.offsetY);	
}

function onKeyDown(e)
{
	currentScreen.onKeyDown(e.keyCode);
	e.preventDefault();
}

function onKeyUp(e)
{
	currentScreen.onKeyUp(e.keyCode);
	e.preventDefault();
}

function changeScreen(next)
{
	nextScreen = next;
	fadein = true;
	alpha = 0;
	transition = true;
}

function changeS()
{
	if (nextScreen == "title")
	{
		currentScreen = new titleScreen();
	}
	else if (nextScreen == "game")
	{
		currentScreen = new gameScreen();
	}
}




