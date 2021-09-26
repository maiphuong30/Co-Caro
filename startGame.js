var InGame = false;
var AI = false;
var AIplayFor =0; //1:X , -1:O
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
			square.item(x+y*size).setAttribute("player","0");
		}
	}
}
function Start()
{
    var size = document.getElementById("size").value;
    var typeGame = document.getElementsByName("playerVS");
    var x=Math.floor(size/2); 
    for (var i = 0; i < typeGame.length; i++){
        if (typeGame[i].checked === true){
            alert(typeGame[i].value);
            if (typeGame[i].value=="computer") {  
                var playFor = document.getElementsByName("StartWith");
                for (var j = 0; j < playFor.length; j++){
                    if (playFor[j].checked === true){
                        alert(playFor[j].value);
                        if (playFor[j].value=="O") {
                            Loaded();
                            InGame = true;
                            AIplayFor=1;
                            currValue=1;
                            Click(x+x*size);
                        }else{
                            AIplayFor=-1;
                        }
                    }
            }

                AI = true;
                console.log(AI);
            }
        }
    }
    var childNodes = document.getElementById("controls").getElementsByTagName('*');
    for (var node of childNodes) {
        node.disabled = true;
    }
    Loaded();
    InGame = true;
}
function GetBoard()
{
	var mapBoard = [];
    var size = document.getElementById("size").value;
	var sqr = document.getElementsByClassName("square");
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