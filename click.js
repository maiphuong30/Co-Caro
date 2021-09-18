//Play Game
function Click(id)
{
	var square = document.getElementsByClassName("square");
	var pos = parseInt(id);
	var path = "url('Images/O.png')";
	square.item(pos).style.backgroundImage = path;
}
