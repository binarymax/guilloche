Math.tau = Math.PI*2;

var Guilloche = (function(){

	var _step = 0.0001;
	var _zoom = 5;

	var geobuffer = function(pos0,pos1,pos2) {
		return function(R,r,p,step,zoom){

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
				positions[i+0] = pos0(rr,rp,rrr,theta,zoom);
				positions[i+1] = pos1(rr,rp,rrr,theta,zoom);
				positions[i+2] = pos2(rr,rp,rrr,theta,zoom);
				theta+=step;
			}

			geometry.addAttribute('position',new THREE.BufferAttribute(positions,3));
			geometry.addAttribute('theta',new THREE.BufferAttribute(thetas,1));

			return geometry;

		}
	}

	//------------------------------------------------------
	//A rosette!
	var rosette = geobuffer(
			function(rr,rp,rrr,theta,zoom) { return ((rr*Math.cos(theta)) + (rp*Math.cos(rrr*theta))) * zoom;},
			function(rr,rp,rrr,theta,zoom) { return ((rr*Math.sin(theta)) - (rp*Math.sin(rrr*theta))) * zoom;},
			function(rr,rp,rrr,theta,zoom) { return ((rr*Math.sin(theta)) + (rp*Math.cos(rrr*theta))) * zoom;}
		);

		rosette.shader = 
			"rr*cos(theta) + rp*cos(rrr*theta) * zoom,"+
			"rr*sin(theta) - rp*sin(rrr*theta) * zoom,"+
			"rr*sin(theta) + rp*cos(rrr*theta) * zoom";

	//------------------------------------------------------
	//A shell!
	var shell = geobuffer(
			function(rr,rp,rrr,theta,zoom) { return ((rr*Math.cos(theta)) + (rp*Math.cos(rrr*theta))) * zoom;},
			function(rr,rp,rrr,theta,zoom) { return ((rr*Math.sin(theta)) + (rp*Math.sin(rrr*theta))) * zoom;},
			function(rr,rp,rrr,theta,zoom) { return ((rr*Math.tan(theta)) + (rp*Math.tan(rrr*theta))) * zoom;}
		);

		shell.shader = 
			"rr*cos(theta) + rp*cos(rrr*theta) * zoom,"+
			"rr*sin(theta) + rp*sin(rrr*theta) * zoom,"+
			"rr*tan(theta) + rp*tan(rrr*theta) * zoom";

	//------------------------------------------------------
	//A cylinder!
	var cylinder = geobuffer(
			function(rr,rp,rrr,theta,zoom) { return ((rr*Math.cos(theta)) + (rp*Math.sin(rrr*theta))) * zoom;},
			function(rr,rp,rrr,theta,zoom) { return ((rr*Math.sin(theta)) - (rp*Math.sin(rrr*theta))) * zoom;},
			function(rr,rp,rrr,theta,zoom) { return ((rr*Math.cos(theta)) + (rp*Math.cos(rrr*theta))) * zoom;}
		);

		cylinder.shader = 
			"rr*cos(theta) + rp*sin(rrr*theta) * zoom,"+
			"rr*sin(theta) - rp*sin(rrr*theta) * zoom,"+
			"rr*cos(theta) + rp*cos(rrr*theta) * zoom";

	//------------------------------------------------------
	//A ribbon!
	var ribbon = geobuffer(
			function(rr,rp,rrr,theta,zoom) { return ((rr*Math.tan(theta)) + (rp*Math.tan(rrr*theta))) * zoom;},
			function(rr,rp,rrr,theta,zoom) { return ((rr*Math.sin(theta)) - (rp*Math.cos(rrr*theta))) * zoom;},
			function(rr,rp,rrr,theta,zoom) { return ((rr*Math.tan(theta)) + (rp*Math.sin(rrr*theta))) * zoom;}
		);

		ribbon.shader = 
			"rr*tan(theta) + rp*tan(rrr*theta) * zoom,"+
			"rr*sin(theta) - rp*cos(rrr*theta) * zoom,"+
			"rr*tan(theta) + rp*sin(rrr*theta) * zoom";


	//------------------------------------------------------
	//A river!
	var river = geobuffer(
			function(rr,rp,rrr,theta,zoom) { return ((rr*Math.tan(theta)) + (rp*Math.tan(rrr*theta))) * zoom;},
			function(rr,rp,rrr,theta,zoom) { return ((rr*Math.sin(theta)) - (rp*Math.sin(rrr*theta))) * zoom;},
			function(rr,rp,rrr,theta,zoom) { return ((rr*Math.tan(theta)) + (rp*Math.cos(rrr*theta))) * zoom;}
		);

		river.shader = 
			"rr*tan(theta) + rp*tan(rrr*theta) * zoom,"+
			"rr*sin(theta) - rp*sin(rrr*theta) * zoom,"+
			"rr*tan(theta) + rp*cos(rrr*theta) * zoom";


	//------------------------------------------------------
	//A cross!
	var cross = geobuffer(
			function(rr,rp,rrr,theta,zoom) { return ((rr*Math.sin(theta)) + (rp*Math.tan(rrr*theta))) * zoom;},
			function(rr,rp,rrr,theta,zoom) { return ((rr*Math.tan(theta)) - (rp*Math.sin(rrr*theta))) * zoom;},
			function(rr,rp,rrr,theta,zoom) { return ((rr*Math.sin(theta)) + (rp*Math.cos(rrr*theta))) * zoom;}
		);

		cross.shader = 
			"rr*sin(theta) + rp*tan(rrr*theta) * zoom,"+
			"rr*tan(theta) - rp*sin(rrr*theta) * zoom,"+
			"rr*sin(theta) + rp*cos(rrr*theta) * zoom";


	//------------------------------------------------------
	//A knee!
	var knee = geobuffer(
			function(rr,rp,rrr,theta,zoom) { return ((rr*Math.cos(theta)) + (rp*Math.cos(rrr*theta))) * zoom;},
			function(rr,rp,rrr,theta,zoom) { return ((rr*Math.sin(theta)) - (rp*Math.tan(rrr*theta))) * zoom;},
			function(rr,rp,rrr,theta,zoom) { return ((rr*Math.cos(theta)) + (rp*Math.sin(rrr*theta))) * zoom;}
		);
	
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