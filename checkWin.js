var l_win = [];
var goal = 5;
function WinGame()
{
    var size = document.getElementById("size").value;
	var winState = false;
	var Board = GetBoard();
	for (x = 0;x < size;x++)
	{
		for (y = 0;y < size;y++)
		{
			if (Horizontal(x,y,Board) || Vertical(x,y,Board))
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
    var size = document.getElementById("size").value;
	if(size == 3) goal = 3;
	var count = 0;
	var player = Board[x + y*size];
	if (player == 0) return false;
	
	//[Xiiii]
	for (i = x; i < size;i++)
	{
		var p = Board[i+y*size];
		if (p == player && p != 0)
		{
			count++;
			l_win.push(i+y*size);
		}
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
	var size = document.getElementById("size").value;
	if(size == 3) goal = 3;
	var player = Board[x + y*size];
	if (player == 0) return false;
	
	for (i = y; i < size;i++)
	{
		var p = Board[x+i*size];
		if (p == player && p != 0)
		{
			count++;
			l_win.push(x+i*size);
		}
	}
	if (count >= goal) 
	{
		return true;
	}
	return false;
}