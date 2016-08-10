Math.tau = Math.tau || (Math.PI*2);

var Pixels = (function(){
	
	var rgba = function(color) {return 'rgba('+color.r+','+color.g+','+color.b+','+color.a+')';};

	var Canvas = function(id,width,height,classic) {
		var element = this.element = document.getElementById(id);
		element.style.width = '100%';
		element.style.height = '100%';
		width = width || element.innerWidth;
		height = height || element.innerHeight;
		element.width = this.width = width;
		element.height = this.height = height;
		this.width = width;
		this.height = height;
		this.context = this.element.getContext('2d');
		this.classic = classic?true:false;
		this.buffer = this.context.getImageData(0,0,this.width,this.height);
	};

	Canvas.prototype.put = function(x,y,color,buffer) {
		if(this.classic) {
			this.putCircle(x,y,color);
		} else {
			this.putPixel(x,y,color,buffer);
		}
	};

	Canvas.prototype.putCircle = function(x,y,color) {
		this.context.beginPath();
		this.context.fillStyle = rgba(color);
		this.context.arc(x, y, 3, 0, Math.tau, false);
		this.context.closePath();
		this.context.fill();		
	};

	Canvas.prototype.putPixel = function(x,y,color,buffer) {
		var data = buffer||this.buffer.data;
		var offset = (this.width * y + x) * 4;
		data[offset]   = color.r;
		data[offset+1] = color.g;
		data[offset+2] = color.b;
		data[offset+3] = color.a;
	};

	Canvas.prototype.clean = function() {
		this.context.fillStyle="rgba(255,255,255,255)";
		this.context.fillRect(0,0,this.width,this.height);
		if(!this.classic) this.buffer = this.context.getImageData(0,0,this.width,this.height);
	};

	Canvas.prototype.render = function() {
		if(!this.classic) this.context.putImageData(this.buffer,0,0);
	};

	return function(id,width,height,classic){
		return new Canvas(id,width,height,classic);
	};

})();