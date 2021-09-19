var currValue = 0; // Current Player value 0:X - 1:O
//Play Game
function Click(id)
{
	var square = document.getElementsByClassName("square");
	var pos = parseInt(id);
	var path = "url('Images/X.png')";
	if (currValue == 1) path = "url('Images/O.png')";
	if (square.item(pos).getAttribute("player") != "-1") return;
	square.item(pos).style.backgroundImage = path;
	square.item(pos).setAttribute("player",currValue.toString());
	//Đổi lượt
	if (currValue == 0) currValue = 1;
	else currValue = 0;
	var iplayer = "url('Images/X.png')";
	if (currValue == 1) iplayer = "url('Images/O.png')";
	var imgp = document.getElementById("imgPlayer");
	imgp.style.backgroundImage = iplayer;
}
function MouseOver(id)
{
	var square = document.getElementsByClassName("square");
	var pos = parseInt(id);
	square.item(pos).style.backgroundColor = "#2ecc71";
}
function MouseOut(id)
{
	var square = document.getElementsByClassName("square");
	var pos = parseInt(id);
	square.item(pos).style.backgroundColor = "#34495e";
}
