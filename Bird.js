let Bird = function(x, y, context) {
	this.context = context;
	this.width = 90;
	this.height = 64;
	this.x = x;
	this.y = y;
	this.velocityY = 0;
	this.tick = 0;
	this.isDead = false;
	this.frameNumber = 0;
	this.animationFrames = [
		document.getElementById("birdFrame1"),
        	document.getElementById("birdFrame2"),
        	document.getElementById("birdFrame3")];
	let self = this;

  	window.addEventListener("keydown", function(key) {
    		if (key.keyCode == 32 && !self.isDead) {
      			self.velocityY  = -15;
		}
	});
}

Bird.prototype.collisionIsDetected = function(pipes) {
	for (let i = 0; i < pipes.length; i++) {
		let pipe = pipes[i];
		let x0 = pipe.x, x1 = pipe.x + pipe.width;
		let alpha2 = this.x + 44;
		let beta2 = this.y;
		if (pipe.y <= 0) {
			let y0 = pipe.y + pipe.length;
			let alpha1 = this.x;
			let beta1 = this.y - this.height / 2;
      			if (alpha1 > x0 && alpha1 < x1 && beta1 < y0 
				 || alpha2 > x0 && alpha2 < x1 && beta2 < y0) {
				return true;
			}
		}
		else {
			let y2 = pipe.y;
			let alpha3 = this.x;
			let beta3 = this.y + this.height / 2;
			if (alpha3 > x0 && alpha3 < x1 && beta3 > y2 
				 || alpha2 > x0 && alpha2 < x1 && beta2 > y2) {
				return true;
			}
		}
	}
	return false;
}

Bird.prototype.update = function(pipes) {
	if (this.collisionIsDetected(pipes)) {
		this.isDead = true;
	}

	this.y += this.velocityY;
	this.velocityY += 1.2;

	this.tick++;
	if (this.tick % 10 == 0) {
		this.frameNumber = (this.frameNumber + 1) % this.animationFrames.length;
	}
}

Bird.prototype.render = function() {
	let renderX = -this.width / 2;
	let renderY = -this.height / 2;
	this.context.save();
	this.context.translate(this.x, this.y);
	let rotateAngle = Math.PI / 6 * this.velocityY / 16;
	this.context.rotate(rotateAngle);
	this.context.drawImage(this.animationFrames[this.frameNumber], renderX, renderY);
	this.context.restore();
}
