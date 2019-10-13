class Piece
{
	constructor(type)
	{
		//SETS A RANDOM TYPE
		this.lotType();

		//IF type ISN'T EMPTY
		if(type)
		{
			//UPDATE this.type
			this.type = type;
		}

		//SET THE PIECE PARTS (BLOCKS)
		//this.parts IS THE PARTS OF THE PIECE
		//FIRST INDEX IS THE PART(0 - 3)
		//SECOND INDEX IS THE PART COORDINATES (0:X - 1:Y)
		//EXAMPLE:
		//this.parts[2][0]
		//2 --> 3° PART (BEGINS AT 0)
		//0 --> X COORDINATE
		switch(this.type)
		{
			case S:
	  			//ORANGE
				this.color = color(255,128,0);
				this.parts = [
				[2,0],
				[1,0],
				[1,1],
				[0,1]
				];
				break;
				
			case Z:
	  			//PURPLE
				this.color = color(128,0,255);
				this.parts = [
				[0,0],
				[1,0],
				[1,1],
				[2,1]
				];
				break;
				
			case L:
	  			//DARK GREEN
				this.color = color(0,255,0);
				this.parts = [
				[0,0],
				[0,1],
				[0,2],
				[1,2]
				];
				break;
				
			case J:
	  			//LIGHT GREEN
				this.color = color(0,128,0);
				this.parts = [
				[1,0],
				[1,1],
				[1,2],
				[0,2]
				];
				break;
				
			case I:
	  			//BLUE
				this.color = color(0,0,255);
				this.parts = [
				[0,0],
				[0,1],
				[0,2],
				[0,3]
				];
				break;
				
			case O:
	  			//YELLOW
				this.color = color(255,255,0);
				this.parts = [
				[0,0],
				[0,1],
				[1,1],
				[1,0]
				];
				break;
				
			case T:
	  			//RED
				this.color = color(255,0,0);
				this.parts = [
				[0,0],
				[0,1],
				[0,2],
				[1,1]
				];
				break;
		}

		//MOVING PIECE TO THE TOP CENTER
		for(let p=0; p<4; p++)
		{
			//CHANGE ONLY THE X COORDINATE OF EACH PART
			this.parts[p][0] += (int)(blocks.length/2 - 2);
		}
	}

	//CHECK IF THE PIECE CAN MOVE IN THIS DIRECTION
	//THIS FUNCTION DON'T MOVE ANYTHING,
	//ONLY CHECK IF THE MOVIMENT IS POSSIBLE
	canMove(direction)
	{
		//TO TURN THE CODE EASIER TO READ (AND TO WRITE)
		let i1 = this.parts[0][0]; // PART 1, X COORDINATE
		let j1 = this.parts[0][1]; // PART 1, Y COORDINATE
		let i2 = this.parts[1][0]; // PART 2, X COORDINATE
		let j2 = this.parts[1][1]; // PART 2, Y COORDINATE
		let i3 = this.parts[2][0]; // PART 3, X COORDINATE
		let j3 = this.parts[2][1]; // PART 3, Y COORDINATE
		let i4 = this.parts[3][0]; // PART 4, X COORDINATE
		let j4 = this.parts[3][1]; // PART 4, Y COORDINATE
		
		//MOVIMENT IS ONLY ALLOWED IF ALL PIECE PARTS
		//CAN MOVE IN THIS DIRECTION
		if(blocks[i1][j1].canMove(direction) &&
		blocks[i2][j2].canMove(direction) &&
		blocks[i3][j3].canMove(direction) &&
		blocks[i4][j4].canMove(direction))
		{
			return true;
		}
		return false;
	}
	
	//"MOVE" THE PIECE IN THIS DIRECTION
	//ACTUALLY IT JUST CHANGE THE PIECES STATUS 
	move(direction)
	{
		//TO TURN THE CODE EASIER TO READ (AND TO WRITE)
		let i1 = this.parts[0][0]; // PART 1, X COORDINATE
		let j1 = this.parts[0][1]; // PART 1, Y COORDINATE
		let i2 = this.parts[1][0]; // PART 2, X COORDINATE
		let j2 = this.parts[1][1]; // PART 2, Y COORDINATE
		let i3 = this.parts[2][0]; // PART 3, X COORDINATE
		let j3 = this.parts[2][1]; // PART 3, Y COORDINATE
		let i4 = this.parts[3][0]; // PART 4, X COORDINATE
		let j4 = this.parts[3][1]; // PART 4, Y COORDINATE

		//CURRENT BLOCKS BECOME EMPTY
		blocks[i1][j1].status = NONE;
		blocks[i2][j2].status = NONE;
		blocks[i3][j3].status = NONE;
		blocks[i4][j4].status = NONE;

		//EACH PART OF THE PIECE MOVES IN THIS DIRECTION
		switch(direction)
		{
			case DOWN:
				for(let i=0; i<4; i++)
				{
					this.parts[i][1]++;
				}
				break;

			case LEFT:
				for(let i=0; i<4; i++)
				{
					this.parts[i][0]--;
				}
				break;

			case RIGHT:
				for(let i=0; i<4; i++)
				{
					this.parts[i][0]++;
				}
				break;
		}

		//PIECE MOVED --> DRAW THE CURRENT PIECE POSITION
		this.show();
	}

	//CHECK IF THE PIECE CAN ROTATE IN THIS DIRECTION
	//(IF THERE ARE EMPTY SPACES TO FILL WHEN ROTATE)
	//THIS FUNCTION DON'T ROTATE ANYTHING,
	//ONLY CHECK IF THE ROTATION IS POSSIBLE
	//ROTATION IS ALWAYS TO RIGHT (-90°)
	canRotate()
	{
		//'O' PIECE CAN'T BE ROTATED
		if(this.type == O)
		{
			return true;
		}

		//TO TURN THE CODE EASIER TO READ (AND TO WRITE)
		let i1 = this.parts[0][0]; // PART 1, X COORDINATE
		let j1 = this.parts[0][1]; // PART 1, Y COORDINATE
		let i2 = this.parts[1][0]; // PART 2, X COORDINATE
		let j2 = this.parts[1][1]; // PART 2, Y COORDINATE
		let i3 = this.parts[2][0]; // PART 3, X COORDINATE
		let j3 = this.parts[2][1]; // PART 3, Y COORDINATE
		let i4 = this.parts[3][0]; // PART 4, X COORDINATE
		let j4 = this.parts[3][1]; // PART 4, Y COORDINATE

		//AVERAGE POINT(CENTER OF THE ROTATION)
		let avgI = i2;
		let avgJ = j2;

		//newI = avgI + (avgJ - currJ);
		//newJ = avgJ - (avgI - currI);

		//ROTATION MATRIX (R(a))
		//
		// | cos(a)   sin(a) |
		// | -sin(a)  cos(a) |

		// newP = R(a) * currP;

		//ROTATION MATRIX (R(a))
		// a = -90°
		//
		// | 0  -1 |
		// | 1   0 |

		// | newI |   | 0  -1 |   | currI |
		// |      | = |       | * |       |
		// | newJ |   | 1   0 |   | currJ |

		// newI = (0*currI) + (-1*currJ);
		// newJ = (1*currI) + (0*currJ);

		// newI = -currJ;
		// newJ = currI;

		// I = newI + avgI;
		// J = newJ + avgJ;

		//EACH PART OF THE PIECE WILL ROTATE
		for(let p=0; p<4; p++)
		{
			// currI = I - avgI;
			// currJ = J - avgJ;
			let currI = this.parts[p][0] - avgI;
			let currJ = this.parts[p][1] - avgJ;

			// newI = -currJ;
			// newJ = currI;
			let newI = -currJ;
			let newJ = currI;

			// I = newI + avgI;
			// J = newJ + avgJ;
			let I = newI + avgI;
			let J = newJ + avgJ;

			//(I,J) IS THE NEW POSITION OF THE PIECE PART

			//IF (I,J) IS OUTSIDE THE BLOCKS RANGE
			//THEN THE ROTATION ISN'T POSSIBLE
			if(I < 0)
			{
				return false;
			}
			else if(I > blocks.length-1)
			{
				return false;
			}

			if(J<0 || J>blocks[0].length-1)
			{
				return false;
			}

			//IF (I,J) BLOCK IS FIXED 
			//THEN THE ROTATION ISN'T POSSIBLE TOO
			if(blocks[I][J].status == FIXED)
			{
				return false;
			}

			//IF NO ONE OF THE PREVIOUS IF'S WAS TRUE
			//THEN THE ROTATION IS POSSIBLE
		}

		return true;
	}

	//THIS FUNCTION DON'T ROTATE ANYTHING,
	//IT ONLY CHANGE THE BLOCKS STATUS VALUE
	//ROTATION IS ALWAYS TO RIGHT (-90°)
	rotate()
	{	
		//THERE IS NO ROTATION TO 'O' PIECES
		if(this.type != O)
		{
			//TO TURN THE CODE EASIER TO READ (AND TO WRITE)
			let i1 = this.parts[0][0]; // PART 1, X COORDINATE
			let j1 = this.parts[0][1]; // PART 1, Y COORDINATE
			let i2 = this.parts[1][0]; // PART 2, X COORDINATE
			let j2 = this.parts[1][1]; // PART 2, Y COORDINATE
			let i3 = this.parts[2][0]; // PART 3, X COORDINATE
			let j3 = this.parts[2][1]; // PART 3, Y COORDINATE
			let i4 = this.parts[3][0]; // PART 4, X COORDINATE
			let j4 = this.parts[3][1]; // PART 4, Y COORDINATE

			//AVERAGE POINT(CENTER OF THE ROTATION)
			let avgI = i2;
			let avgJ = j2;

			//CURRENT BLOCKS BECOME EMPTY
			blocks[i1][j1].status = NONE;
			blocks[i2][j2].status = NONE;
			blocks[i3][j3].status = NONE;
			blocks[i4][j4].status = NONE;

			//newI = avgI + (avgJ - currJ);
			//newJ = avgJ - (avgI - currI);

			//ROTATION MATRIX (R(a))
			//
			// | cos(a)   sin(a) |
			// | -sin(a)  cos(a) |

			// newP = R(a) * currP;

			//ROTATION MATRIX (R(a))
			// a = -90°
			//
			// | 0  -1 |
			// | 1   0 |

			// | newI |   | 0  -1 |   | currI |
			// |      | = |       | * |       |
			// | newJ |   | 1   0 |   | currJ |

			// newI = (0*currI) + (-1*currJ);
			// newJ = (1*currI) + (0*currJ);

			// newI = -currJ;
			// newJ = currI;

			// I = newI + avgI;
			// J = newJ + avgJ;

			//ROTATE EACH PART OF THE PIECE IN (avgI,avgJ) CENTER
			for(let p=0; p<4; p++)
			{
				// currI = I - avgI;
				// currJ = J - avgJ;
				let currI = this.parts[p][0] - avgI;
				let currJ = this.parts[p][1] - avgJ;

				// newI = -currJ;
				// newJ = currI;
				let newI = -currJ;
				let newJ = currI;

				// I = newI + avgI;
				// J = newJ + avgJ;
				this.parts[p][0] = newI + avgI;
				this.parts[p][1] = newJ + avgJ;
			}
		}

		//DRAWS THE PIECE AFTER THE ROTATION
		this.show();
	}

	becomeFixed()
	{
		//TO TURN THE CODE EASIER TO READ (AND TO WRITE)
		let i1 = this.parts[0][0]; // PART 1, X COORDINATE
		let j1 = this.parts[0][1]; // PART 1, Y COORDINATE
		let i2 = this.parts[1][0]; // PART 2, X COORDINATE
		let j2 = this.parts[1][1]; // PART 2, Y COORDINATE
		let i3 = this.parts[2][0]; // PART 3, X COORDINATE
		let j3 = this.parts[2][1]; // PART 3, Y COORDINATE
		let i4 = this.parts[3][0]; // PART 4, X COORDINATE
		let j4 = this.parts[3][1]; // PART 4, Y COORDINATE

		//EACH PIECE PART BECOME FIXED 
		blocks[i1][j1].status = FIXED;
		blocks[i2][j2].status = FIXED;
		blocks[i3][j3].status = FIXED;
		blocks[i4][j4].status = FIXED;
	}

	lotType()
	{
		//LOT AN INTEGER NUMBER BETWEEN 0 AND 7
		// (0, 1, 2, 3, 4, 5, 6)
		// IT WILL NEVER RETURN 7
		this.type = int(random(0, 7));
	}

	findGap()
	{
		let blks = [];

		for(let i=0; i<4; i++)
		{
			blks.push(createVector(this.parts[i][0], this.parts[i][1]));
		}

		//RODA EM CADA BLOCO PRA CONTAR QUANTOS BLOCOS FALTAM
		//PRO PROXIMO FIXO(OU PAREDE)
		//GUARDA A MENOR DAS DISTANCIAS E SIMULA A PECA ATUAL NESSA POSICAO

		let gaps = [0,0,0,0];

		for(let i=0; i<4; i++)
		{
			//gaps ARE THE DISTANCE UNTIL THE NEXT FIXED BLOCK (OR THE BOTTOM WALL)
			gaps[i] = -1;

			let x = blks[i].x;

			for(let y=blks[i].y; y<blocks[0].length; y++)
			{
				if(blocks[x][y].status != FIXED)
				{
					gaps[i]++;
				}
				
			}
		}

		//SMALLEST GAP 
		return min(min(gaps[0] , gaps[1]) , min(gaps[2] , gaps[3]));
		
	}

	//DRAWS THE PIECE BLOCKS
	show()
	{
		//TO TURN THE CODE EASIER TO READ (AND TO WRITE)
		let i1 = this.parts[0][0]; // PART 1, X COORDINATE
		let j1 = this.parts[0][1]; // PART 1, Y COORDINATE
		let i2 = this.parts[1][0]; // PART 2, X COORDINATE
		let j2 = this.parts[1][1]; // PART 2, Y COORDINATE
		let i3 = this.parts[2][0]; // PART 3, X COORDINATE
		let j3 = this.parts[2][1]; // PART 3, Y COORDINATE
		let i4 = this.parts[3][0]; // PART 4, X COORDINATE
		let j4 = this.parts[3][1]; // PART 4, Y COORDINATE

		//CHANGE THE BLOCKS COLOR AND STATUS
		blocks[i1][j1].color = this.color;
		blocks[i1][j1].status = MOVING;

		blocks[i2][j2].color = this.color;
		blocks[i2][j2].status = MOVING;

		blocks[i3][j3].color = this.color;
		blocks[i3][j3].status = MOVING;

		blocks[i4][j4].color = this.color;
		blocks[i4][j4].status = MOVING;
	}

	drawShadow()
	{
		//TO TURN THE CODE EASIER TO READ (AND TO WRITE)
		let i1 = this.parts[0][0]; // PART 1, X COORDINATE
		let j1 = this.parts[0][1]; // PART 1, Y COORDINATE
		let i2 = this.parts[1][0]; // PART 2, X COORDINATE
		let j2 = this.parts[1][1]; // PART 2, Y COORDINATE
		let i3 = this.parts[2][0]; // PART 3, X COORDINATE
		let j3 = this.parts[2][1]; // PART 3, Y COORDINATE
		let i4 = this.parts[3][0]; // PART 4, X COORDINATE
		let j4 = this.parts[3][1]; // PART 4, Y COORDINATE

		let gap = this.findGap();

		this.drawBlockShadow(i1,j1,gap);
		this.drawBlockShadow(i2,j2,gap);
		this.drawBlockShadow(i3,j3,gap);
		this.drawBlockShadow(i4,j4,gap);
	}

	drawBlockShadow(i,j,gap)
	{
		//SETS THE SIZE
		let size = 50;

		//SETS THE BLOCK POSITIONS
		let x = size/2 + i*size;
		let y = - 2*size + size/2 + (j+gap)*size;

		noFill();
		stroke(this.color);
		strokeWeight(6);
		rect(x, y, size*0.8, size*0.8);
	}
}