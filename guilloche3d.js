Math.tau = Math.PI*2;

var Guilloche = (function(){

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
	var rosette = function(R,r,p,step,zoom,color) {
		step = step || _step;
		zoom = zoom || _zoom;
		color = color || _color;

		var size = Math.floor(Math.tau/step);

		var geometry = new THREE.BufferGeometry();
		var positions = new Float32Array(size * 3);
		var thetas = new Float32Array(size);

		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0,i=0;i<size;i++) {			
			thetas[i] = theta;
			positions[i+0] = ((rr*Math.cos(theta)) + (rp*Math.cos(rrr*theta))) * zoom;
			positions[i+1] = ((rr*Math.sin(theta)) - (rp*Math.sin(rrr*theta))) * zoom;
			positions[i+2] = ((rr*Math.sin(theta)) + (rp*Math.cos(rrr*theta))) * zoom;
			theta+=step;
		}

		geometry.addAttribute('position',new THREE.BufferAttribute(positions,3));
		geometry.addAttribute('theta',new THREE.BufferAttribute(thetas,1));

		return geometry;
	}

	//------------------------------------------------------
	//A shell!
	var shell = function(R,r,p,step,zoom,color) {
		step = step || _step;
		zoom = zoom || _zoom;
		color = color || _color;

		var size = Math.floor(Math.tau/step);

		var geometry = new THREE.BufferGeometry();
		var positions = new Float32Array(size * 3);
		var thetas = new Float32Array(size);

		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0,i=0;i<size;i++) {			
			thetas[i] = theta;
			positions[i+0] = ((rr*Math.cos(theta)) + (rp*Math.cos(rrr*theta))) * zoom;
			positions[i+1] = ((rr*Math.sin(theta)) + (rp*Math.sin(rrr*theta))) * zoom;
			positions[i+2] = ((rr*Math.tan(theta)) + (rp*Math.tan(rrr*theta))) * zoom;

			theta+=step;
		}

		geometry.addAttribute('position',new THREE.BufferAttribute(positions,3));
		geometry.addAttribute('theta',new THREE.BufferAttribute(thetas,1));

		return geometry;
	}

	//------------------------------------------------------
	//A cylinder!
	var cylinder = function(R,r,p,step,zoom,color) {
		step = step || _step;
		zoom = zoom || _zoom;
		color = color || _color;

		var size = Math.floor(Math.tau/step);

		var geometry = new THREE.BufferGeometry();
		var positions = new Float32Array(size * 3);
		var thetas = new Float32Array(size);

		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0,i=0;i<size;i++) {			
			thetas[i] = theta;
			positions[i+0] = ((rr*Math.cos(theta)) + (rp*Math.sin(rrr*theta))) * zoom;
			positions[i+1] = ((rr*Math.sin(theta)) - (rp*Math.sin(rrr*theta))) * zoom;
			positions[i+2] = ((rr*Math.cos(theta)) + (rp*Math.cos(rrr*theta))) * zoom;

			theta+=step;
		}

		geometry.addAttribute('position',new THREE.BufferAttribute(positions,3));
		geometry.addAttribute('theta',new THREE.BufferAttribute(thetas,1));

		return geometry;
	}

	//------------------------------------------------------
	//A ribbon!
	var ribbon = function(R,r,p,step,zoom,color) {
		step = step || _step;
		zoom = zoom || _zoom;
		color = color || _color;


		var size = Math.floor(Math.tau/step);

		var geometry = new THREE.BufferGeometry();
		var positions = new Float32Array(size * 3);
		var thetas = new Float32Array(size);

		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0,i=0;i<size;i++) {			
			thetas[i] = theta;
			positions[i+0] = ((rr*Math.tan(theta)) + (rp*Math.tan(rrr*theta))) * zoom;
			positions[i+1] = ((rr*Math.sin(theta)) - (rp*Math.cos(rrr*theta))) * zoom;
			positions[i+2] = ((rr*Math.tan(theta)) + (rp*Math.sin(rrr*theta))) * zoom;
			theta+=step;
		}

		geometry.addAttribute('position',new THREE.BufferAttribute(positions,3));
		geometry.addAttribute('theta',new THREE.BufferAttribute(thetas,1));

		return geometry;
	}

	//------------------------------------------------------
	//A river!
	var river = function(R,r,p,step,zoom,color) {
		step = step || _step;
		zoom = zoom || _zoom;
		color = color || _color;

		var size = Math.floor(Math.tau/step);

		var geometry = new THREE.BufferGeometry();
		var positions = new Float32Array(size * 3);
		var thetas = new Float32Array(size);

		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0,i=0;i<size;i++) {			
			thetas[i] = theta;
			positions[i+0] = ((rr*Math.tan(theta)) + (rp*Math.tan(rrr*theta))) * zoom;
			positions[i+1] = ((rr*Math.sin(theta)) - (rp*Math.sin(rrr*theta))) * zoom;
			positions[i+2] = ((rr*Math.tan(theta)) + (rp*Math.cos(rrr*theta))) * zoom;
			theta+=step;
		}

		geometry.addAttribute('position',new THREE.BufferAttribute(positions,3));
		geometry.addAttribute('theta',new THREE.BufferAttribute(thetas,1));

		return geometry;
	}

	//------------------------------------------------------
	//A cross!
	var cross = function(R,r,p,step,zoom,color) {
		step = step || _step;
		zoom = zoom || _zoom;
		color = color || _color;
		
		var size = Math.floor(Math.tau/step);

		var geometry = new THREE.BufferGeometry();
		var positions = new Float32Array(size * 3);
		var thetas = new Float32Array(size);

		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0,i=0;i<size;i++) {			
			thetas[i] = theta;
			positions[i+0] = ((rr*Math.sin(theta)) + (rp*Math.tan(rrr*theta))) * zoom;
			positions[i+1] = ((rr*Math.tan(theta)) - (rp*Math.sin(rrr*theta))) * zoom;
			positions[i+2] = ((rr*Math.sin(theta)) + (rp*Math.cos(rrr*theta))) * zoom;
			theta+=step;
		}

		geometry.addAttribute('position',new THREE.BufferAttribute(positions,3));
		geometry.addAttribute('theta',new THREE.BufferAttribute(thetas,1));

		return geometry;

	}


	//------------------------------------------------------
	//A knee!
	var knee = function(R,r,p,step,zoom,color) {
		step = step || _step;
		zoom = zoom || _zoom;
		color = color || _color;

		var size = Math.floor(Math.tau/step);

		var geometry = new THREE.BufferGeometry();
		var positions = new Float32Array(size * 3);
		var thetas = new Float32Array(size);

		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0,i=0;i<size;i++) {			
			thetas[i] = theta;
			positions[i+0] = ((rr*Math.cos(theta)) + (rp*Math.cos(rrr*theta))) * zoom;
			positions[i+1] = ((rr*Math.sin(theta)) - (rp*Math.tan(rrr*theta))) * zoom;
			positions[i+2] = ((rr*Math.cos(theta)) + (rp*Math.sin(rrr*theta))) * zoom;
			theta+=step;
		}

		geometry.addAttribute('position',new THREE.BufferAttribute(positions,3));
		geometry.addAttribute('theta',new THREE.BufferAttribute(thetas,1));

		return geometry;
	}

	return {
		cylinder:cylinder,
		rosette:rosette,
		ribbon:ribbon,
		river:river,
		cross:cross,
		knee:knee,
		shell:shell
	}

})();