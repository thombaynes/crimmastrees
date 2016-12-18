// var CANVAS_WIDTH = 1440;
var CANVAS_WIDTH = 2400;
var CANVAS_HEIGHT = 1650;

var x = 0;
var y = 0;
var ctx;
var imageCount = 0;
var totalImages = 4;
var trunkWidth = 3;
var treeImages = {};
var patterImages = {};

function triangle(img, posX, posY, width, height, curve) {
	
	//Fill with color swatch
    drawRandomRectangle(img, posX, posY, width, height);

    ctx.fillStyle = "white";
    var fudgeFactor = getRandomInt(-12, 12);
    var trunkHeight = getRandomInt(height/6, height/3);

	var decoration = Math.random();
	if(decoration < 0.15) {
		// Flecks	
		drawFlecks(posX, posY, width, height - trunkHeight);
	}
	else if(decoration >= 0.3 && decoration < 0.45) {
		// Multiple stripes	
		draw1TriangleStripes(posX, posY, width, height - trunkHeight);
	}
	
	//Draw left white triangle
	ctx.moveTo(posX, posY);
    ctx.lineTo(posX + width/2 - fudgeFactor, posY);
    ctx.lineTo(posX, posY + height);
    ctx.fill();
    //Draw right white triangle
	ctx.moveTo(posX + width/2 - fudgeFactor, posY);
	ctx.lineTo(posX + width, posY);
    ctx.lineTo(posX + width, posY + height);
    ctx.fill();

    //Trim trunk
    trimTrunk(posX, posY + height - trunkHeight, width, height - trunkHeight);
}

function twoTriangle(img, posX, posY, width, height, curve) {

	//Fill with color swatch
	drawRandomRectangle(img, posX, posY, width, height);

	ctx.fillStyle = "white";
	var firstSkirtRatio = 4/5;
	var triangleRatio = getRandomFloat(2/5, 9/20);
	var secondSkirtRatio = getRandomFloat(1/20, 1/10);
	var waistRatio = getRandomFloat(1/3, 0.3777);
	var trunkHeight = getRandomInt(height/6, height/4);

	var decoration = Math.random();
	if(decoration < 0.10) {
		// Single Stripe
		ctx.fillRect(posX, Math.floor(posY + height*triangleRatio), width, 3);	
	}
	else if(decoration >= 0.10  && decoration < 0.25) {
		// Flecks	
		drawFlecks(posX, posY, width, height - trunkHeight);
	}
	else if(decoration >= 0.25 && decoration < 0.35) {
		// Multiple stripes	
		draw2TriangleStripes(posX, posY, width, height, height*triangleRatio, height-trunkHeight);
	}

	//Draw upper-left white triangle
	ctx.moveTo(posX, posY);
    ctx.lineTo(posX + width/2, posY);
    ctx.lineTo(posX, posY + height*firstSkirtRatio);
    ctx.fill();
    //Draw lower-left white triangle
    ctx.moveTo(posX, posY + height*triangleRatio);
    ctx.lineTo(posX + width*waistRatio, posY + height*triangleRatio);
    ctx.lineTo(posX + width*secondSkirtRatio, posY + height);
    ctx.lineTo(posX, posY + height);
    ctx.fill();
    //Draw upper-right white triangle
	ctx.moveTo(posX + width/2, posY);
    ctx.lineTo(posX + width, posY);
    ctx.lineTo(posX + width, posY + height*firstSkirtRatio);
    ctx.fill();
    //Draw lower-right white triangle
	ctx.moveTo(posX + width - width*waistRatio, posY + height*triangleRatio);
    ctx.lineTo(posX + width, posY + height*triangleRatio);
    ctx.lineTo(posX + width, posY + height);
    ctx.lineTo(posX + width - width*secondSkirtRatio, posY + height);
    ctx.fill();

    //Trim trunk
    trimTrunk(posX, posY + height - trunkHeight, width, trunkHeight);	
}

