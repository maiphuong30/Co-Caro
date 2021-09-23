var Attack = [0,2,4,20,100,105,110,115,120,130];
var Defense = [0,1,3,15,55,56,57,58,60,62];

function AIMode()
{
	if (!InGame) return;
    var size = document.getElementById("size").value;
	var vmax = -Infinity;
	var px = py = -1;
	var Boardtmp = GetBoard();
	for (y = 0; y < size; y++)
	{
		for (x = 0; x < size; x++)
		{
            //Ô trống
			if (Boardtmp[x][y] == 0)
			{
				Boardtmp[x][y] = -1;
				var H = Point(x,y,Boardtmp);
				Boardtmp[x][y] =  0;
				if (H > vmax)
				{
					px = x;py = y;
					vmax = H;
				}
			}
		}
	}
	try
	{
		var sqr = document.getElementsByClassName("square");
		sqr.item(px + py*size).setAttribute("player","-1");
		sqr.item(px + py*size).style.backgroundImage = "url('Images/O.png')";
		//l_played.push(px+py*size);
	}
	catch(e) {alert(e.message)}
}
function Point(x,y,Tboard)
{
    var size = document.getElementById("size").value;
	var val = Tboard[x][y];
	if (val == 0) return 0;
	
	var result = Attack[GetMarkHor(x,y,Tboard,1)];
	
	result += Defense[GetMarkHor(x,y,Tboard,-1)];
	
	return result;
}

//Kiểm tra hàng ngang
function GetMarkHor(x,y,TBoard,player)
{
    var size = document.getElementById("size").value;
	var count = 0,counto = 0;
    //var rival = -player;
    //Kiêm tra bên trái
	for (i = x-1;i > 0;i--)
	{
        //[XXX]
		if (TBoard[i][y] == player) count++;
		else {if (TBoard[i][y] != 0) counto++;break;}
	}
    //Kiểm tra bên phải
	for (i = x+1;i < size;i++)
	{
		if (TBoard[i][y] == player) count++;
		else {if (TBoard[i][y] != 0) counto++;break;}
	}
	if ((x == 0 || x == size-1) && count < 4) counto++;
	if (count <= counto) return 0;
	else if (count - counto >= 3) return count + counto;
	else return count - counto;
}

