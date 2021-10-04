var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "Red";
ctx.fillRect(25, 25, 25, 25)
var ctx2 = canvas.getContext("2d");
ctx2.moveTo(0, 0);
ctx2.lineTo(200, 100);
ctx2.strokeStyle = "#00ff00";
ctx2.stroke();