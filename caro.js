function Loaded()
{
	var size = document.getElementById("size").value;
	var table = document.getElementById("board");
	var	row = document.getElementsByClassName("boardRow");
	var square = document.getElementsByClassName("square");
	// Vẽ board game
	table.innerHTML = "";
	for (y = 0; y < size; y++){
		table.innerHTML += '<div class="boardRow" style="height:'+100/size+'%"></div>';
		for (x = 0; x < size; x++){
			var div = '<div class="square" onClick="Click(id)" onMouseOver="MouseOver(id)" onMouseOut="MouseOut(id)"></div>';
			row.item(y).innerHTML += '<div class="boardCol" style="width:'+100/size+'%">'+div+'</div>';
			square.item(x+y*size).setAttribute("id",(x+y*size).toString());
			square.item(x+y*size).setAttribute("player","-1");
		}
	}
}