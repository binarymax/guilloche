var Guilloche = (function(){

	var width = (window.innerWidth||document.documentElement.clientWidth);
	var height = (window.innerHeight||document.documentElement.clientHeight);

	var _step = 0.0001;
	var _zoom = 5;

	var _color = function(theta,step){
		var c = Math.round(theta*(1/step))%255; 
		return {
			r:c,
			g:c,
			b:c,
			a:255
		};
	}

	//------------------------------------------------------
	//A rosette!
	var rosette = function(image,R,r,p,step,zoom,color) {
		step = step || _step;
		zoom = zoom || _zoom;
		color = color || _color;
		var cx = image.width>>1;
		var cy = image.height>>1;
		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0;theta<Math.tau;theta+=step) {
			x = Math.round(((rr*Math.cos(theta)) + (rp*Math.cos(rrr*theta))) * zoom) + cx;
			y = Math.round(((rr*Math.sin(theta)) - (rp*Math.sin(rrr*theta))) * zoom) + cy;
			image.put(x,y,color(theta,step));
		}
		return image;
	}

	//------------------------------------------------------
	//A cylinder!
	var cylinder = function(image,R,r,p,step,zoom,color) {
		step = step || _step;
		zoom = zoom || _zoom;
		color = color || _color;
		var cx = image.width>>1;
		var cy = image.height>>1;
		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0;theta<Math.tau;theta+=step) {
			x = Math.round(((rr*Math.cos(theta)) + (rp*Math.sin(rrr*theta))) * zoom) + cx;
			y = Math.round(((rr*Math.sin(theta)) - (rp*Math.sin(rrr*theta))) * zoom) + cy;
			image.put(x,y,color(theta,step));
		}
		return image;
	}

	//------------------------------------------------------
	//A ribbon!
	var ribbon = function(image,R,r,p,step,zoom,color) {
		step = step || _step;
		zoom = zoom || _zoom;
		color = color || _color;
		var cx = image.width>>1;
		var cy = image.height>>1;
		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0;theta<Math.tau;theta+=step) {
			x = Math.round(((rr*Math.tan(theta)) + (rp*Math.tan(rrr*theta))) * zoom) + cx;
			y = Math.round(((rr*Math.sin(theta)) - (rp*Math.cos(rrr*theta))) * zoom) + cy;
			image.put(x,y,color(theta,step));
		}
		return image;
	}

	//------------------------------------------------------
	//A river!
	var river = function(image,R,r,p,step,zoom,color) {
		step = step || _step;
		zoom = zoom || _zoom;
		color = color || _color;
		var cx = image.width>>1;
		var cy = image.height>>1;
		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0;theta<Math.tau;theta+=step) {
			x = Math.round(((rr*Math.tan(theta)) + (rp*Math.tan(rrr*theta))) * zoom) + cx;
			y = Math.round(((rr*Math.sin(theta)) - (rp*Math.sin(rrr*theta))) * zoom) + cy;
			image.put(x,y,color(theta,step));
		}
		return image;
	}

	//------------------------------------------------------
	//A cross!
	var cross = function(image,R,r,p,step,zoom,color) {
		step = step || _step;
		zoom = zoom || _zoom;
		color = color || _color;
		var cx = image.width>>1;
		var cy = image.height>>1;
		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0;theta<Math.tau;theta+=step) {
			x = Math.round(((rr*Math.sin(theta)) + (rp*Math.tan(rrr*theta))) * zoom) + cx;
			y = Math.round(((rr*Math.tan(theta)) - (rp*Math.sin(rrr*theta))) * zoom) + cy;
			image.put(x,y,color(theta,step));
		}
		return image;
	}

	//------------------------------------------------------
	//A knee!
	var knee = function(image,R,r,p,step,zoom,color) {
		step = step || _step;
		zoom = zoom || _zoom;
		color = color || _color;
		var cx = image.width>>1;
		var cy = image.height>>1;
		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0;theta<Math.tau;theta+=step) {
			x = Math.round(((rr*Math.cos(theta)) + (rp*Math.cos(rrr*theta))) * zoom) + cx;
			y = Math.round(((rr*Math.sin(theta)) - (rp*Math.tan(rrr*theta))) * zoom) + cy;
			image.put(x,y,color(theta,step));
		}
		return image;
	}

	//------------------------------------------------------
	//A test!
	var test = function(image,R,r,p,step,zoom,color) {
		step = step || _step;
		zoom = zoom || _zoom;
		color = color || _color;
		var cx = image.width>>1;
		var cy = image.height>>1;
		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0;theta<Math.tau;theta+=step) {
			x = Math.round(((rr*rr*Math.tan(theta)) + (rp*Math.cos(rrr*theta))) * zoom) + cx;
			y = Math.round(((rr*Math.sin(theta)) - (rp*Math.sin(rrr*theta))) * zoom) + cy;
			image.put(x,y,color(theta,step));
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