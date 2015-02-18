	var gameState = 0;
	var turnsLeft = 12;
	var gameMatrix;
	var chosenPiece;
	var prevPosition;
	var AI = 1;
	var AImove;
	var p1p;
	var p2p;
	
	function onLoad(){

		drawGrid();	
		var canvas = document.getElementById("gameGrid")
		canvas.addEventListener('click', click, false);		
		gameMatrix = new Array(6);
		for (var i = 0; i < 6; i++){
			gameMatrix[i] = new Array(5);
		}
		//We set the grid keeping track of objects
		for (var row = 0; row < 6; row ++) {
			for (var column = 0; column < 5; column ++) {
				gameMatrix[row][column]=0;
				if ((row == 0 && column < 3)||(row == 1)) {
					gameMatrix[row][column]=21;
				}		
				if (row == 0 && column > 2) {
					gameMatrix[row][column]=22;
				}
				if ((row == 5 && column > 1)||(row==4)) {
					gameMatrix[row][column]=11;
				}			
				if (row == 5 && column < 2) {
					gameMatrix[row][column]=12;
				}
			}		
		}
		
		//window.alert(gameMatrix.toString());
	}
	
	function click(event){
		AI = (document.getElementById("AImenu")).value;
		
		//findWinner returns a string but also sets turnsLeft to 0 if one player has been wiped
		document.getElementById("winning").innerHTML = (findWinner());
		
		if (turnsLeft==0) {
			drawGrid();
			alert(findWinner() + "wins!");
			gameState=0;
			turnsLeft=12;
			onLoad();
			document.getElementById("visTurnsLeft").innerHTML = turnsLeft;
		}
		
		
	
		//http://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
		//This part below is a slightly modified solution from Ryan Artecona's . It can find coordinates of a mouse click on canvas.
		var totalOffsetX = 0;
		var totalOffsetY = 0;
		var x = 0;
		var y = 0;
		var currentElement = this;

		do{
			totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
			totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
		}
		while(currentElement = currentElement.offsetParent)

		y = Math.floor((event.pageX - totalOffsetX)/90);
		x = Math.floor((event.pageY - totalOffsetY)/90);
		//var whatWas = gameMatrix[x][y];
		//alert(gameState);
	
		if (gameState == 10) { //When p1 ricochets chosenPiece
			if (validRicochet(x,y)) {
				if (gameMatrix[x][y] == 21 || gameMatrix[x][y] == 22) {	
					document.getElementById("status").innerHTML = "P1 ricochet";
					gameState=10;
					redraw(x,y,chosenPiece);
					gameMatrix[x][y] = gameMatrix[chosenPiece[0]][chosenPiece[1]];
					gameMatrix[chosenPiece[0]][chosenPiece[1]] = 0;
					prevPosition = [chosenPiece[0],chosenPiece[1]];
					chosenPiece = [x,y];
					return;
				} else {
				redraw(x,y,chosenPiece);
				gameMatrix[x][y] = gameMatrix[chosenPiece[0]][chosenPiece[1]];
				gameMatrix[chosenPiece[0]][chosenPiece[1]] = 0;
				prevPosition = [chosenPiece[0],chosenPiece[1]];
				chosenPiece = [x,y];
				gameState = 2;
				if (AI != 1) {
				var canvas = document.getElementById("gameGrid")
				canvas.click();
				return;} 
				document.getElementById("status").innerHTML = "P2 choose";
				}
			}
			return;
		}
		
		if (gameState == 20) { //When p2 ricochets chosenPiece
		
			if (AI == 2) {
				var r = 5;
				if (AImove[4]== -1) {  // No ricochets
					chosenPiece = [AImove[0],AImove[1]];
					redraw(AImove[2],AImove[3],chosenPiece);
					gameMatrix[AImove[2]][AImove[3]] = gameMatrix[chosenPiece[0]][chosenPiece[1]];
					gameMatrix[chosenPiece[0]][chosenPiece[1]] = 0;	
					chosenPiece = [AImove[2],AImove[3]];
					gameState=0;
					document.getElementById("status").innerHTML = "P1 choose";
					turnsLeft--;
					document.getElementById("visTurnsLeft").innerHTML = turnsLeft;					
					return;
				}
				
				while (r+1 <= AImove.length) {
				redraw(AImove[r-1],AImove[r],chosenPiece);
				gameMatrix[AImove[r-1]][AImove[r]] = gameMatrix[chosenPiece[0]][chosenPiece[1]];
				gameMatrix[chosenPiece[0]][chosenPiece[1]] = 0;	
				prevPosition = [chosenPiece[0],chosenPiece[1]]
				chosenPiece = [AImove[r-1],AImove[r]];
				r = r + 2;
				}
				gameState=0;
				document.getElementById("status").innerHTML = "P1 choose";
				turnsLeft--;
				document.getElementById("visTurnsLeft").innerHTML = turnsLeft;					
				return;
			}
			if (AI == 3) {
				var r = 5;
				if (AImove[4]== -1) {  // No ricochets
					chosenPiece = [AImove[0],AImove[1]];
					redraw(AImove[2],AImove[3],chosenPiece);
					gameMatrix[AImove[2]][AImove[3]] = gameMatrix[chosenPiece[0]][chosenPiece[1]];
					gameMatrix[chosenPiece[0]][chosenPiece[1]] = 0;	
					chosenPiece = [AImove[2],AImove[3]];
					gameState=0;
					document.getElementById("status").innerHTML = "P1 choose";
					turnsLeft--;
					document.getElementById("visTurnsLeft").innerHTML = turnsLeft;					
					return;
				}
				
				while (r+1 <= AImove.length) {
				redraw(AImove[r-1],AImove[r],chosenPiece);
				gameMatrix[AImove[r-1]][AImove[r]] = gameMatrix[chosenPiece[0]][chosenPiece[1]];
				gameMatrix[chosenPiece[0]][chosenPiece[1]] = 0;	
				prevPosition = [chosenPiece[0],chosenPiece[1]]
				chosenPiece = [AImove[r-1],AImove[r]];
				r = r + 2;
				}
				gameState=0;
				document.getElementById("status").innerHTML = "P1 choose";
				turnsLeft--;
				document.getElementById("visTurnsLeft").innerHTML = turnsLeft;					
				return;
			}			
			if (AI == 3) {
				var ricos = AImove.slice(4,0);
				redraw(AImove[4],AImove[5],chosenPiece);
				gameMatrix[AImove[4]][AImove[5]] = gameMatrix[chosenPiece[0]][chosenPiece[1]];
				gameMatrix[chosenPiece[0]][chosenPiece[1]] = 0;	
				prevPosition = [chosenPiece[0],chosenPiece[1]]
				chosenPiece = [AImove[4],AImove[5]];
				gameState=0;
				document.getElementById("status").innerHTML = "P1 choose";
				turnsLeft--;
				document.getElementById("visTurnsLeft").innerHTML = turnsLeft;	
				return;
			}			
			
			if (validRicochet(x,y)) {
				if (gameMatrix[x][y] == 11 || gameMatrix[x][y] == 12) {	
					document.getElementById("status").innerHTML = "P2 ricochet";
					gameState=20;
					redraw(x,y,chosenPiece);
					gameMatrix[x][y] = gameMatrix[chosenPiece[0]][chosenPiece[1]];
					gameMatrix[chosenPiece[0]][chosenPiece[1]] = 0;
					prevPosition = [chosenPiece[0],chosenPiece[1]];
					chosenPiece = [x,y];
					return;
					} else {
					redraw(x,y,chosenPiece);
					gameMatrix[x][y] = gameMatrix[chosenPiece[0]][chosenPiece[1]];
					gameMatrix[chosenPiece[0]][chosenPiece[1]] = 0;
					prevPosition = [chosenPiece[0],chosenPiece[1]];
					chosenPiece = [x,y];
					gameState = 0;
					document.getElementById("status").innerHTML = "P1 choose";
					turnsLeft--;
					document.getElementById("visTurnsLeft").innerHTML = turnsLeft;
				}
			}
			return;
		}		
	
		if (gameState==0){  //P1 choose piece to move
			if(gameMatrix[x][y] == 11 || gameMatrix[x][y] == 12){
			document.getElementById("status").innerHTML = "P1 move:";			
				//window.alert("The chosen piece is at " + x + "," + y);
				chosenPiece = [x,y];
				gameState=1;
				return;
				}
		}
			
		if (gameState==1) { //P1 chooses place to move or chooses different piece
			if(validMove(x,y,chosenPiece)){
				if(gameMatrix[x][y]==21||gameMatrix[x][y]==22){
					redraw(x,y,chosenPiece);
					gameMatrix[x][y] = gameMatrix[chosenPiece[0]][chosenPiece[1]];
					gameMatrix[chosenPiece[0]][chosenPiece[1]] = 0;				
					document.getElementById("status").innerHTML = "P1 ricochet";
					gameState = 10;
					prevPosition = [chosenPiece[0],chosenPiece[1]];
					chosenPiece = [x,y];
					return;
				}
			
				gameState++;
				redraw(x,y,chosenPiece);
				gameMatrix[x][y] = gameMatrix[chosenPiece[0]][chosenPiece[1]];
				gameMatrix[chosenPiece[0]][chosenPiece[1]] = 0;
				if (AI != 1) { 
					var canvas = document.getElementById("gameGrid")
					canvas.click();
					return;} 
				document.getElementById("status").innerHTML = "P2 choose ";
				return;
			}
			
			if(gameMatrix[x][y]==11||gameMatrix[x][y]==12){
				document.getElementById("status").innerHTML = ("P1 move: ");
				chosenPiece = [x,y];
				gameState=1;
			}
			return;
		}
		
		if (gameState==2) { //P2 chooses place to move or chooses different piece
		
			if (AI == 2) {
				document.getElementById("status").innerHTML = "Click Grid"
				//window.alert("The chosen piece is at " + x + "," + y);
				AImove = dumbAggressive();
				chosenPiece = [AImove[0],AImove[1]];
				gameState=3;
				return;
			}
			if (AI == 3) {
				document.getElementById("status").innerHTML = "Click Grid"
				//window.alert("The chosen piece is at " + x + "," + y);
				AImove = Monte();
				chosenPiece = [AImove[0],AImove[1]];
				gameState=3;
				return;
			}			
			
			
			if(gameMatrix[x][y] == 21 || gameMatrix[x][y] == 22){
				document.getElementById("status").innerHTML = "P2 move:";
				//window.alert("The chosen piece is at " + x + "," + y);
				chosenPiece = [x,y];
				gameState=3;
				return;
				}
			}	
		
		if (gameState==3) { //P2 chooses place to move or chooses different piece
			if (AI != 1) {
				redraw(AImove[2],AImove[3],chosenPiece);
				gameMatrix[AImove[2]][AImove[3]] = gameMatrix[chosenPiece[0]][chosenPiece[1]];
				gameMatrix[chosenPiece[0]][chosenPiece[1]] = 0;	
				prevPosition = [chosenPiece[0],chosenPiece[1]]
				chosenPiece = [AImove[2],AImove[3]];
				if (AImove[4] == -1) {
					gameState = 0;
					turnsLeft--;
					document.getElementById("visTurnsLeft").innerHTML = turnsLeft;
					document.getElementById("status").innerHTML = "P1 choose ";
					return;				
				}
				gameState=20;
				return;
			}
			
			if(validMove(x,y,chosenPiece)){
				if(gameMatrix[x][y]==11||gameMatrix[x][y]==12){
					redraw(x,y,chosenPiece);
					gameMatrix[x][y] = gameMatrix[chosenPiece[0]][chosenPiece[1]];
					gameMatrix[chosenPiece[0]][chosenPiece[1]] = 0;				
					document.getElementById("status").innerHTML = "P2 ricochet";
					gameState = 20;
					prevPosition = [chosenPiece[0],chosenPiece[1]];
					chosenPiece = [x,y];
					return;
				}
				
				gameState = 0;
				turnsLeft--;
				document.getElementById("visTurnsLeft").innerHTML = turnsLeft;
				redraw(x,y,chosenPiece);
				gameMatrix[x][y] = gameMatrix[chosenPiece[0]][chosenPiece[1]];
				gameMatrix[chosenPiece[0]][chosenPiece[1]] = 0;
				document.getElementById("status").innerHTML = "P1 choose ";
				return;
			}
			
			if(gameMatrix[x][y]==21||gameMatrix[x][y]==22){
				document.getElementById("status").innerHTML = ("P2 move: ");
				chosenPiece = [x,y];
				gameState=3;
			}
			return;
		}		
	}	
	
	function validRicochet(x,y){
		if((gameMatrix[chosenPiece[0]][chosenPiece[1]]==11)){
			var mx; var my;
			if (chosenPiece[0]<prevPosition[0]){//we can only move down
			mx = chosenPiece[0]; my = chosenPiece[1];
			while (mx + 1 <= 5) {
					mx++;
					if ((gameMatrix[mx][chosenPiece[1]] == 0) && x == mx && y == my) {				
						return true;
					}
					if ((gameMatrix[mx][chosenPiece[1]] != 0) && (gameMatrix[mx][chosenPiece[1]] == 21 || gameMatrix[mx][chosenPiece[1]] == 22)) {
						if (x == mx && y == my) {
						return true;
						}
					}
				if (gameMatrix[mx][chosenPiece[1]] == 0) {continue;}
				break;
				}
			}
			if (chosenPiece[0]>prevPosition[0]){//we can only move up
			mx = chosenPiece[0]; my = chosenPiece[1];
			while (mx - 1 >= 0) {
				mx--;
				if ((gameMatrix[mx][chosenPiece[1]] == 0) && x == mx && y == my) {				
					return true;
				}
				if ((gameMatrix[mx][chosenPiece[1]] != 0) && (gameMatrix[mx][chosenPiece[1]] == 21 || gameMatrix[mx][chosenPiece[1]] == 22)) {
					if (x == mx && y == my) {
					return true;
					}
				}
				if (gameMatrix[mx][chosenPiece[1]] == 0) {continue;}
				break;
			}
			}			
			if (chosenPiece[1]<prevPosition[1]){//we can only go right
			mx = chosenPiece[0]; my = chosenPiece[1];
			while (my + 1 <= 4) {
				my++;
				if ((gameMatrix[chosenPiece[0]][my] == 0) && x == mx && y == my) {
					return true;							
				}				
				if (gameMatrix[chosenPiece[0]][my] != 0 && (gameMatrix[chosenPiece[0]][my] == 21 || gameMatrix[chosenPiece[0]][my] == 22)) {
					if ((x == mx) && (y == my)) {
					return true;
					}
				}
				if (gameMatrix[chosenPiece[0]][my] == 0) { continue;}
				
				break;
			}
			}
			if (chosenPiece[1]>prevPosition[1]){//we can only go left
				mx = chosenPiece[0]; my = chosenPiece[1];
				while (my - 1 >= 0) {
				my--;
				if ((gameMatrix[chosenPiece[0]][my] == 0) && x == mx && y == my) {
						return true;							
				}						
				if ((gameMatrix[chosenPiece[0]][my] != 0) && (gameMatrix[chosenPiece[0]][my] == 21 || gameMatrix[chosenPiece[0]][my] == 22)) {
					if (x == mx && y == my) {
					return true;
					}
				}
				if (gameMatrix[chosenPiece[0]][my] == 0) { continue;}
				
				break;
				}
			}
		}
		
		if((gameMatrix[chosenPiece[0]][chosenPiece[1]]==12)){
			var mx; var my;
			if (chosenPiece[0]<prevPosition[0] && chosenPiece[1]>prevPosition[1]){//we can only move down and left
			mx = chosenPiece[0]; my = chosenPiece[1];
				while (mx + 1 <= 5 && my - 1 >= 0) {
				mx++;
				my--;
				if ((gameMatrix[mx][my] == 0) && x == mx && y == my) {				
					return true;
				}
				if ((gameMatrix[mx][chosenPiece[1]] != 0) && (gameMatrix[mx][my] == 21 || gameMatrix[mx][my] == 22)) {
					if (x == mx && y == my) {
					return true;
					}
				}
				if (gameMatrix[mx][my] == 0) {continue;}	
				break;
				}
			}
			if (chosenPiece[0]>prevPosition[0] && chosenPiece[1]>prevPosition[1]){//we can only move up and left
			mx = chosenPiece[0]; my = chosenPiece[1];
				while (my - 1 >= 0 && mx - 1 >= 0) {
				my--;
				mx--;
				if ((gameMatrix[mx][my] == 0) && x == mx && y == my) {
						return true;							
				}						
				if ((gameMatrix[mx][my] != 0) && (gameMatrix[mx][my] == 21 || gameMatrix[mx][my] == 22)) {
					if (x == mx && y == my) {
					return true;
					}
				}
				if (gameMatrix[mx][my] == 0) { continue;}
				
				break;
			}
			}			
			//alert("check Right"+chosenPiece.toString()+ "   "+prevPosition.toString());
			if (chosenPiece[0]<prevPosition[0] && chosenPiece[1]<prevPosition[1]){//we can only go down and right
			mx = chosenPiece[0]; my = chosenPiece[1];
			while (mx + 1 <= 5 && my + 1 <= 4) {
				mx++;
				my++;
				if ((gameMatrix[mx][my] == 0) && x == mx && y == my) {				
					return true;
				}
				if ((gameMatrix[mx][chosenPiece[1]] != 0) && (gameMatrix[mx][my] == 21 || gameMatrix[mx][my] == 22)) {
					if (x == mx && y == my) {
					return true;
					}
				}
				if (gameMatrix[mx][my] == 0) {continue;}
				
				break;
			}
			}	
			if (chosenPiece[0]>prevPosition[0] && chosenPiece[1]<prevPosition[1]){//we can only go up && right
				mx = chosenPiece[0]; my = chosenPiece[1];
			while (my + 1 <= 4 && mx - 1 >= 0) {
				my++;
				mx--;
				if ((gameMatrix[mx][my] == 0) && x == mx && y == my) {
					return true;							
				}				
				if (gameMatrix[mx][my] != 0 && (gameMatrix[mx][my] == 21 || gameMatrix[mx][my] == 22)) {
					if ((x == mx) && (y == my)) {
					return true;
					}
				}
				if (gameMatrix[mx][my] == 0) { continue;}
				
				break;
			}
			}
	}		
		
		if((gameMatrix[chosenPiece[0]][chosenPiece[1]]==21)){
				var mx; var my;
			
			if (chosenPiece[0]<prevPosition[0]){//we can only move down
			mx = chosenPiece[0]; my = chosenPiece[1];
			while (mx + 1 <= 5) {
					mx++;
					if ((gameMatrix[mx][chosenPiece[1]] == 0) && x == mx && y == my) {				
						return true;
					}
					if ((gameMatrix[mx][chosenPiece[1]] != 0) && (gameMatrix[mx][chosenPiece[1]] == 11 || gameMatrix[mx][chosenPiece[1]] == 12)) {
						if (x == mx && y == my) {
						return true;
						}
					}
				if (gameMatrix[mx][chosenPiece[1]] == 0) {continue;}
				break;
				}
			}
			if (chosenPiece[0]>prevPosition[0]){//we can only move up
			mx = chosenPiece[0]; my = chosenPiece[1];
			while (mx - 1 >= 0) {
				mx--;
				if ((gameMatrix[mx][chosenPiece[1]] == 0) && x == mx && y == my) {				
					return true;
				}
				if ((gameMatrix[mx][chosenPiece[1]] != 0) && (gameMatrix[mx][chosenPiece[1]] == 11 || gameMatrix[mx][chosenPiece[1]] == 12)) {
					if (x == mx && y == my) {
					return true;
					}
				}
				if (gameMatrix[mx][chosenPiece[1]] == 0) {continue;}
				break;
			}
			}			
			if (chosenPiece[1]<prevPosition[1]){//we can only go right
			mx = chosenPiece[0]; my = chosenPiece[1];
			while (my + 1 <= 4) {
				my++;
				if ((gameMatrix[chosenPiece[0]][my] == 0) && x == mx && y == my) {
					return true;							
				}				
				if (gameMatrix[chosenPiece[0]][my] != 0 && (gameMatrix[chosenPiece[0]][my] == 11 || gameMatrix[chosenPiece[0]][my] == 12)) {
					if ((x == mx) && (y == my)) {
					return true;
					}
				}
				if (gameMatrix[chosenPiece[0]][my] == 0) { continue;}
				
				break;
			}
			}
			if (chosenPiece[1]>prevPosition[1]){//we can only go left
				mx = chosenPiece[0]; my = chosenPiece[1];
				while (my - 1 >= 0) {
				my--;
				if ((gameMatrix[chosenPiece[0]][my] == 0) && x == mx && y == my) {
						return true;							
				}						
				if ((gameMatrix[chosenPiece[0]][my] != 0) && (gameMatrix[chosenPiece[0]][my] == 11 || gameMatrix[chosenPiece[0]][my] == 12)) {
					if (x == mx && y == my) {
					return true;
					}
				}
				if (gameMatrix[chosenPiece[0]][my] == 0) { continue;}
				
				break;
				}
			}	
		}
		
		if((gameMatrix[chosenPiece[0]][chosenPiece[1]]==22)){
			var mx; var my;
			if (chosenPiece[0]<prevPosition[0] && chosenPiece[1]>prevPosition[1]){//we can only move down and left
			mx = chosenPiece[0]; my = chosenPiece[1];
				while (mx + 1 <= 5 && my - 1 >= 0) {
				mx++;
				my--;
				if ((gameMatrix[mx][my] == 0) && x == mx && y == my) {				
					return true;
				}
				if ((gameMatrix[mx][chosenPiece[1]] != 0) && (gameMatrix[mx][my] == 11 || gameMatrix[mx][my] == 12)) {
					if (x == mx && y == my) {
					return true;
					}
				}
				if (gameMatrix[mx][my] == 0) {continue;}	
				break;
				}
			}
			if (chosenPiece[0]>prevPosition[0] && chosenPiece[1]>prevPosition[1]){//we can only move up and left
			mx = chosenPiece[0]; my = chosenPiece[1];
			while (my - 1 >= 0 && mx - 1 >= 0) {
				my--;
				mx--;
				if ((gameMatrix[mx][my] == 0) && x == mx && y == my) {
						return true;							
				}						
				if ((gameMatrix[mx][my] != 0) && (gameMatrix[mx][my] == 11 || gameMatrix[mx][my] == 12)) {
					if (x == mx && y == my) {
					return true;
					}
				}
				if (gameMatrix[mx][my] == 0) { continue;}
				
				break;
			}
			}			
			//alert("check Right"+chosenPiece.toString()+ "   "+prevPosition.toString());
			if (chosenPiece[0]<prevPosition[0] && chosenPiece[1]<prevPosition[1]){//we can only go down and right
			mx = chosenPiece[0]; my = chosenPiece[1];
			while (mx + 1 <= 5 && my + 1 <= 4) {
				mx++;
				my++;
				if (([mx][my] == 0) && x == mx && y == my) {				
					return true;
				}
				if ((gameMatrix[mx][my] != 0) && (gameMatrix[mx][my] == 11 || gameMatrix[mx][my] == 12)) {
					if (x == mx && y == my) {
					return true;
					}
				}
				if (gameMatrix[mx][my] == 0) {continue;}
				
				break;
			}
			}
			
			if (chosenPiece[0]>prevPosition[0] && chosenPiece[1]<prevPosition[1]){//we can only go up && right
				mx = chosenPiece[0]; my = chosenPiece[1];
			while (my + 1 <= 4 && mx - 1 >= 0) {
				my++;
				mx--;
				if ((gameMatrix[mx][my] == 0) && x == mx && y == my) {
					return true;							
				}				
				if (gameMatrix[mx][my] != 0 && (gameMatrix[mx][my] == 21 || gameMatrix[mx][my] == 22)) {
					if ((x == mx) && (y == my)) {
					return true;
					}
				}
				if (gameMatrix[mx][my] == 0) { continue;}
				
				break;
			}
			}
	}				
		
		return false;
	}
	
	function redraw(x,y,chosenPiece) {
			var color1;
			var color2;
			if ((gameMatrix[chosenPiece[0]][chosenPiece[1]] == 21) || (gameMatrix[chosenPiece[0]][chosenPiece[1]] == 22)) {
				color1 = "green";
				color2 = '#003300';
			} 
			if ((gameMatrix[chosenPiece[0]][chosenPiece[1]] == 11) || (gameMatrix[chosenPiece[0]][chosenPiece[1]] == 12)){
				color1 = '#0000CC';
				color2 = '#000044';
			}
			
			var canvas = document.getElementById('gameGrid');
			var ctx = canvas.getContext('2d');
			var cy = x * 90;
			var cx = y * 90;		
			if ((gameMatrix[chosenPiece[0]][chosenPiece[1]] == 11) || (gameMatrix[chosenPiece[0]][chosenPiece[1]] == 21)){
				ctx.beginPath();
				ctx.arc(cx+45,cy+45,38,0,2*Math.PI);
				ctx.fillStyle = color1;
				ctx.fill();
				ctx.lineWidth = 5;
				ctx.strokeStyle = color2;
				ctx.stroke();
			} else if ((gameMatrix[chosenPiece[0]][chosenPiece[1]] == 12) || (gameMatrix[chosenPiece[0]][chosenPiece[1]] == 22)){
				ctx.beginPath();
				ctx.moveTo(cx+12,cy+8);
				ctx.lineTo(cx+12,cy+80);
				ctx.lineTo(cx+78,cy+80);
				ctx.lineTo(cx+78,cy+10);
				ctx.lineTo(cx+45,cy+45);
				ctx.lineTo(cx+11,cy+9);
				ctx.fillStyle = color1;
      			ctx.fill();
				ctx.lineWidth = 5;
				ctx.strokeStyle = color2;
				ctx.stroke();
			}
			
			//alert(chosenPiece[0] + " rt " + chosenPiece[1]);
			
			if ((chosenPiece[0] % 2 == 1) && (chosenPiece[1] % 2 == 1)){		
				ctx.fillStyle = "black";
				ctx.fillRect(chosenPiece[1]*90, chosenPiece[0]*90, 90, 90);
				return;			
			} 
			if ((chosenPiece[0] % 2 == 0) && (chosenPiece[1] % 2 == 0)){
				ctx.fillStyle = "black";
				ctx.fillRect(chosenPiece[1]*90, chosenPiece[0]*90, 90, 90);
				return;
			} else {
			
				ctx.fillStyle = "white";
				ctx.fillRect(chosenPiece[1]*90, chosenPiece[0]*90, 90, 90);			
				//alert(chosenPiece[0] + " rt " + chosenPiece[1]);	
			}				
			return;
	}
	
	function validMove(x,y,chosenPiece) {
		var mx;
		var my;
		if (gameMatrix[chosenPiece[0]][chosenPiece[1]] == 11) {
			//check left	
			mx = chosenPiece[0]; my = chosenPiece[1];
			while (my - 1 >= 0) {
				my--;
				if ((gameMatrix[chosenPiece[0]][my] == 0) && x == mx && y == my) {
						return true;							
				}						
				if ((gameMatrix[chosenPiece[0]][my] != 0) && (gameMatrix[chosenPiece[0]][my] == 21 || gameMatrix[chosenPiece[0]][my] == 22)) {
					if (x == mx && y == my) {
					return true;
					}
				}
				if (gameMatrix[chosenPiece[0]][my] == 0) { continue;}
				
				break;
			}
			//check right
			mx = chosenPiece[0]; my = chosenPiece[1];
			//alert(my+" "+mx);
			while (my + 1 <= 4) {
				my++;
				if ((gameMatrix[chosenPiece[0]][my] == 0) && x == mx && y == my) {
					return true;							
				}				
				if (gameMatrix[chosenPiece[0]][my] != 0 && (gameMatrix[chosenPiece[0]][my] == 21 || gameMatrix[chosenPiece[0]][my] == 22)) {
					if ((x == mx) && (y == my)) {
					return true;
					}
				}
				if (gameMatrix[chosenPiece[0]][my] == 0) { continue;}
				
				break;
			}
			//alert("K");
			//check up
			mx = chosenPiece[0]; my = chosenPiece[1];
			while (mx - 1 >= 0) {
				mx--;
				if ((gameMatrix[mx][chosenPiece[1]] == 0) && x == mx && y == my) {				
					return true;
				}
				if ((gameMatrix[mx][chosenPiece[1]] != 0) && (gameMatrix[mx][chosenPiece[1]] == 21 || gameMatrix[mx][chosenPiece[1]] == 22)) {
					if (x == mx && y == my) {
					return true;
					}
				}
				if (gameMatrix[mx][chosenPiece[1]] == 0) {continue;}
				
				break;
			}
			//check down
			mx = chosenPiece[0]; my = chosenPiece[1];
			while (mx + 1 <= 5) {
				mx++;
				if ((gameMatrix[mx][chosenPiece[1]] == 0) && x == mx && y == my) {				
					return true;
				}
				if ((gameMatrix[mx][chosenPiece[1]] != 0) && (gameMatrix[mx][chosenPiece[1]] == 21 || gameMatrix[mx][chosenPiece[1]] == 22)) {
					if (x == mx && y == my) {
					return true;
					}
				}
				if (gameMatrix[mx][chosenPiece[1]] == 0) {continue;}
				
				break;
			}
			

		}
		
		if (gameMatrix[chosenPiece[0]][chosenPiece[1]] == 12) {
			//check up&left
			mx = chosenPiece[0]; my = chosenPiece[1];
			while (my - 1 >= 0 && mx - 1 >= 0) {
				my--;
				mx--;
				if ((gameMatrix[mx][my] == 0) && x == mx && y == my) {
						return true;							
				}						
				if ((gameMatrix[mx][my] != 0) && (gameMatrix[mx][my] == 21 || gameMatrix[mx][my] == 22)) {
					if (x == mx && y == my) {
					return true;
					}
				}
				if (gameMatrix[mx][my] == 0) { continue;}
				
				break;
			}
			//check up&right
			mx = chosenPiece[0]; my = chosenPiece[1];
			//alert(my+" "+mx);
			while (my + 1 <= 4 && mx - 1 >= 0) {
				my++;
				mx--;
				if ((gameMatrix[mx][my] == 0) && x == mx && y == my) {
					return true;							
				}				
				if (gameMatrix[mx][my] != 0 && (gameMatrix[mx][my] == 21 || gameMatrix[mx][my] == 22)) {
					if ((x == mx) && (y == my)) {
					return true;
					}
				}
				if (gameMatrix[mx][my] == 0) { continue;}
				
				break;
			}
			//alert("K");
			//check down&left
			mx = chosenPiece[0]; my = chosenPiece[1];
			while (mx + 1 <= 5 && my - 1 >= 0) {
				mx++;
				my--;
				if ((gameMatrix[mx][my] == 0) && x == mx && y == my) {				
					return true;
				}
				if ((gameMatrix[mx][my] != 0) && (gameMatrix[mx][my] == 21 || gameMatrix[mx][my] == 22)) {
					if (x == mx && y == my) {
					return true;
					}
				}
				if (gameMatrix[mx][my] == 0) {continue;}
				
				break;
			}
			//check down&right
			mx = chosenPiece[0]; my = chosenPiece[1];
			while (mx + 1 <= 5 && my + 1 <= 4) {
				mx++;
				my++;
				if ((gameMatrix[mx][my] == 0) && x == mx && y == my) {				
					return true;
				}
				if ((gameMatrix[mx][my] != 0) && (gameMatrix[mx][my] == 21 || gameMatrix[mx][my] == 22)) {
					if (x == mx && y == my) {
					return true;
					}
				}
				if (gameMatrix[mx][my] == 0) {continue;}
				
				break;
			}
		
		}
		
		if (gameMatrix[chosenPiece[0]][chosenPiece[1]] == 21) {
			//check left
			mx = chosenPiece[0]; my = chosenPiece[1];
			while (my - 1 >= 0) {
				my--;
				if (gameMatrix[chosenPiece[0]][my] == 0 && x == mx && y == my) {
						return true;							
				}						
				if (gameMatrix[chosenPiece[0]][my] != 0 && (gameMatrix[chosenPiece[0]][my] == 11 || gameMatrix[chosenPiece[0]][my] == 12)) {
					if (x == mx && y == my) {
					return true;
					}
				}
				if (gameMatrix[chosenPiece[0]][my] == 0) { continue;}
				
				break;
			}
			//check right
			mx = chosenPiece[0]; my = chosenPiece[1];
			while (my + 1 <= 4) {
				my++;
				if (gameMatrix[chosenPiece[0]][my] == 0 && x == mx && y == my) {
						return true;							
				}				
				if (gameMatrix[chosenPiece[0]][my] != 0 && (gameMatrix[chosenPiece[0]][my] == 11 || gameMatrix[chosenPiece[0]][my] == 12)) {
					if (x == mx && y == my) {
					return true;
					}
				}
				if (gameMatrix[chosenPiece[0]][my] == 0) { continue;}
				
				break;
			}
			//alert("K");
			//check up
			mx = chosenPiece[0]; my = chosenPiece[1];
			while (mx - 1 >= 0) {
				mx--;
				if (gameMatrix[mx][chosenPiece[1]] == 0 && x == mx && y == my) {				
					return true;
				}
				if (gameMatrix[mx][chosenPiece[1]] != 0 && (gameMatrix[mx][chosenPiece[1]] == 11 || gameMatrix[mx][chosenPiece[1]] == 12)) {
					if (x == mx && y == my) {
					return true;
					}
				}
				if (gameMatrix[mx][chosenPiece[1]] == 0) {continue;}
				
				break;
			}
			//check down
			mx = chosenPiece[0]; my = chosenPiece[1];
			while (mx + 1 <= 5) {
				mx++;
				if (gameMatrix[mx][chosenPiece[1]] == 0 && x == mx && y == my) {				
					return true;
				}
				if (gameMatrix[mx][chosenPiece[1]] != 0 && (gameMatrix[mx][chosenPiece[1]] == 11 || gameMatrix[mx][chosenPiece[1]] == 12)) {
					if (x == mx && y == my) {
					return true;
					}
				}
				if (gameMatrix[mx][chosenPiece[1]] == 0) {continue;}
				
				break;
			}					
		}

		if (gameMatrix[chosenPiece[0]][chosenPiece[1]] == 22) {
			//check up&left
			mx = chosenPiece[0]; my = chosenPiece[1];
			while (my - 1 >= 0 && mx - 1 >= 0) {
				my--;
				mx--;
				if ((gameMatrix[mx][my] == 0) && x == mx && y == my) {
						return true;							
				}						
				if ((gameMatrix[mx][my] != 0) && (gameMatrix[mx][my] == 11 || gameMatrix[mx][my] == 12)) {
					if (x == mx && y == my) {
					return true;
					}
				}
				if (gameMatrix[mx][my] == 0) { continue;}
				
				break;
			}
			//check up&right
			mx = chosenPiece[0]; my = chosenPiece[1];
			//alert(my+" "+mx);
			while (my + 1 <= 4 && mx - 1 >= 0) {
				my++;
				mx--;
				if ((gameMatrix[mx][my] == 0) && x == mx && y == my) {
					return true;							
				}				
				if (gameMatrix[mx][my] != 0 && (gameMatrix[mx][my] == 11 || gameMatrix[mx][my] == 12)) {
					if ((x == mx) && (y == my)) {
					return true;
					}
				}
				if (gameMatrix[mx][my] == 0) { continue;}
				
				break;
			}
			//alert("K");
			//check down&left
			mx = chosenPiece[0]; my = chosenPiece[1];
			while (mx + 1 <= 5 && my - 1 >= 0) {
				mx++;
				my--;
				if ((gameMatrix[mx][my] == 0) && x == mx && y == my) {				
					return true;
				}
				if (gameMatrix[mx][my] != 0 && (gameMatrix[mx][my] == 11 || gameMatrix[mx][my] == 12)) {
					if ((x == mx) && (y == my)) {
					return true;
					}
				}
				if (gameMatrix[mx][my] == 0) {continue;}
				
				break;
			}
			//check down&right
			mx = chosenPiece[0]; my = chosenPiece[1];
			while (mx + 1 <= 5 && my + 1 <= 4) {
				mx++;
				my++;
				if ((gameMatrix[mx][my] == 0) && x == mx && y == my) {				
					return true;
				}
				if ((gameMatrix[mx][my] != 0) && (gameMatrix[mx][my] == 11 || gameMatrix[mx][my] == 12)) {
					if (x == mx && y == my) {
					return true;
					}
				}
				if (gameMatrix[mx][my] == 0) {continue;}
				
				break;
			}
		
		}		
	
		return false;
	}
	
	function drawGrid(){

        var canvas = document.getElementById('gameGrid');
        var ctx = canvas.getContext('2d');
		canvas.height = 540;
		canvas.width = 450;
		
		for (var column = 0; column < 6; column ++) {
			for (var row = 0; row < 5; row ++) {
			// coordinates of the top-left corner
			var x = row * 90;
			var y = column * 90;
			if (column%2 == 0) {
			
				if (row%2 == 0){
					ctx.fillStyle = "black";
				} else { ctx.fillStyle = "white"; }
				
			} else {
			
				if (row%2 == 0) { 
				ctx.fillStyle = "white"; 
				} else { ctx.fillStyle = "black"; }
			}
			ctx.fillRect(x, y, 90, 90);
			}
		}
		
		for (var row = 0; row < 6; row ++) {
			for (var column = 0; column < 5; column ++) {
				var x = column * 90;
				var y = row * 90;
				if ((row == 0 && column < 3)||(row == 1)) {
					ctx.beginPath();
					ctx.arc(x+45,y+45,38,0,2*Math.PI);
					ctx.fillStyle = 'green';
      				ctx.fill();
					ctx.lineWidth = 5;
					ctx.strokeStyle = '#003300';
					ctx.stroke();
				}		
				if (row == 0 && column > 2) {
					ctx.beginPath();
					ctx.moveTo(x+10,y+8);
					ctx.lineTo(x+12,y+80);
					ctx.lineTo(x+78,y+80);
					ctx.lineTo(x+78,y+10);
					ctx.lineTo(x+45,y+45);
					ctx.lineTo(x+11,y+9);
					ctx.fillStyle = 'green';
      				ctx.fill();
					ctx.lineWidth = 5;
					ctx.strokeStyle = '#003300';
					ctx.stroke();
				}
				
				
				if ((row == 5 && column > 1)||(row==4)) {
					ctx.beginPath();
					ctx.arc(x+45,y+45,38,0,2*Math.PI);
					ctx.fillStyle = '#0000CC';
      				ctx.fill();
					ctx.lineWidth = 5;
					ctx.strokeStyle = '#000044';
					ctx.stroke();
				}			
				if (row == 5 && column < 2) {
					ctx.beginPath();
					ctx.moveTo(x+12,y+8);
					ctx.lineTo(x+12,y+80);
					ctx.lineTo(x+78,y+80);
					ctx.lineTo(x+78,y+10);
					ctx.lineTo(x+45,y+45);
					ctx.lineTo(x+11,y+9);
					ctx.fillStyle = '#0000CC';
      				ctx.fill();
					ctx.lineWidth = 5;
					ctx.strokeStyle = '#000044';
					ctx.stroke();
				}
				
			}	
		}	
		
		canvas = document.getElementById('leftCanvas');
		ctx = canvas.getContext('2d');
		canvas.width = 200;
		canvas.height = 540;
		ctx.beginPath;
		ctx.moveTo(200,0);
		ctx.lineTo(200,535);
		ctx.lineTo(100,535);
		ctx.lineTo(5,415);
		ctx.lineTo(5,135);
		ctx.lineTo(100,5);
		ctx.lineTo(200,5);
		ctx.fillStyle = '#474747';

		ctx.fill();
		ctx.lineWidth = 10;
		ctx.strokeStyle = '#000000';
		ctx.stroke();
		
		canvas = document.getElementById('rightCanvas');
		ctx = canvas.getContext('2d');
		canvas.width = 200;
		canvas.height = 540;
		ctx.beginPath;
		ctx.moveTo(0,0);
		ctx.lineTo(0,535);
		ctx.lineTo(100,535);
		ctx.lineTo(195,415);
		ctx.lineTo(195,135);
		ctx.lineTo(100,5);
		ctx.lineTo(0,5)
		ctx.fillStyle = '#474747';

		ctx.fill();
		ctx.lineWidth = 10;
		ctx.strokeStyle = '#000000';
		ctx.stroke();
		return;
	}
	
	function findWinner(){
		var Onetotal = 0;
		var Twototal = 0;
		for (var row = 0; row < 6; row ++) {
			for (var column = 0; column < 5; column ++) {
				if ((gameMatrix[row][column]==11) || (gameMatrix[row][column]==12)) {
					Onetotal++;
				}
				if ((gameMatrix[row][column]==21) || (gameMatrix[row][column]==22)) {
					Twototal++;
				}				
			}
		}
		if (Onetotal==0 || Twototal==0){ turnsLeft = 0; }
		if (Onetotal>Twototal) { return ("Player 1 ") }
		if (Twototal>Onetotal) {return ("Player 2 ") }
		else { return ("No one ")}; 
		return;	
	}
	
	function dumbAggressive() {
		var AIchosenPiece;
		var availablePieces = [];
		for (var row = 0; row < 6; row ++) { //Finds all the pieces which can be moved
			for (var column = 0; column < 5; column ++) {
			if (movablePiece(gameMatrix[row][column], row, column)) {	
				if (gameMatrix[row][column]==21) {
					availablePieces.push(21,row,column);
					}		
				if (gameMatrix[row][column]==22) {
					availablePieces.push(22,row,column);
					}				
				}
			}	
		}
		//window.alert(availablePieces[12] +"   "+ availablePieces[13]+"   "+ availablePieces[14]);
		var piece = 0;
		
		for (nOP = 0; nOP < availablePieces.length; nOP++) {
			var i = getRandomInt(0,(availablePieces.length/3)-1);
			i=i*3;
			//window.alert(i/3 + "   " + availablePieces[i]);
				if (availablePieces[i] == 21) {
					var ax = availablePieces[i+1]; var ay = availablePieces[i+2];
					while (ax + 1 <= 5) { //attack down
						ax++;
						if (gameMatrix[ax][ay] == 21 || gameMatrix[ax][ay] == 22) {	break;}		
						if (gameMatrix[ax][ay] == 11 || gameMatrix[ax][ay] == 12) {						
							var chosenMove = [availablePieces[i+1],availablePieces[i+2],ax,ay];
							chosenMove = seekRico(chosenMove,0);
							moveFound = false;
							return chosenMove;
						}			
					}
					var ax = availablePieces[i+1]; var ay = availablePieces[i+2];
					while (ay - 1 >= 0) { //attack left
						ay--;
						if (gameMatrix[ax][ay] == 21 || gameMatrix[ax][ay] == 22) {	break;}		
						if (gameMatrix[ax][ay] == 11 || gameMatrix[ax][ay] == 12) {						
							var chosenMove = [availablePieces[i+1],availablePieces[i+2],ax,ay];
							chosenMove = seekRico(chosenMove,0);
							return chosenMove;
							break;
						}			
					}
					var ax = availablePieces[i+1]; var ay = availablePieces[i+2];
					while (ay + 1 <= 4) { //attack right
						ay++;
						if (gameMatrix[ax][ay] == 21 || gameMatrix[ax][ay] == 22) {	break;}							
						if (gameMatrix[ax][ay] == 11 || gameMatrix[ax][ay] == 12) {						
							var chosenMove = [availablePieces[i+1],availablePieces[i+2],ax,ay];
							chosenMove = seekRico(chosenMove,0);
							return chosenMove;
							break;
						}			
					}
					var ax = availablePieces[i+1]; var ay = availablePieces[i+2];
					while (ax - 1 >= 0) { //attack up
						ax--;
						if (gameMatrix[ax][ay] == 21 || gameMatrix[ax][ay] == 22) {	break;}						
						if (gameMatrix[ax][ay] == 11 || gameMatrix[ax][ay] == 12) {						
							var chosenMove = [availablePieces[i+1],availablePieces[i+2],ax,ay];
							chosenMove = seekRico(chosenMove,0);
							return chosenMove;
							break;
						}			
					}
				}
				
				if (availablePieces[i] == 22) {
					var ax = availablePieces[i+1]; var ay = availablePieces[i+2];
					while (ay - 1 >= 0 && ax - 1 >= 0) { //Attack Top & Left 
						ay--; ax--;
						if (gameMatrix[ax][ay] == 21 || gameMatrix[ax][ay] == 22) {	break;}						
						if (gameMatrix[ax][ay] == 11 || gameMatrix[ax][ay] == 12) {						
							var chosenMove = [availablePieces[i+1],availablePieces[i+2],ax,ay];
							chosenMove = seekRico(chosenMove,0);
							return chosenMove;
							break;
						}
					}
					var ax = availablePieces[i+1]; var ay = availablePieces[i+2];
					while (ay + 1 <= 4 && ax - 1 >= 0) { //Attack Top & Right 
						ay++; ax--;
						if (gameMatrix[ax][ay] == 21 || gameMatrix[ax][ay] == 22) {	break;}						
						if (gameMatrix[ax][ay] == 11 || gameMatrix[ax][ay] == 12) {						
							var chosenMove = [availablePieces[i+1],availablePieces[i+2],ax,ay];
							chosenMove = seekRico(chosenMove,0);
							return chosenMove;
							break;
						}
					}
					var ax = availablePieces[i+1]; var ay = availablePieces[i+2];
					while (ax + 1 <= 5 && ay - 1 >= 0) { //Attack Down and Left
						ax++; ay--;
						if (gameMatrix[ax][ay] == 21 || gameMatrix[ax][ay] == 22) {	break;}						
						if (gameMatrix[ax][ay] == 11 || gameMatrix[ax][ay] == 12) {						
							var chosenMove = [availablePieces[i+1],availablePieces[i+2],ax,ay];
							chosenMove = seekRico(chosenMove,0);
							return chosenMove;
							break;
						}
					}				
					var ax = availablePieces[i+1]; var ay = availablePieces[i+2];
					while (ax + 1 <= 5 && ay + 1 <= 4) { //Attack Down and Right
						ax++; ay++;
						if (gameMatrix[ax][ay] == 21 || gameMatrix[ax][ay] == 22) {	break;}						
						if (gameMatrix[ax][ay] == 11 || gameMatrix[ax][ay] == 12) {						
							var chosenMove = [availablePieces[i+1],availablePieces[i+2],ax,ay];
							chosenMove = seekRico(chosenMove,0);
							return chosenMove;
							break;
						}
					}				
				}
		}	
		i = getRandomInt(0,(availablePieces.length/3) - 1);
		i=i*3;
		var ChosenMove = [availablePieces[i+1],availablePieces[i+2]];
		
		//window.alert("A " + availablePieces[i] +" at " +availablePieces[i+1]+"   "+availablePieces[i+2]+"chosen");
		// Choose a random location to move to
		if (availablePieces[i] == 21) { 

			cx = availablePieces[i+1]; cy = availablePieces[i+2]; var offset1 = 0;
			while (cx + 1 <= 5) { //see if Down 
				cx++;
				if (gameMatrix[cx][cy] == 0) { offset1++; } else {			
				break; 
				}	
			}
			if (offset1 != 0){offset1 = getRandomInt(1,offset1);}		
		

			
			cx = availablePieces[i+1]; cy = availablePieces[i+2]; var offset2 = 0;
			while (cx - 1 >= 0) { //see if Top
				cx--;
				if (gameMatrix[cx][cy] == 0) { offset2++; } else {			
				break; 
				}	
			}
			if (offset2 != 0){offset2 = getRandomInt(1,offset2);}
			

			
			cx = availablePieces[i+1]; cy = availablePieces[i+2]; var offset3 = 0;
			while (cy - 1 >= 0) { //see if Left
				cy--;
				if (gameMatrix[cx][cy] == 0) { offset3++; } else {			
				break; 
				}	
			}
			if (offset3 != 0){offset3 = getRandomInt(1,offset3);}		
			
			cx = availablePieces[i+1]; cy = availablePieces[i+2]; var offset4 = 0;
			while (cy + 1 <= 4) { //see if Right 
				cy++;
				if (gameMatrix[cx][cy] == 0) { offset4++; } else {			
				break; 
				}	
			}
			if (offset4 != 0){offset4 = getRandomInt(1,offset4);}	
			
			
			var decider = getRandomInt(1,4);
			
			//window.alert("CIRC   "+decider + "  " + offset1 + "  " + offset2 + "  " + offset3 + "  " + offset4);
			for (var o = 0; o < 20; o++){
				decider = getRandomInt(1,4);
				if (decider == 1 && offset1 != 0) { ChosenMove.push(availablePieces[i+1]+offset1, availablePieces[i+2], -1); return ChosenMove;	}
				if (decider == 2 && offset2 != 0) {	ChosenMove.push(availablePieces[i+1]-offset2, availablePieces[i+2], -1); return ChosenMove; }
				if (decider == 3 && offset3 != 0) {	ChosenMove.push(availablePieces[i+1], availablePieces[i+2]-offset3, -1); return ChosenMove; }
				if (decider == 4 && offset4 != 0) {	ChosenMove.push(availablePieces[i+1], availablePieces[i+2]+offset4, -1); return ChosenMove; }	
			}
			
		}
		
		if (availablePieces[i] == 22) { 
			cx = availablePieces[i+1]; cy = availablePieces[i+2]; var offset1 = 0;
			while (cy - 1 >= 0 && cx - 1 >= 0) { //see if Top & Left 
				cy--; cx--;
				if (gameMatrix[cx][cy] == 0) { offset1++; } else {			
				break; 
				}	
			}
			if (offset1 != 0){offset1 = getRandomInt(1,offset1);}
			
			cx = availablePieces[i+1]; cy = availablePieces[i+2]; var offset2 = 0;
			while (cy + 1 <= 4 && cx - 1 >= 0) { //see if Top & Right 
				cy++; cx--;
				if (gameMatrix[cx][cy] == 0) { offset2++; } else {			
				break; 
				}	
			}
			if (offset2 != 0){offset2 = getRandomInt(1,offset2);}
			
			cx = availablePieces[i+1]; cy = availablePieces[i+2]; var offset3 = 0;
			while (cx + 1 <= 5 && cy - 1 >= 0) { //see if Down and Left
				cx++; cy--;
				if (gameMatrix[cx][cy] == 0) { offset3++; } else {			
				break; 
				}	
			}
			if (offset3 != 0){offset3 = getRandomInt(1,offset3);}
			
			cx = availablePieces[i+1]; cy = availablePieces[i+2]; var offset4 = 0;
			while (cx + 1 <= 5 && cy + 1 <= 4) { //see if Down and Right
				cx++; cy++;
				if (gameMatrix[cx][cy] == 0) { offset4++; } else {			
				break; 
				}	
			}
			if (offset4 != 0){offset4 = getRandomInt(1,offset4);}
			
			var decider = getRandomInt(1,4);
			//window.alert("CROW   "+ decider + "  " + offset1 + "  " + offset2 + "  " + offset3 + "  " + offset4);
			for (var o = 0; o < 20; o++){
				decider = getRandomInt(1,4);
				if (decider == 1 && offset1 != 0) { ChosenMove.push(availablePieces[i+1]-offset1, availablePieces[i+2]-offset1, -1); return ChosenMove;	}
				if (decider == 2 && offset2 != 0) {	ChosenMove.push(availablePieces[i+1]-offset2, availablePieces[i+2]+offset2, -1); return ChosenMove; }
				if (decider == 3 && offset3 != 0) {	ChosenMove.push(availablePieces[i+1]+offset3, availablePieces[i+2]-offset3, -1); return ChosenMove; }
				if (decider == 4 && offset4 != 0) {	ChosenMove.push(availablePieces[i+1]+offset4, availablePieces[i+2]+offset4, -1); return ChosenMove; }	
			}			
		}
		
		
	}
	
	function movablePiece(piece, x, y) {
		if (piece == 21) { 
			cx = x; cy = y;
			while (cx + 1 <= 5) { //see if can move down
				cx++;
				if (gameMatrix[cx][cy] == 0 || gameMatrix[cx][cy] == 11 || gameMatrix[cx][cy] == 12) { return true; }			
				break;
			}	
			cx = x; cy = y;
			while (cx - 1 >= 0) { //see if can move up
				cx--;
				if (gameMatrix[cx][cy] == 0 || gameMatrix[cx][cy] == 11 || gameMatrix[cx][cy] == 12) { return true; }			
				break;
			}				
			cx = x; cy = y;
			while (cy - 1 >= 0) { //see if can move left
				cy--;
				if (gameMatrix[cx][cy] == 0 || gameMatrix[cx][cy] == 11 || gameMatrix[cx][cy] == 12) { return true; }			
				break;
			}	
			cx = x; cy = y;
			while (cy + 1 <= 5) { //see if can move right
				cy++;
				if (gameMatrix[cx][cy] == 0 || gameMatrix[cx][cy] == 11 || gameMatrix[cx][cy] == 12) { return true; }			
				break;
			}
				
		}
		
		if (piece == 22) { 
			cx = x; cy = y;
			while (cy - 1 >= 0 && cx - 1 >= 0) { //see if Top & Left 
				cy--; cx--;
				if (gameMatrix[cx][cy] == 0 || gameMatrix[cx][cy] == 11 || gameMatrix[cx][cy] == 12) { return true; }			
				break;
			}
			cx = x; cy = y;
			while (cy + 1 <= 4 && cx - 1 >= 0) { //see if Top & Right 
				cy++; cx--;
				if (gameMatrix[cx][cy] == 0 || gameMatrix[cx][cy] == 11 || gameMatrix[cx][cy] == 12) { return true; }			
				break;
			}
			cx = x; cy = y;
			while (cx + 1 <= 5 && cy - 1 >= 0) { //see if Down and Left
				cx++; cy--;
				if (gameMatrix[cx][cy] == 0 || gameMatrix[cx][cy] == 11 || gameMatrix[cx][cy] == 12) { return true; }			
				break;
			}				
			cx = x; cy = y;
			while (cx + 1 <= 5 && cy + 1 <= 4) { //see if Down and Right
				cx++; cy++;
				if (gameMatrix[cx][cy] == 0 || gameMatrix[cx][cy] == 11 || gameMatrix[cx][cy] == 12) { return true; }			
				break;	
			}
		}
		
		return false;
	}
	
	function randomChoose() {
		var availablePieces = [];
		var AIMove = [];
		for (var row = 0; row < 6; row ++) { //Finds all the pieces which can be moved
			for (var column = 0; column < 5; column ++) {
			if (movablePiece(gameMatrix[row][column], row, column)) {	
				if (gameMatrix[row][column]==21) {
					availablePieces.push(21,row,column);
					}		
				if (gameMatrix[row][column]==22) {
					availablePieces.push(22,row,column);
					}				
				}
			}	
		}
		
		var i = getRandomInt(0,((availablePieces.length/3)-1));
		i=i*3;
		var aiMove = [availablePieces[i+1],availablePieces[i+2]];
		
		if (gameMatrix[aiMove[0]][aiMove[1]] == 21) {
				var ax = availablePieces[i+1]; var ay = availablePieces[i+2]; var counter = 0;
				while (ax + 1 <= 5) { //move down
					ax++;
					counter++;
					if (gameMatrix[ax][ay] == 21 || gameMatrix[ax][ay] == 22) {	
					var offset = getRandomInt(1,counter);
					aiMove.push(availablePieces[i+1]+offset,availablePieces[i+2],-1);
					return aiMove;
					}		
					
					if (gameMatrix[ax][ay] == 0) {						
						var chosenMove = [availablePieces[i+1],availablePieces[i+2],ax,ay,availablePieces[i+1],availablePieces[i+2]];
						return chosenMove;
					}			
				}
				var ax = availablePieces[i+1]; var ay = availablePieces[i+2];
				while (ay - 1 >= 0) { //attack left
					ay--;
					if (gameMatrix[ax][ay] == 21 || gameMatrix[ax][ay] == 22) {	break;}		
					if (gameMatrix[ax][ay] == 11 || gameMatrix[ax][ay] == 12) {						
						var chosenMove = [availablePieces[i+1],availablePieces[i+2],ax,ay,availablePieces[i+1],availablePieces[i+2]];
						return chosenMove;
						break;
					}			
				}
				var ax = availablePieces[i+1]; var ay = availablePieces[i+2];
				while (ay + 1 <= 4) { //attack right
					ay++;
					if (gameMatrix[ax][ay] == 21 || gameMatrix[ax][ay] == 22) {	break;}							
					if (gameMatrix[ax][ay] == 11 || gameMatrix[ax][ay] == 12) {						
						var chosenMove = [availablePieces[i+1],availablePieces[i+2],ax,ay,availablePieces[i+1],availablePieces[i+2]];
						return chosenMove;
						break;
					}			
				}
				var ax = availablePieces[i+1]; var ay = availablePieces[i+2];
				while (ax - 1 >= 0) { //attack up
					ax--;
					if (gameMatrix[ax][ay] == 21 || gameMatrix[ax][ay] == 22) {	break;}						
					if (gameMatrix[ax][ay] == 11 || gameMatrix[ax][ay] == 12) {						
						var chosenMove = [availablePieces[i+1],availablePieces[i+2],ax,ay,availablePieces[i+1],availablePieces[i+2]];
						return chosenMove;
						break;
					}			
				}
		}
		return aiMove;
	}
	
	function seekRico(chosenMove,ricos) {
		var index = chosenMove.length-4;
		//Random Rico
		//window.alert(chosenMove[0]+"  "+chosenMove[1]+"  "+chosenMove[2]+"  "+chosenMove[3]);
		//window.alert(chosenMove[index]+"  "+chosenMove[index+1]);
		//var ChosenMove = [availablePieces[i+1],availablePieces[i+2]];
		if (gameMatrix[chosenMove[index]][chosenMove[index+1]]==21) { 
			//window.alert("Yep");
			cx = chosenMove[index+2]; cy = chosenMove[index+3]; var offset1 = 0;
			if (chosenMove[index]>chosenMove[index+2]) {
				while (cx + 1 <= 5) { //see if Down 
					cx++;
					if (gameMatrix[cx][cy] == 0) { offset1++; } else {			
					break; 
					}	
				}
				offset1 = getRandomInt(1,offset1+1);
				chosenMove.push(chosenMove[index+2]+offset1, chosenMove[index+3], -1); 
				return chosenMove;				
			}
			
			cx = chosenMove[index+2]; cy = chosenMove[index+3]; var offset2 = 0;
			if (chosenMove[index]<chosenMove[index+2]) {
				while (cx - 1 >= 0) { //see if Top
						cx--;
						if (gameMatrix[cx][cy] == 0) { offset2++; } else {			
						break; 
						}	
					}
					offset2 = getRandomInt(1,offset2+1);
					chosenMove.push(chosenMove[index+2]-offset2, chosenMove[index+3], -1); 
					return chosenMove;			
			}
			
			cx = chosenMove[index+2]; cy = chosenMove[index+3]; var offset3 = 0;
			if (chosenMove[index+1]<chosenMove[index+3]) {		
				while (cy - 1 >= 0) { //see if Left
					cy--;
					if (gameMatrix[cx][cy] == 0) { offset3++; } else {			
					break; 
					}	
				}
				offset3 = getRandomInt(1,offset3+1);
				chosenMove.push(chosenMove[index+2], chosenMove[index+3]-offset3, -1); 
				return chosenMove;		
			}
			
			cx = chosenMove[index+2]; cy = chosenMove[index+3]; var offset4 = 0;
			if (chosenMove[index+1]<chosenMove[index+3]) {
				while (cy + 1 <= 4) { //see if Right 
					cy++;
					if (gameMatrix[cx][cy] == 0) { offset4++; } else {			
					break; 
					}	
				}
				offset4 = getRandomInt(1,offset4+1);
				chosenMove.push(chosenMove[index+2], chosenMove[index+3]+offset4, -1); 
				return chosenMove;		
			}			
			var decider = getRandomInt(1,4);
			//window.alert("CIRC   "+decider + "  " + offset1 + "  " + offset2 + "  " + offset3 + "  " + offset4);
		}
		
		if (gameMatrix[chosenMove[index]][chosenMove[index+1]]==22) { 
			//window.alert("Yep");
			//window.alert(chosenMove[0]+"  "+chosenMove[1]+"  "+chosenMove[2]+"  "+chosenMove[3]);
			cx = chosenMove[index+2]; cy = chosenMove[index+3]; var offset1 = 0;
			if (chosenMove[index]>chosenMove[index+2]&&chosenMove[index+1]>chosenMove[index+3]) {
				while (cx + 1 <= 5 && cy - 1 >= 0) { //see Down and Left 
					cx++; cy--;
					if (gameMatrix[cx][cy] == 0) { offset1++; } else {			
					break; 
					}	
				}
				offset1 = getRandomInt(1,offset1+1);
				chosenMove.push(chosenMove[index+2]+offset1, chosenMove[index+3]-offset1, -1); 
				return chosenMove;				
			}
			
			cx = chosenMove[index+2]; cy = chosenMove[index+3]; var offset2 = 0;
			if (chosenMove[index]<chosenMove[index+2]&&chosenMove[index+1]<chosenMove[index+3]) {
				while (cx - 1 >= 0&& cy - 1 >= 0) { //see if Top and Left
						cx--; cy--;
						if (gameMatrix[cx][cy] == 0) { offset2++; } else {			
						break; 
						}	
					}
					offset2 = getRandomInt(1,offset2+1);
					chosenMove.push(chosenMove[index+2]-offset2, chosenMove[index+3]-offset2, -1); 
					return chosenMove;			
			}
			
			cx = chosenMove[index+2]; cy = chosenMove[index+3]; var offset3 = 0;
			if (chosenMove[index]<chosenMove[index+2]&&chosenMove[index+1]>chosenMove[index+3]) {		
				while (cx - 1 <= 0 && cy + 1 <= 4) { //see if Top and Right
					cy++; cx--;
					if (gameMatrix[cx][cy] == 0) { offset3++; } else {			
					break; 
					}	
				}
				offset3 = getRandomInt(1,offset3+1);
				chosenMove.push(chosenMove[index+2]-offset3, chosenMove[index+3]+offset3, -1); 
				return chosenMove;		
			}
			
			cx = chosenMove[index+2]; cy = chosenMove[index+3]; var offset4 = 0;
			if (chosenMove[index]>chosenMove[index+2]&&chosenMove[index+1]>chosenMove[index+3]) {
				while (cx + 1 <= 4 && cy + 1 <= 4) { //see if Down and Right 
					cy++; cx++;
					if (gameMatrix[cx][cy] == 0) { offset4++; } else {			
					break; 
					}	
				}
				offset4 = getRandomInt(1,offset4+1);
				chosenMove.push(chosenMove[index+2]+offset4, chosenMove[index+3]+offset4, -1); 
				return chosenMove;		
			}			
		}
			var decider = getRandomInt(1,4);
			//window.alert("CIRC   "+decider + "  " + offset1 + "  " + offset2 + "  " + offset3 + "  " + offset4);
		
			var mx; var my;
			
			if (chosenMove[index+2]<chosenMove[index+0]){//we can only move down
			mx = chosenMove[index+2]; my = chosenMove[index+3];
			while (mx + 1 <= 5) {
					mx++;
					if ((gameMatrix[mx][my] != 0) && (gameMatrix[mx][my] == 11 || gameMatrix[mx][my] == 12)) {
						chosenMove = chosenMove.push(mx,my);
						chosenMove = seekRico(chosenMove);
						return chosenMove;
					}
				if (gameMatrix[mx][chosenPiece[1]] == 0) {continue;}
				break;
				}
			}
			if (chosenMove[index+2]>chosenMove[index+0]){//we can only move up
			mx = chosenPiece[0]; my = chosenPiece[1];
			while (mx - 1 >= 0) {
					mx++;
					if ((gameMatrix[mx][my] != 0) && (gameMatrix[mx][my] == 11 || gameMatrix[mx][my] == 12)) {
						chosenMove = chosenMove.push(mx,my);
						chosenMove = seekRico(chosenMove);
						return chosenMove;
					}
				if (gameMatrix[mx][chosenPiece[1]] == 0) {continue;}
				break;
				}
			}
					
			if (chosenMove[index+3]<chosenMove[index+1]){//we can only go right
			mx = chosenPiece[0]; my = chosenPiece[1];
			while (my + 1 <= 4) {
					my++;
					if ((gameMatrix[mx][my] != 0) && (gameMatrix[mx][my] == 11 || gameMatrix[mx][my] == 12)) {
						chosenMove = chosenMove.push(mx,my);
						chosenMove = seekRico(chosenMove);
						return chosenMove;
					}
				if (gameMatrix[mx][chosenPiece[1]] == 0) {continue;}
				break;
			}
			}
			if (chosenMove[index+3]>chosenMove[index+1]){//we can only go left
				mx = chosenPiece[0]; my = chosenPiece[1];
				while (my - 1 >= 0) {
					mx--;
					if ((gameMatrix[mx][my] != 0) && (gameMatrix[mx][my] == 11 || gameMatrix[mx][my] == 12)) {
						chosenMove = chosenMove.push(mx,my);
						chosenMove = seekRico(chosenMove);
						return chosenMove;
					}
				if (gameMatrix[mx][chosenPiece[1]] == 0) {continue;}
				break;
				}
			}

		chosenMove.push(chosenMove[0],chosenMove[1]);//Move these two lines to bottom if all else fails
		return chosenMove;			
		}

	function Monte() {	
		var Gridp1 = JSON.parse(JSON.stringify(gameMatrix));
		for (var i = 5; i > 0; i--) {
			Gridp1 == RandomMove(Gridp1);
			gameMatrix = Gridp1;
		}
		plan = RandomMove(Gridp1);
		//plan = dumbAggressive();
		return plan;
	}
	
	function RandomMove(Gridp1) {
		var aPieces1 = [];
		var aPieces2 = [];
		for (var row = 0; row < 6; row ++) { //Finds all the pieces which can be moved
			for (var column = 0; column < 5; column ++) {
			if (movablePiece(gameMatrix[row][column], row, column)) {	
				if (gameMatrix[row][column]==21) {
					aPieces2.push(21,row,column);
					}
				if (gameMatrix[row][column]==11) {
					aPieces1.push(21,row,column);
					}					
				if (gameMatrix[row][column]==22) {
					aPieces2.push(22,row,column);
					}
				if (gameMatrix[row][column]==12) {
					aPieces1.push(21,row,column);
					}					
				}
			}	
		}
		
		i = getRandomInt(0,(aPeices2.length/3) - 1);
		i=i*3;
		var ChosenMove = [aPeices2[i+1],aPeices2[i+2]];
				
	}
		
	
	function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
	
