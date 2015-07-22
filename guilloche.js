var Guilloche = (function(){

	Math.tau = Math.tau || (Math.PI*2);

	var width = (window.innerWidth||document.documentElement.clientWidth);
	var height = (window.innerHeight||document.documentElement.clientHeight);

	var cx = width>>1;
	var cy = height>>1;

	var step = 0.0001;
	var zoom = 5;
	//var step = 0.0001;
	//var zoom = 2;

	var color = function(theta){
		return {
			r:Math.round(theta*(1/step))%255,
			g:Math.round(theta*(1/step))%255,
			b:Math.round(theta*(1/step))%255,
			a:255
		};
	}

	//------------------------------------------------------
	//A rosette!
	var rosette = function(image,R,r,p) {
		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0;theta<Math.tau;theta+=step) {
			x = Math.round(((rr*Math.cos(theta)) + (rp*Math.cos(rrr*theta))) * zoom) + cx;
			y = Math.round(((rr*Math.sin(theta)) - (rp*Math.sin(rrr*theta))) * zoom) + cy;
			image.putPixel(x,y,color(theta));
		}
		return image;
	}

	//------------------------------------------------------
	//A cylinder!
	var cylinder = function(image,R,r,p) {
		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0;theta<Math.tau;theta+=step) {
			x = Math.round(((rr*Math.cos(theta)) + (rp*Math.sin(rrr*theta))) * zoom) + cx;
			y = Math.round(((rr*Math.sin(theta)) - (rp*Math.sin(rrr*theta))) * zoom) + cy;
			image.putPixel(x,y,color(theta));
		}
		return image;
	}

	//------------------------------------------------------
	//A ribbon!
	var ribbon = function(image,R,r,p) {
		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0;theta<Math.tau;theta+=step) {
			x = Math.round(((rr*Math.tan(theta)) + (rp*Math.tan(rrr*theta))) * zoom) + cx;
			y = Math.round(((rr*Math.sin(theta)) - (rp*Math.cos(rrr*theta))) * zoom) + cy;
			image.putPixel(x,y,color(theta));
		}
		return image;
	}

	//------------------------------------------------------
	//A river!
	var river = function(image,R,r,p) {
		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0;theta<Math.tau;theta+=step) {
			x = Math.round(((rr*Math.tan(theta)) + (rp*Math.tan(rrr*theta))) * zoom) + cx;
			y = Math.round(((rr*Math.sin(theta)) - (rp*Math.sin(rrr*theta))) * zoom) + cy;
			image.putPixel(x,y,color(theta));
		}
		return image;
	}

	//------------------------------------------------------
	//A cross!
	var cross = function(image,R,r,p) {
		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0;theta<Math.tau;theta+=step) {
			x = Math.round(((rr*Math.sin(theta)) + (rp*Math.tan(rrr*theta))) * zoom) + cx;
			y = Math.round(((rr*Math.tan(theta)) - (rp*Math.sin(rrr*theta))) * zoom) + cy;
			image.putPixel(x,y,color(theta));
		}
		return image;
	}

	//------------------------------------------------------
	//A knee!
	var knee = function(image,R,r,p) {
		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0;theta<Math.tau;theta+=step) {
			x = Math.round(((rr*Math.cos(theta)) + (rp*Math.cos(rrr*theta))) * zoom) + cx;
			y = Math.round(((rr*Math.sin(theta)) - (rp*Math.tan(rrr*theta))) * zoom) + cy;
			image.putPixel(x,y,color(theta));
		}
		return image;
	}

	//------------------------------------------------------
	//A test!
	var test = function(image,R,r,p) {
		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0;theta<Math.tau;theta+=step) {
			x = Math.round(((rr*rr*Math.tan(theta)) + (rp*Math.cos(rrr*theta))) * zoom) + cx;
			y = Math.round(((rr*Math.sin(theta)) - (rp*Math.sin(rrr*theta))) * zoom) + cy;
			image.putPixel(x,y,color(theta));
		}
		return image;
	}

	//------------------------------------------------------

	return {
		width:width,
		height:height,
		cylinder:cylinder,
		rosette:rosette,
		ribbon:ribbon,
		river:river,
		cross:cross,
		knee:knee,
		test:test
	}

})();