let Background = function(canvas, context) {
	this.canvas = canvas;
	this.context = context;
	this.width = 450;
	this.position = 0;
	this.image = document.getElementById("background");
	this.speed = 1;
}

Background.prototype.update = function() {
	this.position -= this.speed;
	if (this.position < -this.width) {
		this.position = 0;
	}
}

Background.prototype.render = function() {
	for (let i = 0; i <= this.canvas.width / this.width + 1; i++) {
		this.context.drawImage(
			this.image, 
			this.position + i * this.width, 
			0);
	}
}
