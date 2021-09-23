var InGame = false;
var AI = false;
function Start()
{
    var typeGame = document.getElementsByName("playerVS");
    for (var i = 0; i < typeGame.length; i++){
        if (typeGame[i].checked === true){
            alert(typeGame[i].value);
            if (typeGame[i].value=="computer") {
                AI = true;
                console.log(AI);
            }
        }
    }
    document.getElementById("S-btn").disabled = 'true';
	Loaded();
	InGame = true;

}
function GetBoard()
{
	var mapBoard = [];
    var size = document.getElementById("size").value;
	var sqr = document.getElementsByClassName("square");
	//for (i = 0; i < size*size;i++)
    for (x = 0;x < size;x++){
        mapBoard[x] = [];
		for (y = 0;y < size;y++)
		{
		mapBoard[x][y]=parseInt(sqr.item(x+y*size).getAttribute("player"));
        }
    }
	//console.log(mapBoard);
	return mapBoard;
}