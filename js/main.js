var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var lineWidth = 10; // Default line width
var lineColor = "blue"; // Default color
setCanvasSize(canvas); // Set the size of Canvas 
ctx.fillStyle = "#f1f1f1";
listenUser(canvas); // User listerner

/***** Create a 800 x 500 drawing surface *****/
function setCanvasSize(canvas) {
  window.onresize = function() {
    setCanvasSize();
  }
  function setCanvasSize() {
    canvas.width = '800';
    canvas.height = '500';
  }
}

/***** Keyborad Events *****/
document.onkeydown=function(e) {	
  var keyNum=window.event ? e.keyCode :e.which;	
  // Get the keyCode of the pressed key, would adjust depedending on the browsers
  if(keyNum === 66) {
    // Press b for blue
    lineColor = "blue";
    listenUser(canvas); 
  }

  if(keyNum === 82) {
    // Press r for red
    lineColor = "red";
    listenUser(canvas);
  }

  if(keyNum === 71) {
    // Press g for green
    lineColor = "green";
    listenUser(canvas);
  }

  if(keyNum === 89) {
    // Press y for yellow
    lineColor = "yellow";
    listenUser(canvas);
  }

  if(keyNum === 38) {
    // Press up arrow to make pen size larger
    lineWidth = 20;
    listenUser(canvas);
  }

  if(keyNum === 40) {
    // Press down arrow to make pen size smaller
    lineWidth = 3;
    listenUser(canvas);
  }

  if(keyNum === 32) {
    // Press space bar to clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

}

/***** Draw line function *****/
function drawLine(x1, y1, x2, y2) {

  ctx.beginPath();
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;
  ctx.lineCap="round";
  ctx.lineJoin="round";
  ctx.moveTo(x1, y1); // The starting point
  ctx.lineTo(x2, y2); // The ending point
  
  ctx.stroke(); // Draw line between points
  ctx.closePath();
  
}

function listenUser(canvas) {
  var using = false // Status of starting operation
  var lastPoint = {
    x: undefined,
    y: undefined
  };

  // For touch-screen device
  if(document.body.ontouchstart !== undefined) { //Check touch-screen device
    canvas.ontouchstart = function(down) {
      var x = down.touches[0].clientX
      var y = down.touches[0].clientY
      using = true
      lastPoint = {
        "x": x,
        "y": y
      }
    }

    canvas.ontouchmove = function(move) {
      var x = move.touches[0].clientX
      var y = move.touches[0].clientY
      if(!using) {
        return
      }
      var newPoint = {
        "x": x,
        "y": y
      }
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
    }

    canvas.ontouchend = function(up) {
      using = false
    }
  }
  else {
    // Event listerner for mouse
    canvas.onmousedown = function(down) {
      var x = down.clientX
      var y = down.clientY
      using = true
      lastPoint = {
        "x": x,
        "y": y
      }

    canvas.onmousemove = function(move) {
      var x = move.clientX
      var y = move.clientY
      if(!using) {
        return
      }
      var newPoint = {
        "x": x,
        "y": y
      }
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
      }
    }

    canvas.onmouseup = function(up) {
      using = false
    }
  }
}