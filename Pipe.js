let Pipe = function(x, y, length, speed, context, type) {
	this.width = 130;
	this.x = x;
	this.y = y;
	this.length = length;
	this.context = context;
	this.speed = speed;
	this.type= type;
}

Pipe.prototype.update = function() {
	this.x -= this.speed;
}

Pipe.prototype.render = function() {
	this.context.save();
	this.context.fillStyle = "#000000";
	this.context.fillRect(this.x, this.y, this.width, this.length);
	this.context.fillStyle = "#32CD32";
	this.context.fillRect(this.x + 5, this.y + 5, this.width - 10, this.length - 10);
	if (this.type == "bottom") {
		this.context.fillStyle = "#000000";
		this.context.fillRect(this.x - 2, this.y, this.width + 4, 30);
		this.context.fillStyle = "#32CD32";
		this.context.fillRect(this.x + 3, this.y + 5, this.width - 6, 20);
	}
	if (this.type == "top") {
		this.context.fillStyle = "#000000";
		this.context.fillRect(this.x - 2, this.y + this.length - 30, this.width + 4, 30);
		this.context.fillStyle = "#32CD32";
		this.context.fillRect(this.x + 3, this.y + this.length - 25, this.width - 6, 20);
	}
	this.context.restore();
}
