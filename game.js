BOARD_SIZE = 3;
board = ["vacant","vacant","vacant","vacant","vacant","vacant","vacant","vacant","vacant"] ;
/*hide all the buttons on the display*/
function hide_buttons()
{
	var buttons = document.getElementsByTagName("button");
	for(i=0 ;i<buttons.length;i++){
		buttons[i].style.visibility = "hidden";
	}
}

/*create footer with replay button*/
function create_footer(){
	var pageFooter = document.createElement('div');
	pageFooter.className = "footer";
	document.body.appendChild(pageFooter);
	var replay_button = document.createElement('button');
	replay_button.style.visibility = "hidden";
	replay_button.className = "buttons" ;
	replay_button.id = "replay" ;
	replay_button.innerHTML = "Play Again";
	replay_button.onclick = replay_game ; 
	pageFooter.appendChild(replay_button);
	
	
}

/*main event handler*/
function draw(id){
	return function(){
		var lastChar = parseInt(id[id.length-1]);
		if (board[lastChar] == "vacant") {
				board[lastChar] = "1"; /*mark player 1 on the appropriate space  on board */
				document.getElementById(id).appendChild(document.createTextNode("X"));			
				if (victory())  {
							end_game("You Win");
							return;}
				if (cpu_turn()) {
							end_game("You Lose");
							return;}
				if (board_full()) {
								end_game("It's a Tie");		
								return;
									}
			}	
	}	
}

function reset_board(){
	for(i=0; i<board.length;i++){
		board[i] = "vacant" ;
	}
}
/*remove all handlers*/
 function restore_handlers()
 {
	var cells = document.getElementsByClassName("cell");
	for(i=0 ;i<cells.length;i++){
		cells[i].onclick = draw(cells[i].id);
	}
}
function clear_table()
{
	var cells = document.getElementsByClassName("cell");
	for(i=0 ;i<cells.length;i++){
		cells[i].innerHTML = "";
	}
}
/*event handler for replay button*/
function replay_game()
{
reset_board();
clear_table();
restore_handlers();
hide_buttons();
hide_result();
}

 
 function hide_result()
 {
	document.getElementById("game_over").style.visibility="hidden";
 }
/*remove all handlers*/
 function remove_handlers()
 {
	var cells = document.getElementsByClassName ("cell");
	for(i=0 ;i<cells.length;i++){
		cells[i].onclick = null;
	}
}


/*return true if global gameboard has no vacant spots, return false otherwise*/
function board_full()
{
	for(i=0; i<board.length;i++){
		if (board[i] == "vacant") return false;
	}
	return true;
}
/*check if player has won using the global model-board */
 function victory()
 {
 diag1 = (board[0] == board[4]) && (board[4] ==board[8]) && (board[8] != "vacant") ;
 diag2 = board[2] == board[4] && board[4] ==board[6] && board[6] != "vacant" ;
 if (diag1 == true || diag2 == true) return true; 
	for(i=0 ; i< BOARD_SIZE ; i++)
	{
		var hor = board[i*BOARD_SIZE] == board[i*BOARD_SIZE +1 ] && board[i*BOARD_SIZE +1 ] == board[i*BOARD_SIZE +2]  && board[i*BOARD_SIZE +2] != "vacant" ;
		var vert = board[i+BOARD_SIZE*0] == board[i+ BOARD_SIZE*1 ] && board[i+ BOARD_SIZE*1 ]== board[i+ BOARD_SIZE*2] && board[i+ BOARD_SIZE*2 ]!= "vacant" ;
		if (hor || vert) return true;
	}
	return false;
 }
 /*let cpu play and update model(global array)*/
function cpu_turn()
{
	found = false;
	for(var i=0;i<BOARD_SIZE&& !found;i++){
		for(var j=0;j<BOARD_SIZE && !found;j++){
			if (board[i*BOARD_SIZE + j] == "vacant") 
			{
				found = true;
				document.getElementById("e" + (i*BOARD_SIZE + j)).innerHTML = "O" ;
				board[i*BOARD_SIZE + j] = "2";
			}
		}
	}
	if (victory()) return true;
	return false;
}


/*show result, and disable onclick handler*/
function end_game(str)
{
				var game = document.getElementById("game_over");
				game.style.visibility = "visible" ; 
				game.innerHTML = str;
				remove_handlers();
				document.getElementById("replay").style.visibility = "visible";
}




/*create  3 by 3 table in  a div element when button is pressed*/
function createGrid() {
	var contain = document.createElement('div');
	contain.className = "container" ;
    var parent = document.createElement('table');
    parent.className = 'tab';
    for (var i = 0; i < BOARD_SIZE; i++) {
		var row = document.createElement('tr');
        for (var p = 0; p < BOARD_SIZE; p++) {
            var cell = document.createElement('td');
			cell.id = "e" + (i*BOARD_SIZE + p) ;
			cell.className  = "cell" ; 
			cell.onclick = draw(cell.id);
            row.appendChild(cell);
			cell.style.border= "1px solid black";			
        }
		parent.appendChild(row);
    }
	parent.style.border = "solid black 5px";  

	contain.appendChild(parent);
    document.body.appendChild(contain);
}