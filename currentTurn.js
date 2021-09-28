var currValue = 1; // Current Player value X = 1, O = -1
var InGame = false;
//Play Game
function Click(id)
{
	if (!InGame) return;
	var square = document.getElementsByClassName("square");
	var pos = parseInt(id);
	var path = "url('Images/X.png')";
	if (currValue == -1) path = "url('Images/O.png')";
	if (square.item(pos).getAttribute("player") != "0") return;
	square.item(pos).style.backgroundImage = path;
	square.item(pos).setAttribute("player",currValue.toString());
	var winState = WinGame();
	var whowin= currValue;
	//Đổi lượt player
	if (!AI)
	{
	if (currValue == 1) currValue = -1;
	else currValue = 1;
	var iplayer = "url('Images/X.png')";
	if (currValue == -1) iplayer = "url('Images/O.png')";
	var imgp = document.getElementById("imgPlayer");
	imgp.style.backgroundImage = iplayer;
	}else
	{
		if (!winState)
		{
			AIMode();
			winState = WinGame();
			whowin = AIplayFor;
		}
	}
	// Win: end game
	if (winState)
	{
		EndGame(whowin);
	}else //Chưa có người thắng, set lại thời gian
	{
		var pgr = document.getElementById("pgrTime");
		pgr.value = pgr.getAttribute("max");
	}
}
function MouseOver(id)
{
	if (!InGame) return;
	var square = document.getElementsByClassName("square");
	var pos = parseInt(id);
	square.item(pos).style.backgroundColor = "#2ecc71";
}
function MouseOut(id)
{
	if (!InGame) return;
	var square = document.getElementsByClassName("square");
	var pos = parseInt(id);
	square.item(pos).style.backgroundColor = "#34495e";
}