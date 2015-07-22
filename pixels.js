var Pixels = (function(){
	
	var Canvas = function(id,width,height) {
		var element = this.element = document.getElementById(id);
		element.width = this.width = width;
		element.height = this.height = height;
		element.style.width = this.width +'px';
		element.style.height = this.height +'px';
		this.context = this.element.getContext('2d');
		this.buffer = this.context.getImageData(0,0,this.width,this.height);		
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
		this.buffer = this.context.getImageData(0,0,this.width,this.height);
	};

	Canvas.prototype.render = function() {
		this.context.putImageData(this.buffer,0,0);
	};

	return function(id,width,height){
		return new Canvas(id,width,height);
	};

})();