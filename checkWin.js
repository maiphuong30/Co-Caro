var l_win = [];
const goal = 5;
function WinGame()
{
    var size = document.getElementById("size").value;
	var winState = false;
	var Board = GetBoard();
	for (x = 0;x < size;x++)
	{
		for (y = 0;y < size;y++)
		{
			if (Horizontal(x,y,Board))
			{
				var square = document.getElementsByClassName("square");
				for(i = 0;i < l_win.length;i++)
				{
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
	var count = 0;
	var player = Board[x + y*size];
	if (player == -1) return false;
	console.log('x=',x);
	console.log('y=',y);
	
	for (i = x; i < size;i++)
	{
		var p = Board[i+y*size];
		if (p == player && p != -1)
		{
			count++;
			l_win.push(i+y*size);
            console.log("-------")
            console.log("-----------",l_win);
			console.log("------- ---------count:",count);
		}
	}
	if (count >= goal) 
	{
		return true;
	}
	return false;
}