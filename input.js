function Input() {
// MOUSE
	let that = this;

	this._ctx.canvas.addEventListener("mousedown", function (e) {
		that.clicking = true;
		that.click = true;
		if (e.button === 2) {
			that.rightClick = true;
		}
		//We ought to change to the attack animation if mouse was clicked
		that.change = true;
	}, false);

	this._ctx.canvas.addEventListener("mouseup", function (e) {
		that.clicking = false;
	}, false);

	//Update  mouse Position
	this._ctx.canvas.addEventListener("mousemove", function (e) {


		var element = that._ctx.canvas, offsetX = 0, offsetY = 0, mx, my;

		// Compute the total offset, subtracts the space between the canvas and the page.
		if (element.offsetParent !== undefined) {

			offsetX += element.offsetLeft;
			offsetY += element.offsetTop;
		}

		mx = e.pageX - offsetX;
		my = e.pageY - offsetY;

		that.mouseX = mx;
		that.mouseY = my;
		that.mousePos = {x: mx, y: my};

	}, false);

}