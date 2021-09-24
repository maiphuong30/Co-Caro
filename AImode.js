
//Player value X = 1, O = -1
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
				var H = Point(x,y,Boardtmp,-1);
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
function Point(x,y,Tboard,player)
{
	var val = Tboard[x][y];
	if (val == 0) return 0;
	var enemy = -player;
	var result = Attack[GetMarkHor(x,y,Tboard,player)] + Attack[GetMarkVer(x,y,Tboard,player)]
	+Attack[GetMarkCross1(x,y,Tboard,player)]+Attack[GetMarkCross2(x,y,Tboard,player)];
	console.log('-----------------------------------------');
	result += Defense[GetMarkHor(x,y,Tboard,enemy)]+Defense[GetMarkVer(x,y,Tboard,enemy)]
	+ Defense[GetMarkCross1(x,y,Tboard,enemy)]+Defense[GetMarkCross2(x,y,Tboard,enemy)];
	if(Defense[GetMarkHor(x,y,Tboard,enemy)]>0|| Attack[GetMarkHor(x,y,Tboard,player)]>0){
	console.log('x,y-Defense score-Attack score',x,y,Defense[GetMarkHor(x,y,Tboard,enemy)]
	,Attack[GetMarkHor(x,y,Tboard,player)]);
	}
	return result;
}

//Kiểm tra hàng ngang
function GetMarkHor(x,y,TBoard,playerValue)
{
    var size = document.getElementById("size").value;
	// if(playerValue=1) var 
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
	if ((x == 0 || x == size-1) && count < 4) countEnemy++;
	//[2,0], [2,1], [2,2], [2,3], [0,0], [1,0]
	if((countEnemy==2 && count<4)||count==0) return 0;
	//[0,4], [1,4], [2,4]
	else if(count>3) return 7;
	// [1,1], [0,1], [1,2], [0,2], [1,3], [0,3] 
	else return count*2 - countEnemy;
}
function GetMarkVer(x,y,TBoard,player)
{
	var size = document.getElementById("size").value;
	var count = 0,countEnemy = 0;
	for (i = y-1;i > 0;i--)
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
	if ((x == 0 || x == size-1) && count < 4) countEnemy++;
	//[2,0], [2,1], [2,2], [2,3], [0,0], [1,0]
	if((countEnemy==2 && count<4)||count==0) return 0;
	//[0,4], [1,4], [2,4]
	else if(count>3) return 7;
	// [1,1], [0,1], [1,2], [0,2], [1,3], [0,3] 
	else return count*2 - countEnemy;
}
function GetMarkCross1(x,y,TBoard,player)
{
	var size = document.getElementById("size").value;
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
	if ((x == 0 || x == size-1 || y == 0 || y == size-1) && count < 4) countEnemy++;
	//[2,0], [2,1], [2,2], [2,3], [0,0], [1,0]
	if((countEnemy==2 && count<4)||count==0) return 0;
	//[0,4], [1,4], [2,4]
	else if(count>3) return 7;
	// [1,1], [0,1], [1,2], [0,2], [1,3], [0,3] 
	else return count*2 - countEnemy;
}

function GetMarkCross2(x,y,TBoard,player)
{
	var size = document.getElementById("size").value;
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
	if ((x == 0 || x == size-1 || y == 0 || y == size-1) && count < 4) countEnemy++;
	//[2,0], [2,1], [2,2], [2,3], [0,0], [1,0]
	if((countEnemy==2 && count<4)||count==0) return 0;
	//[0,4], [1,4], [2,4]
	else if(count>3) return 7;
	// [1,1], [0,1], [1,2], [0,2], [1,3], [0,3] 
	else return count*2 - countEnemy;
}