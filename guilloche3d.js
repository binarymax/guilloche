Math.tau = Math.PI*2;

var Guilloche = (function(){

	var _step = 0.0001;
	var _zoom = 5;

	//------------------------------------------------------
	//A rosette!
	var rosette = function(R,r,p,step,zoom) {
		step = step || _step;
		zoom = zoom || _zoom;

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

	rosette.shader = 
		"rr*cos(theta) + rp*cos(rrr*theta) * zoom,"+
		"rr*sin(theta) - rp*sin(rrr*theta) * zoom,"+
		"rr*sin(theta) + rp*cos(rrr*theta) * zoom";

	//------------------------------------------------------
	//A shell!
	var shell = function(R,r,p,step,zoom) {
		step = step || _step;
		zoom = zoom || _zoom;

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

	shell.shader = 
		"rr*cos(theta) + rp*cos(rrr*theta) * zoom,"+
		"rr*sin(theta) + rp*sin(rrr*theta) * zoom,"+
		"rr*tan(theta) + rp*tan(rrr*theta) * zoom";

	//------------------------------------------------------
	//A cylinder!
	var cylinder = function(R,r,p,step,zoom) {
		step = step || _step;
		zoom = zoom || _zoom;

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

	cylinder.shader = 
		"rr*cos(theta) + rp*sin(rrr*theta) * zoom,"+
		"rr*sin(theta) - rp*sin(rrr*theta) * zoom,"+
		"rr*cos(theta) + rp*cos(rrr*theta) * zoom";

	//------------------------------------------------------
	//A ribbon!
	var ribbon = function(R,r,p,step,zoom) {
		step = step || _step;
		zoom = zoom || _zoom;


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

	ribbon.shader = 
		"rr*tan(theta) + rp*tan(rrr*theta) * zoom,"+
		"rr*sin(theta) - rp*cos(rrr*theta) * zoom,"+
		"rr*tan(theta) + rp*sin(rrr*theta) * zoom";


	//------------------------------------------------------
	//A river!
	var river = function(R,r,p,step,zoom) {
		step = step || _step;
		zoom = zoom || _zoom;

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

	river.shader = 
		"rr*tan(theta) + rp*tan(rrr*theta) * zoom,"+
		"rr*sin(theta) - rp*sin(rrr*theta) * zoom,"+
		"rr*tan(theta) + rp*cos(rrr*theta) * zoom";


	//------------------------------------------------------
	//A cross!
	var cross = function(R,r,p,step,zoom) {
		step = step || _step;
		zoom = zoom || _zoom;
		
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

	cross.shader = 
		"rr*sin(theta) + rp*tan(rrr*theta) * zoom,"+
		"rr*tan(theta) - rp*sin(rrr*theta) * zoom,"+
		"rr*sin(theta) + rp*cos(rrr*theta) * zoom";


	//------------------------------------------------------
	//A knee!
	var knee = function(R,r,p,step,zoom) {
		step = step || _step;
		zoom = zoom || _zoom;

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

	knee.shader = 
		"rr*cos(theta) + rp*cos(rrr*theta) * zoom,"+
		"rr*sin(theta) - rp*tan(rrr*theta) * zoom,"+
		"rr*cos(theta) + rp*sin(rrr*theta) * zoom";

	//------------------------------------------------------
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