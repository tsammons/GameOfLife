// Tyler Sammons
"use strict";

// global vars
var canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext('2d');
var width = window.innerWidth,
    height = window.innerHeight;
var grid = new Array(50),
    nbors = new Array(50),
    myvar;

// fill arrays
ctx.strokeStyle = "#AEF2E2";
for (var i=0; i<50; i++) {
    grid[i] = new Array(34);
    nbors[i] = new Array(34);
} 

// initialize grid array
for (i=0; i<50; i++) {
    for (var j=0; j<34; j++) {
	grid[i][j] = 0;
    }
}

// color grid
function color() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i=0; i<50; i++) {
	for (var j=0; j<34; j++) {
	    if (grid[i][j] === 1) {
		circle(i*15+7.5, j*15+7.5);
	    }
	}
    }
}


// draw circle
var a=Math.floor(Math.random() * 255) + 1, 
    b=Math.floor(Math.random() * 255) + 1, 
    c=Math.floor(Math.random() * 255) + 1;

function circle(cenx, ceny) {
    var it1 = Math.floor(Math.random() * 3) + 1,
	it2 = Math.floor(Math.random() * 3) + 1,
	it3 = Math.floor(Math.random() * 3) + 1;

    var d = Math.floor(Math.random() * 10) + 5/10;

    if (a > 245) a=Math.floor(Math.random() * 20) + 1;
    if (b > 245) b=Math.floor(Math.random() * 20) + 1;
    if (c > 245) c=Math.floor(Math.random() * 20) + 1;

    a = a+it1;
    b = b+it2;
    c = c+it3;

    ctx.beginPath();
    ctx.arc(cenx, ceny, 7.5, 0, 2*Math.PI, false);
    
    if (document.getElementById('rainbow').checked) 
	ctx.fillStyle = "rgba("+a+","+b+","+c+","+d+")";
    else
	//ctx.fillStyle = "white";
	ctx.fillStyle = "#303030";
        

    ctx.fill();
}

// draw lines
function lines() {
    ctx.beginPath();
    for (var i=0; i<=750; i+=15) {
	ctx.moveTo(i, 0);
	ctx.lineTo(i, 510);
    }
    for (var i=0; i<=510; i+=15) {
	ctx.moveTo(0, i);
	ctx.lineTo(750, i);
    }
    ctx.closePath();
    ctx.stroke();
}

// count neighbors
function neighbors(xpos, ypos) {
    var count = 0;
    var x, y;
    for (x=xpos-1; x<xpos+2; x++) {
	for (y=ypos-1; y<ypos+2; y++) {
	    if (x<0 || y<0 || x>49 || y>33) {
		count = count;
	    }
	    else {
		if (x === xpos && y === ypos) { 
                    count = count;
		}
		else {
		    if (grid[x][y] === 1)
			count++;
		    else
			count = count;
		}
	    }  
	}
    }
    return count;
}

// tick
function tick() {

    // vars
    var count = 0;
    var minimum = parseInt(document.getElementById("min").value);
    var maximum = parseInt(document.getElementById("max").value);
    var reproduce = parseInt(document.getElementById("rep").value);
    
    // count neighbors
    for (var i=0; i<50; i++) {
	for (var j=0; j<34; j++) {
	    nbors[i][j] = neighbors(i, j);
	}
    }
    
    // apply rules
    for (i=0; i<50; i++) {
	for (j=0; j<34; j++) {
	    if (nbors[i][j] > 1) count++;
	    if (nbors[i][j] < minimum || nbors[i][j] > maximum) {
		grid[i][j] = 0;
	    }
	    if (nbors[i][j] === reproduce) {
		grid[i][j] = 1;
	    }
	}
    }
    color();
    lines();
    if (count === 0) clearInterval(myvar);
}

// listen for clicks
var elem = document.getElementById('myCanvas');
elem.addEventListener('click', function(event) {
	var x = event.pageX,
	    y = event.pageY;

	var xpos = x-25,
	    ypos = y-90;

	grid[Math.floor(xpos/15)][Math.floor(ypos/15)] = 1;
	color();
	lines();
    }, false);

// get mouse position
function tracker(e) {
    if (document.getElementById('paint').checked) {
	var x = e.clientX,
	    y = e.clientY;

	var xpos = x-25,
	    ypos = y-90;

       if (grid[Math.floor(xpos/15)][Math.floor(ypos/15)] != 1) {
	   grid[Math.floor(xpos/15)][Math.floor(ypos/15)] = 1;
	   color();
	   lines();
       }
    }
}


// initialize
function init() {
    lines();
}

// begin
function begin() {
    myvar = setInterval(tick, 75);
}

