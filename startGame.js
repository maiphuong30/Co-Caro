var InGame = false;
var AI = false;
var AIplayFor =0; //1:X , -1:O
var timereturn = false;
var size=15;
var goal = 5;
//hien thi bang
function Loaded()
{
	size = document.getElementById("size").value;
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
//chon che do chơi
function Start()
{
    size = document.getElementById("size").value;
	if(size == 3) goal = 3;
    var typeGame = document.getElementsByName("playerVS");
    var x=Math.floor(size/2); 
    for (var i = 0; i < typeGame.length; i++){
        if (typeGame[i].checked === true){
            if (typeGame[i].value=="computer") {  
                var playFor = document.getElementsByName("StartWith");
                for (var j = 0; j < playFor.length; j++){
                    if (playFor[j].checked === true){
                        //alert(playFor[j].value);
                        if (playFor[j].value=="O") {
                            Loaded();
                            InGame = true;
                            AIplayFor=1;
                            currValue=1;
                            Click(x+x*size);
                            TimeReturn();
                        }else{
                            Loaded();
                            InGame = true;
                            AIplayFor=-1;
                            TimeReturn();
                        }
                    }
                }

                AI = true;
                console.log(AI);
            }
        }else{
            Loaded();
            InGame = true;
            TimeReturn();
        }
    }
    var childNodes = document.getElementById("controls").getElementsByTagName('*');
    for (var node of childNodes) {
        node.disabled = true;
    }
}
//lay vi tri quan co trong bang
function GetBoard()
{
	var mapBoard = [];
	var sqr = document.getElementsByClassName("square");
    for (x = 0;x < size;x++){
        mapBoard[x] = []; //map vao mảng
		for (y = 0;y < size;y++)
		{
		mapBoard[x][y]=parseInt(sqr.item(x+y*size).getAttribute("player"));
        }
    }
	//console.log(mapBoard);
	return mapBoard;
}
//che do choi tinh gio
function TimeReturn()
{
	var chb = document.getElementById("chbtime");
	if (chb.checked) timereturn = true;
	else timereturn = false;
	if (timereturn) LoadProgress();
}
//load gio cho che do tinh gio
function LoadProgress()
{
	if (!timereturn || !InGame) return;
	setTimeout(
	function()
	{
		var pgr = document.getElementById("pgrTime");
		pgr.value--;
		if (pgr.value > 0)
		LoadProgress();
		else
		{
            var whowin =-currValue;
			EndGame(whowin);
		}
	},100);
}
//thong bao thăng thua
function EndGame(whowin){
	var mess = "🎉😁👏Congratulation👏😃🎉";
	if(whowin==0) mess="👏😁🤝Draw🤝😃👏";
	else {
		if(AI){
			var mess = "😂😂😂You lost😂😂😂";
			if (whowin != AIplayFor) mess = "🎉😁👏You Win👏😃🎉";
			
		}else{
			var winner = "url('Images/X.png')";
			if (whowin == -1) winner = "url('Images/O.png')";
			var imgw = document.getElementById("imgWinner");
			imgw.style.backgroundImage = winner;
		}
	}
	document.getElementById("message").innerHTML = mess;
	InGame = false;
} 