function threeTriangle(img, posX, posY, width, height, curve) {
	//Fill with color swatch
	drawRandomRectangle(img, posX, posY, width, height);

	ctx.fillStyle = "white";
	var firstSkirtProportion = getRandomFloat(0.4, 0.7);
	var firstSkirtHeight = 0.3;
	var firstWaistRatio = 1/3 + (firstSkirtProportion - 0.5)/1.5;
	var secondSkirtProportion = getRandomFloat(0.55, 0.6) + (firstSkirtProportion - 0.5)/2
	var secondSkirtHeight = getRandomFloat(0.48, 0.52);
	var secondWaistRatio = getRandomFloat(firstWaistRatio*0.75, firstWaistRatio);
	var thirdSkirtProportion = getRandomFloat(0.78, 0.84) + (firstSkirtProportion - 0.5)/2;
	var thirdSkirtHeight = thirdSkirtProportion;
	var trunkHeight = height - height*thirdSkirtHeight;

	var decoration = Math.random();
	if(decoration < 0.10) {
		// Single Stripe
		ctx.fillRect(posX, Math.floor(posY + height*firstSkirtHeight), width, 3);	
		ctx.fillRect(posX, Math.floor(posY + height*secondSkirtHeight), width, 3);	
	}
	else if(decoration >= 0.10 && decoration < 0.25) {
		// Flecks	
		drawFlecks(posX, posY, width, height - trunkHeight);
	}
	else if(decoration >= 0.25 && decoration < 0.35) {
		// Multiple stripes	
		draw3TriangleStripes(posX, posY, width, height, Math.floor(height*firstSkirtHeight), Math.floor(height*secondSkirtHeight), height-trunkHeight);
	}
	
	//Draw upper-left white triangle
	ctx.moveTo(posX, posY);
    ctx.lineTo(posX + width/2, posY);
    ctx.lineTo(posX, posY + height*firstSkirtProportion);
    ctx.fill();
    //Draw mid-left white triangle
    ctx.moveTo(posX, posY + height*firstSkirtHeight);
    ctx.lineTo(posX + width*firstWaistRatio, posY + height*firstSkirtHeight);
    ctx.lineTo(posX, posY + height*secondSkirtProportion);
    ctx.fill();
    //Draw lower-left white triangle
    ctx.moveTo(posX, posY + height*secondSkirtHeight);
    ctx.lineTo(posX + width*secondWaistRatio, posY + height*secondSkirtHeight);
    ctx.lineTo(posX, posY + height*thirdSkirtProportion);
    ctx.fill();

    //Draw upper-right white triangle
	ctx.moveTo(posX + width/2, posY);
    ctx.lineTo(posX + width, posY);
    ctx.lineTo(posX + width, posY + height*firstSkirtProportion);
    ctx.fill();
    //Draw mid-right white triangle
    ctx.moveTo(posX + width - width*firstWaistRatio, posY + height*firstSkirtHeight);
    ctx.lineTo(posX + width, posY + height*firstSkirtHeight);
    ctx.lineTo(posX + width, posY + height*secondSkirtProportion);
    ctx.fill();
    //Draw lower-right white triangle
	ctx.moveTo(posX + width - width*secondWaistRatio, posY + height*secondSkirtHeight);
    ctx.lineTo(posX + width, posY + height*secondSkirtHeight);
    ctx.lineTo(posX + width, posY + height*thirdSkirtProportion);
    ctx.fill();

    //Trim trunk
    trimTrunk(posX, posY + height - trunkHeight, width, trunkHeight);	
}	

function drawRandomRectangle(img, posX, posY, width, height) {
	var upscaleRatio = 3;
	// Randomly pick a rectangle from the image
	var xRange = img.width - width*upscaleRatio;
	var yRange = img.height - height*upscaleRatio;
	var xIndent = getRandomInt(1, xRange);
	var yIndent = getRandomInt(1, yRange);

	// Draw the rectangle
	ctx.drawImage(img, xIndent, yIndent, width*upscaleRatio, height*upscaleRatio, posX, posY, width, height);		
}

function drawFlecks(posX, posY, width, height) {
	var fleckWidth = 4;
	var fleckHeight = fleckWidth + getRandomInt(6,11);
	var fleckDistance = fleckWidth + getRandomInt(7,12);
	ctx.fillStyle = "white";

	for(var i = 0; i < width; i += fleckDistance) {
		for(var j = 0; j < height; j += fleckHeight*2 + getRandomInt(1, 5)) {
			// ctx.fillRect(posX + i + getRandomInt(1, 5), posY + j, fleckWidth, fleckHeight);
			drawFleck(posX + i + getRandomInt(1, 5), posY + j, fleckWidth, fleckHeight);
		}
	}
}

function drawFleck(posX, posY, width, height) {
	posX = posX + getRandomInt(-1, 2);
	ctx.fillRect(posX, posY + 1, width, height -2);
	ctx.fillRect(posX+1, posY, width-2, 1);
	// ctx.fillRect(posX-1, posY + Math.floor(height/2-3), width+2, height - );
	ctx.fillRect(posX+1, posY+height-1, width-2, 1);
}

function draw1TriangleStripes(posX, posY, width, height) {
	var stripeCount = getRandomInt(6, 9);
	var stripeDistance = height / stripeCount;
	var stripeHeight = 2;

	for(var i = 1; i < stripeCount; i++) {
		ctx.fillRect(posX, posY + i*stripeDistance, width, stripeHeight);
	}
}

function draw2TriangleStripes(posX, posY, width, height, waistHeight, trunkHeight) {
	var stripeCount = getRandomInt(3, 5);
	var stripeDistance = waistHeight / stripeCount;
	var stripeHeight = 2;

	for(var i = 1; i <= stripeCount; i++) {
		ctx.fillRect(posX, posY + i*stripeDistance, width, stripeHeight);
	}
	for(var i = 1; i*stripeDistance + waistHeight < trunkHeight - stripeDistance + 15; i++) {
		ctx.fillRect(posX, posY + i*stripeDistance + waistHeight, width, stripeHeight);
	}
}

