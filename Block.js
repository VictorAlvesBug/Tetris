class Block
{
	constructor(i,j,status)
	{
		//SETS THE BLOCK DIMENTION
		this.size = 50;
		//SETS THE BLOCK INDEXES
		this.i = i;
		this.j = j;
		//SETS THE BLOCK POSITIONS
		this.x = this.size/2 + i*this.size;
		this.y = - 2*this.size + this.size/2 + j*this.size;
		//SETS THE INITIAL BLOCK COLOR AND STATUS
		this.color = color(0);
		this.status = status; //(NONE, MOVING, FIXED)
	}

	//SET THE COLOR OF THE BLOCK
	setColor(r,g,b)
	{
		this.color = color(r,g,b);
	}

	//CHECK IF THE BLOCK CAN MOVE IN THIS DIRECTION
	//THIS FUNCTION DON'T MOVE ANYTHING,
	//ONLY CHECK IF THE MOVIMENT IS POSSIBLE
	//ACTUALLY, NO BLOCK MOVES, THEY ONLY CHANGE IT'S STATUS
	canMove(direction)
	{
		if(this.status == MOVING)
		{
			//THE BLOCK CAN ONLY MOVE IN A DIRECTION 
			//WHERE ARE EMPTY BLOCKS TO FILL
			switch(direction)
			{
				case DOWN:
					if(this.j+1 < blocks[0].length)
					{
						if(blocks[this.i][this.j+1].status != FIXED)
						{
							return true;
						}
					}
					break;

				case LEFT:
					if(this.i-1 >= 0)
					{
						if(blocks[this.i-1][this.j].status != FIXED)
						{
							return true;
						}
					}
					break;

				case RIGHT:
					if(this.i+1 < blocks.length)
					{
						if(blocks[this.i+1][this.j].status != FIXED)
						{
							return true;
						}
					}
					break;
			}
		}
		
		//IF CAN'T MOVE TO THIS DIRECTION, RETURN FALSE
		return false;
	}

	//SHOW THE BLOCK
	show()
	{
		//RECTANGLES ARE SETTED BY THE CENTER POSITION
		rectMode(CENTER);
		//GRAY BORDER
		stroke(40);
		//1 PIXEL OF BORDER
		strokeWeight(1);

		//EMPTY BLOCKS ARE BLACK
		if(this.status == NONE)
		{
			fill(0);
			rect(this.x, this.y, this.size, this.size);
		}
		//FIXED AND MOVING BLOCK ARE COLORFUL
		else if(this.status == FIXED || this.status == MOVING)
		{
			//WITHOUT BORDER
			noStroke();

			////DRAWING THE BLOCK SKIN
			//ONE TRIANGLE TOP LEFT
			//ONE TRIANGLE BOTTOM RIGHT
			//ONE SQUARE ABOVE THE TRIANGLES 

			//IT'S COLOR, BUT LIGHTER
			fill(this.color.levels[0], this.color.levels[1], this.color.levels[2]);
			triangle(this.x - this.size/2, this.y - this.size/2,
					this.x + this.size/2, this.y - this.size/2,
					this.x - this.size/2, this.y + this.size/2);

			//IT'S COLOR, BUT DARKER
			fill(this.color.levels[0]/3, this.color.levels[1]/3, this.color.levels[2]/3);
			triangle(this.x + this.size/2, this.y + this.size/2,
					this.x + this.size/2, this.y - this.size/2,
					this.x - this.size/2, this.y + this.size/2);

			//IT'S COLOR
			fill(2*this.color.levels[0]/3, 2*this.color.levels[1]/3, 2*this.color.levels[2]/3);
			rect(this.x, this.y, this.size*0.7, this.size*0.7);
		}

	}
}