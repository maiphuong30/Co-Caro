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
	if (currValue == 0) currValue = 1;
	else currValue = 0;
}