function draw3TriangleStripes(posX, posY, width, height, waistHeight, secondWaistHeight, trunkHeight) {
	var stripeCount = getRandomInt(3, 5);
	var stripeDistance = waistHeight / stripeCount;
	var stripeHeight = 2;

	for(var i = 1; i <= stripeCount; i++) {
		ctx.fillRect(posX, posY + i*stripeDistance, width, stripeHeight);
	}
	for(var i = 1; i*stripeDistance + waistHeight < secondWaistHeight - stripeDistance +10; i++) {
		ctx.fillRect(posX, posY + i*stripeDistance + waistHeight, width, stripeHeight);
	}
	for(var i = 0; i*stripeDistance + secondWaistHeight < trunkHeight - stripeDistance +15; i++) {
		ctx.fillRect(posX, posY + i*stripeDistance + secondWaistHeight, width, stripeHeight);
	}
}

function trimTrunk(posX, posY, width, height) {
    ctx.fillRect(posX, posY, width/2 - trunkWidth, height);
    ctx.fillRect(posX + width/2 + trunkWidth, posY, width/2 - trunkWidth, height);
}

function drawField() {
	var triangleWidth = 157;
	var height = 235;
	var posX = 0;
	var posY = 0;
	var rowCount = 0;

	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	// twoTriangle(treeImages.green, posX, posY, triangleWidth, height);	
	
	for(var j = 0; j + height < CANVAS_HEIGHT; j += height) {
	
		for(var i = 0; i + triangleWidth < CANVAS_WIDTH; i += triangleWidth) {
		

			var image = null;
			var chooseImage = Math.random();
			if(chooseImage < 1/3) {
				image = treeImages.green;
			}
			else if(chooseImage > 2/3){
				image = treeImages.darkGreen;
			}
			else {
				image = treeImages.blueGreen;
			}

			var chooseTree = Math.random();
			if(chooseTree < 0.45) {
				//Tweak height and posY so the trees aren't lined up perfectly
				var newHeight = getRandomInt(height * 13/16, height);
				var newPosY = getRandomInt(posY, posY + height - newHeight);
				var newWidth = getRandomInt(triangleWidth * 13/16, triangleWidth);
				var newPosX = getRandomInt(posX, posX + triangleWidth - newWidth);
				triangle(image, newPosX, newPosY, newWidth, newHeight);		
			}
			else if(chooseTree > 0.45 && chooseTree < 0.9) {
				//Tweak height and posY so the trees aren't lined up perfectly
				var newHeight = getRandomInt(height * 14/16, height);
				var newPosY = getRandomInt(posY, posY + height - newHeight);
				twoTriangle(image, posX, newPosY, triangleWidth, newHeight);		
			}
			else {
				//Tweak height and posY so the trees aren't lined up perfectly
				var newHeight = getRandomInt(height * 15/16, height);
				var newPosY = getRandomInt(posY, posY + height - newHeight);
				var newWidth = getRandomInt(triangleWidth * 15/16, triangleWidth);
				var newPosX = getRandomInt(posX, posX + triangleWidth - newWidth);
				threeTriangle(image, newPosX, newPosY, newWidth, newHeight);		
			}

			posX += triangleWidth;
		}
		posX = rowCount%2 ? 0 : triangleWidth/4;
		rowCount++;

		posY += height;
	}
}

function getRandomInt(min, max) { // Does not include the max
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

$(document).ready(function() {
	$('#field').append('<canvas id="canvas" width="' + CANVAS_WIDTH + '" height="' + CANVAS_HEIGHT + '"></canvas>')
	var canvas = $("#canvas")[0];
	ctx = canvas.getContext('2d');

 	ctx.beginPath();
 	
 	var green = new Image();
 	green.src = 'images/green.png';
 	green.onload = function() {
 		imageCount++;
 		treeImages.green = green;
 		if(imageCount === totalImages) {
 			drawField();
 		}
 	};

 	var darkGreen = new Image();
 	darkGreen.src = 'images/darkGreen.png';
 	darkGreen.onload = function() {
 		imageCount++;
 		treeImages.darkGreen = darkGreen;
 		if(imageCount === totalImages) {
 			drawField();
 		}
 	};

 	var blueGreen = new Image();
 	blueGreen.src = 'images/blueGreen.png';
 	blueGreen.onload = function() {
 		imageCount++;
 		treeImages.blueGreen = blueGreen;
 		if(imageCount === totalImages) {
 			drawField();
 		}
 	};

 	var yellow = new Image();
 	yellow.src = 'images/yellow.png';
 	yellow.onload = function() {
 		imageCount++;
 		patterImages.yellow = yellow;
 		if(imageCount === totalImages) {
 			drawField();
 		}
 	};
});