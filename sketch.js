let blocks;
let piece;
let delay = 100;
let time = 0;
let count = 0;
let lines = 0;

/////////// CONSTANTS ///////////

//PIECES
const S = 0;
const Z = 1;
const L = 2;
const J = 3;
const I = 4;
const O = 5;
const T = 6;

//DIRECTIONS TO MOVE THE BLOCKS
const DOWN = 0;
const LEFT = 1;
const RIGHT = 2;

//BLOCK TYPES
const NONE = 0;   // EMPTY SPACE
const MOVING = 1; // FALLING PIECE
const FIXED = 2;  // STATIC BLOCKS

function setup()
{
	//SCREEN SIZE
	createCanvas(500, 850);

	//ARRAY OF BLOCKS
	blocks = [];
	for(let i=0; i<width/50; i++)
	{
		blocks[i] = [];

		for(let j=0; j<height/50 + 2; j++)
		{
			//ALL BLOCKS ARE SETTED AS EMPTY SPACES AT FIRST
			blocks[i][j] = new Block(i, j, NONE);
		}		
	}

	//CREATE A PIECE THAT FALLS
	piece = new Piece();
}

function draw()
{
	// GRAY BACKGROUND
	background(64);

	//DURING THE GAME
	if(time >= 0)
	{
		//draw() LOOP WILL RUN 60 TIMES PER SECOND
		frameRate(60);

		//KEY DOWN'S
		//THIS DELAY AVOID A KEY MULTI CLICK
		if(delay>10)
		{
			//TO ROTATE THE PIECE
			if(keyIsDown(UP_ARROW))
			{
				//ROTATION WILL ONLY HAPPEN IF IT'S POSSIBLE
				if(piece.canRotate())
				{
					piece.rotate();
					delay = 0;	
				}
			}
			//TO MOVE THE PIECE TO THE BOTTOM
			else if(keyIsDown(DOWN_ARROW))
			{
				//IF PIECE CAN MOVE DOWN
				if(piece.canMove(DOWN))
				{
					//THEN MOVES IT DOWN WHILE IT'S POSSIBLE
					while(piece.canMove(DOWN))
					{
						piece.move(DOWN);					
					}
				}
				//IF IT CAN'T GO DOWN PIECE BLOCKS BECOME FIXED
				else
				{
					piece.becomeFixed();
					piece = new Piece();
				}
				delay = 0;
			}
			//MOVE TO LEFT
			else if(keyIsDown(LEFT_ARROW))
			{
				//MOVE ONLY IT'S POSSIBLE
				if(piece.canMove(LEFT))
				{
					piece.move(LEFT);
					delay = 0;
				}
				
			}
			//MOVE TO RIGHT
			else if(keyIsDown(RIGHT_ARROW))
			{
				//MOVE ONLY IT'S POSSIBLE
				if(piece.canMove(RIGHT))
				{
					piece.move(RIGHT);
					delay = 0;
				}
			}
		}

		//FRAME RATE IS 60 
		//SO THIS WILL BE TRUE 2 TIME IN A SECOND (60/30 = 2)
		if(time%30 == 0)
		{
			//IF PIECE CAN GO DOWN
			if(piece.canMove(DOWN))
			{
				//IT MOVES ONE BLOCK DOWN
				piece.move(DOWN);
			}
			//IF IT CAN'T GO DOWN
			else
			{
				//PIECE BLOCKS BECOME FIXED
				piece.becomeFixed();
				//AND ANOTHER PIECE IS RELEASED
				piece = new Piece();
			}
		}

		//CHECK IF THERE ARE LINES FILLED
		for(let j=blocks[0].length-1; j>=0; j--)
		{
			//IT RUNS DOWN TO BE SURE THAT
			//IT WILL RUN IN ALL THE LINES
			let lineFill = true;

			//RUN IN EACH BLOCK OF THE LINE
			for(let i=0; i<blocks.length; i++)
			{
				//AND CHECK IF SOMEONE ISN'T FIXED
				if(blocks[i][j].status != FIXED)
				{
					//IF TRUE GO TO THE NEXT LINE (PREVIOUS LINE)
					lineFill = false;

					//GET OFF THE FOR LOOP
					break;
				}
			}

			//IF IT'S TRUE, THE CURRENT LINE IS FILL OF FIXED BLOCKS
			if(lineFill)
			{
				//RUNS IN EACH LINE (BOTTOM TO TOP) TO MOVE THE BLOCKS DOWN
				for(let y=j; y>2; y--)
				{
					for(let x=0; x<blocks.length; x++)
					{
						blocks[x][y].status = blocks[x][y-1].status;
						blocks[x][y].color = blocks[x][y-1].color;
					}
				}

				lines++;
			}	
		}

		//CHECK IF THERE IS FIXED PIECES IN THE TOP LINE (GAME OVER)
		let gameOver = false;
		for(let i=0; i<blocks.length; i++)
		{
			//IF SOME BLOCK IN 5° LINE IS FIXED
			if(blocks[i][4].status == FIXED)
			{
				//THAT IS A GAME OVER
				gameOver = true;
				break;
			}
		}

		if(gameOver)
		{
			//-100 IS A RANDOM VALUE
			time = -100;
			//draw() LOOP WILL RUN 10 TIMES IN A SECOND
			frameRate(10);
		}
		else
		{
			//DRAW THE PIECE
			piece.show();
		}
	}
	//IF GAME OVER
	else
	{
		//COUNT BEGINS AT 0 AND GOES UNTIL THE LAST ROW
		for(let i=0; i<blocks.length; i++)
		{
			//ALL BLOCKS IN THIS ROW BECOME EMPTY
			blocks[i][count].status = NONE;
		}

		//CONTROL THE COUNT PROGRESSION
		if(count < blocks[0].length-1)
		{
			count++
		}
		else
		{
			count = 0;
			time = 0;
			lines = 0;
			gameOver = false;
		}
	}

	//SHOW ALL BLOCKS
	for(let i=0; i<blocks.length; i++)
	{
		for(let j=4; j<blocks[0].length; j++)
		{
			blocks[i][j].show();
		}		
	}

	///piece.drawShadow();

	// SHOWS THE LINES SCORE
	fill(0);
	noStroke();
	textFont("Calibri");
	textSize(90);
	textAlign(CENTER);
	text("LINES: " + lines, width/2, 80);

	delay++;
	time++;
}