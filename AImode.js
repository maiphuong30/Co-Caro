//Player value X = 1, O = -1
//Tinh diem cho o trông
function AIMode()
{
	if (!InGame) return;
	var vmax = -Infinity;
	var px = py = -1;
	var Boardtmp = GetBoard();
	var goodMoves=[];
	if(fullBoard()==0){
		EndGame(0);
		return;
	}
	for (y = 0; y < size; y++)
	{
		for (x = 0; x < size; x++)
		{
            //Ô trống
			if (Boardtmp[x][y] == 0)
			{
				Boardtmp[x][y] = AIplayFor;
				//console.log(AIplayFor);
				var H = Point(x,y,Boardtmp,AIplayFor);
				Boardtmp[x][y] =  0;
				if (H > vmax)
				{
					goodMoves=[];
					goodMoves[goodMoves.length] = [parseInt(x), parseInt(y)];
					vmax = H;
				}
				else if (H == vmax)
				{
					goodMoves[goodMoves.length] = [parseInt(x), parseInt(y)];
					vmax = H;
				}
			}
		}
	}
	var pos = Math.floor(Math.random() * goodMoves.length);
	px = goodMoves[pos][0];
	py = goodMoves[pos][1];
	try
	{
		var iplayer = "url('Images/X.png')";
		if (AIplayFor == -1) iplayer = "url('Images/O.png')";
		var sqr = document.getElementsByClassName("square");
		sqr.item(px + py*size).setAttribute("player",AIplayFor);
		sqr.item(px + py*size).style.backgroundImage = iplayer;
	}
	catch(e) {alert(e.message)}
}
//tinh H
function Point(x,y,Tboard,player)
{
	var val = Tboard[x][y];
	if (val == 0) return 0;
	var enemy = -player;
	var result = Attack[GetHorPoint(x,y,Tboard,player)] + Attack[GetVerPoint(x,y,Tboard,player)]
	+Attack[GetCross1Point(x,y,Tboard,player)] + Attack[GetCross2Point(x,y,Tboard,player)];
	
	result += Defense[GetHorPoint(x,y,Tboard,enemy)] + Defense[GetVerPoint(x,y,Tboard,enemy)]
	+ Defense[GetCross1Point(x,y,Tboard,enemy)] + Defense[GetCross2Point(x,y,Tboard,enemy)];
	if(result>0){
	console.log('x,y,score',x,y,result);
	}
	return result;
}

//Kiểm tra hàng ngang
function GetHorPoint(x,y,TBoard,playerValue)
{
	var count = 0,countEnemy = 0;
    //Kiêm tra bên trái
	for (i = x-1;i >= 0;i--)
	{
		if (TBoard[i][y] == playerValue) count++;
		else {if (TBoard[i][y] != 0) countEnemy++;break;}
	}
    //Kiểm tra bên phải
	for (i = x+1;i < size;i++)
	{
		if (TBoard[i][y] == playerValue) count++;
		else {if (TBoard[i][y] != 0) countEnemy++;break;}
	}
	// Bị chặn bởi giới hạn của board
	if ((x == 0 || x == size-1) && count < goal-1) countEnemy++;
	//[2,0], [2,1], [2,2], [2,3], [0,0], [1,0] [dich,ta]
	if((countEnemy==2 && count<goal-1)||count==0) return 0;
	//[0,4], [1,4], [2,4]
	else if(count>=goal-1) return 7;
	// [1,1], [0,1], [1,2], [0,2], [1,3], [0,3] 
	else return count*2 - countEnemy;
}
function GetVerPoint(x,y,TBoard,player)
{
	var count = 0,countEnemy = 0;
	for (i = y-1;i >= 0;i--)
	{
		if (TBoard[x][i] == player) count++;
		else {if (TBoard[x][i] != 0) countEnemy++;break;}
	}
	for (i = y+1;i < size;i++)
	{
		if (TBoard[x][i] == player) count++;
		else {if (TBoard[x][i] != 0) countEnemy++;break;}
	}
	// Bị chặn bởi giới hạn của board
	if ((y == 0 || y == size-1) && count < goal-1) countEnemy++;
	//[2,0], [2,1], [2,2], [2,3], [0,0], [1,0]
	if((countEnemy==2 && count<goal-1)||count==0) return 0;
	//[0,4], [1,4], [2,4]
	else if(count>=goal-1) return 7;
	// [1,1], [0,1], [1,2], [0,2], [1,3], [0,3] 
	else return count*2 - countEnemy;
}
function GetCross1Point(x,y,TBoard,player)
{
	var count = 0,countEnemy = 0;
	for (i = 1;i < minab(size-x,y+1);i++)
	{
		if (TBoard[(x+i)][(y-i)] == player) count++;
		else {if (TBoard[(x+i)][(y-i)] != 0) countEnemy++;break;}
	}
	for (i = 1;i < minab(x+1,size-y);i++)
	{
		if (TBoard[(x-i)][(y+i)] == player) count++;
		else {if (TBoard[(x-i)][(y+i)] != 0) countEnemy++;break;}
	}
	// Bị chặn bởi giới hạn của board
	if ((x == 0 || x == size-1 || y == 0 || y == size-1) && count < goal-1) countEnemy++;
	//[2,0], [2,1], [2,2], [2,3], [0,0], [1,0]
	if((countEnemy==2 && count<goal-1)||count==0) return 0;
	//[0,4], [1,4], [2,4]
	else if(count>=goal-1) return 7;
	// [1,1], [0,1], [1,2], [0,2], [1,3], [0,3] 
	else return count*2 - countEnemy;
}

function GetCross2Point(x,y,TBoard,player)
{
	var count = 0,countEnemy = 0;
	for (i = 1;i < minab(x+1,y+1);i++)
	{
		if (TBoard[(x-i)][(y-i)] == player) count++;
		else {if (TBoard[(x-i)][(y-i)] != 0) countEnemy++;break;}
	}
	for (i = 1;i < minab(size-x,size-y);i++)
	{
		if (TBoard[(x+i)][(y+i)] == player) count++;
		else {if (TBoard[(x+i)][(y+i)] != 0) countEnemy++;break;}
	}
	// Bị chặn bởi giới hạn của board
	if ((x == 0 || x == size-1 || y == 0 || y == size-1) && count < goal-1) countEnemy++;
	//[2,0], [2,1], [2,2], [2,3], [0,0], [1,0]
	if((countEnemy==2 && count<goal-1)||count==0) return 0;
	//[0,4], [1,4], [2,4]
	else if(count>=goal-1) return 7;
	// [1,1], [0,1], [1,2], [0,2], [1,3], [0,3] 
	else return count*2 - countEnemy;
}