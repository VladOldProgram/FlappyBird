window.onload = function() {
	let canvas = document.getElementById("canvas");
	let context = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	let background = new Background(canvas, context);
	let bird = new Bird(250, 300, context);
	let pipes = [];
	let newPipe = getNewPipe(context, canvas.width, canvas.height);
	pipes.push(newPipe.top, newPipe.bottom);
	setInterval(function() {
		let newPipe = getNewPipe(context, canvas.width, canvas.height);
		pipes.push(newPipe.top, newPipe.bottom);
	}, 2500);

	mainloop();

	function mainloop() {
		if (bird.isDead) {   
			drawGameOver(context, canvas);
			return;
		}

		bird.update(pipes);

		if (!bird.isDead) {
			background.update();
			pipes.forEach(function(pipe) {
				pipe.update();
			});
		}

		background.render();
		pipes.forEach(function(pipe) {
			pipe.render();
		});

		bird.render();
 
		context.font = "bold 20px serif";
		context.textAlign= "left";
		context.fillText("Управление:", 10, canvas.height * 4 / 5);
		context.fillText("\t\t\t\tпробел", 10, canvas.height * 4 / 5 + 20);

		window.requestAnimationFrame(mainloop);
	}
}

function getNewPipe(context, canvasWidth, canvasHeight) {
	let topPipeLength = Math.round(Math.random() * 200 + 50);
	let bottomPipeLength = canvasHeight - 200 - topPipeLength;
	let newPipe = { };
	newPipe.top = new Pipe(canvasWidth, -5, topPipeLength, 4, context, "top");
	newPipe.bottom = new Pipe(canvasWidth, canvasHeight + 5 - bottomPipeLength, 
		bottomPipeLength, 4, context, "bottom");
	return newPipe;
}

function Restart() {
	location.reload();
}

function drawGameOver(context, canvas) {
	context.font = "bold 50px serif";
	context.textAlign= "center";
	context.fillText("Game over!", canvas.width / 2, canvas.height / 2);
}
