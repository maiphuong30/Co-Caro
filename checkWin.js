var l_win = [];
var goal = 5;
function WinGame()
{
	var winState = false;
	var Board = GetBoard();
	for (x = 0;x < size;x++)
	{
		for (y = 0;y < size;y++)
		{
			if (Horizontal(x,y,Board) || Vertical(x,y,Board) || Cross1(x,y,Board) || Cross2(x,y,Board))
			{
				var square = document.getElementsByClassName("square");
				for(i = 0;i < l_win.length;i++)
				{
					console.log(l_win[i]);
					square.item(l_win[i]).style.backgroundColor = "#FF0";
				}
				winState = true;
			}
		}
	}
	return winState;
}
// [XXXXX] [OOOOO]
function Horizontal(x,y,Board)
{
	l_win = [];
	if(size == 3) goal = 3;
	var count = 0;
	var player = Board[x][y];
	//console.log(player)
	if (player == 0) return false;
	
	//[Xiiii]
	for (i = x; i < size;i++)
	{
		var p = Board[i][y];
		if (p == player && p != 0)
		{
			count++;
			l_win.push(i+y*size);
		}else break;
	}
	/*console.log("------------")
    console.log(l_win);
	console.log("count:",count)*/
	
	if (count >= goal) 
	{
		return true;
	}
	return false;
}
// [|||||]
function Vertical(x,y,Board)
{
	l_win = [];
	var count = 0;
	if(size == 3) goal = 3;
	var player = Board[x][y];
	if (player == 0) return false;
	
	for (i = y; i < size;i++)
	{
		var p = Board[x][i];
		if (p == player && p != 0)
		{
			count++;
			l_win.push(x+i*size);
		}else break;
	}
	if (count >= goal) 
	{
		return true;
	}
	return false;
}
// [/////]
function Cross1(x,y,Board)
{
	l_win = [];
	if(size == 3) goal = 3;
	if (x > size-goal || y < goal-1) return false;
	var count = 0;
	
	var player = Board[x][y];
	if (player == 0) return false;
	// check [/////]
	for (i = 0; i <= minab(size-x-1,y);i++)
	{
		var p = Board[(x+i)][(y-i)];
		if (p == player && p != 0)
		{
			count++;
			l_win.push((x+i)+(y-i)*size);
		}else break;
	}
	/*console.log("------------")
    console.log(l_win);
	console.log("count:",count)*/
	if (count >= goal) 
	{
		return true;
	}
	return false;
}
// [\\\\\]
function Cross2(x,y,Board)
{
	l_win = [];
	if(size == 3) goal = 3;
	if (x > size-goal || y > size-goal) return false;
	var count = 0;
	var player = Board[x][y];
	if (player == 0) return false;
	// check [\\\\\]
	for (i = 0; i <= minab(size-x-1,size-y-1);i++)
	{
		var p = Board[(x+i)][(y+i)];
		if (p == player && p != 0)
		{
			count++;
			l_win.push((x+i)+(y+i)*size);
		}else break;
	}
	if (count >= goal) 
	{
		return true;
	}
	return false;
}
function fullBoard(){
	var Board = GetBoard();
	var empty=0;
	for (x = 0;x < size;x++){
		for (y = 0;y < size;y++){
			var p = Board[x][y];
			if (p == 0){
				empty++;
				break;
			}
		}
	}
	return empty;
}
function minab(a,b)
{
	if (a < b) return a;
	else return b;
}