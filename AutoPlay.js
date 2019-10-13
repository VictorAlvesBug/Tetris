//RUN 4 TIMES
//   CHECK ALL POSITIONS
//   MOVE LEFT WHILE IT'S POSSIBLE
//   WHILE CAN GO RIGHT
//      MARK HOW MANY NEIGHBORS WILL BE FIXED
//      MOVE RIGHT
//   
//   MOVE LEFT HALF OF POSIBLE TIMES
//   ROTATE PIECE

function AutoPlay()
{
	scores = [];
	for(let c=0; c<4; c++)
	{
		while(piece.canMove(LEFT))
		{
			piece.move(LEFT);
		}

		number = piece.numberNeighbors();
		scores.push(number);

		while(piece.canMove(RIGHT))
		{
			piece.move(RIGHT);

			number = piece.numberNeighbors();
			scores.push(number);
		}

		piece.move(LEFT);
		piece.move(LEFT);
		piece.move(LEFT);
		if (piece.canRotate())
		{
			piece.rotate();
		}
	}

	let biggestScore = 0;
	let index;
	for(let i=0; i<scores.length; i++)
	{
		if(scores[i] > biggestScore)
		{
			biggestScore = scores[i];
			index = i;
		}
	}

	console.log("biggestScore: "+biggestScore);
	console.log("index: "+index);

	let counter = 0;
	let found = false;
	for(let c=0; c<4; c++)
	{
		while(piece.canMove(LEFT) && !found)
		{
			piece.move(LEFT);
		}

		if(counter == index)
		{
			//BREAK ALL AND MOVE PIECE DOWN
			found = true;
			break;
		}

		number = piece.numberNeighbors();
		//scores.push(number);
		counter++;

		while(piece.canMove(RIGHT) && !found)
		{
			piece.move(RIGHT);

			if(counter == index)
			{
				//BREAK ALL AND MOVE PIECE DOWN
				found = true;
				break;
			}

			number = piece.numberNeighbors();
			//scores.push(number);
			counter++;
		}

		if(found)
		{
			break;
		}

		piece.move(LEFT);
		piece.move(LEFT);
		piece.move(LEFT);
		if (piece.canRotate())
		{
			piece.rotate();
		}
	}

	while(piece.canMove(DOWN))
	{
		piece.move(DOWN);
	}

	piece.becomeFixed();
	piece = new Piece();

}