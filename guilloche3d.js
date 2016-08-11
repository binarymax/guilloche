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
		var geometry = new THREE.Geometry();

		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0;theta<Math.tau;theta+=step) {
			var vertex = new THREE.Vector3();
			vertex.x = ((rr*Math.cos(theta)) + (rp*Math.cos(rrr*theta))) * zoom;
			vertex.y = ((rr*Math.sin(theta)) - (rp*Math.sin(rrr*theta))) * zoom;
			vertex.z = ((rr*Math.sin(theta)) + (rp*Math.cos(rrr*theta))) * zoom;
			geometry.vertices.push( vertex );
		}

		return geometry;
	}

	//------------------------------------------------------
	//A shell!
	var shell = function(R,r,p,step,zoom,color) {
		step = step || _step;
		zoom = zoom || _zoom;
		color = color || _color;

		var geometry = new THREE.Geometry();

		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0;theta<Math.tau;theta+=step) {
			var vertex = new THREE.Vector3();
			vertex.x = ((rr*Math.cos(theta)) + (rp*Math.cos(rrr*theta))) * zoom;
			vertex.y = ((rr*Math.sin(theta)) - (rp*Math.sin(rrr*theta))) * zoom;
			vertex.z = ((rr*Math.tan(theta)) + (rp*Math.tan(rrr*theta))) * zoom;
			geometry.vertices.push( vertex );
		}

		return geometry;
	}


	//------------------------------------------------------
	//A cylinder!
	var cylinder = function(R,r,p,step,zoom,color) {
		step = step || _step;
		zoom = zoom || _zoom;
		color = color || _color;

		var geometry = new THREE.Geometry();

		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0;theta<Math.tau;theta+=step) {
			var vertex = new THREE.Vector3();
			vertex.x = ((rr*Math.cos(theta)) + (rp*Math.sin(rrr*theta))) * zoom;
			vertex.y = ((rr*Math.sin(theta)) - (rp*Math.sin(rrr*theta))) * zoom;
			vertex.z = ((rr*Math.cos(theta)) + (rp*Math.cos(rrr*theta))) * zoom;
			geometry.vertices.push( vertex );
		}
		return geometry;
	}

	//------------------------------------------------------
	//A ribbon!
	var ribbon = function(R,r,p,step,zoom,color) {
		step = step || _step;
		zoom = zoom || _zoom;
		color = color || _color;

		var geometry = new THREE.Geometry();

		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0;theta<Math.tau;theta+=step) {
			var vertex = new THREE.Vector3();
			vertex.x = ((rr*Math.tan(theta)) + (rp*Math.tan(rrr*theta))) * zoom;
			vertex.y = ((rr*Math.sin(theta)) - (rp*Math.cos(rrr*theta))) * zoom;
			vertex.z = ((rr*Math.tan(theta)) + (rp*Math.sin(rrr*theta))) * zoom;
			geometry.vertices.push( vertex );
		}

		return geometry;
	}

	//------------------------------------------------------
	//A river!
	var river = function(R,r,p,step,zoom,color) {
		step = step || _step;
		zoom = zoom || _zoom;
		color = color || _color;
		var geometry = new THREE.Geometry();

		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0;theta<Math.tau;theta+=step) {
			var vertex = new THREE.Vector3();
			vertex.x = ((rr*Math.tan(theta)) + (rp*Math.tan(rrr*theta))) * zoom;
			vertex.y = ((rr*Math.sin(theta)) - (rp*Math.sin(rrr*theta))) * zoom;
			vertex.z = ((rr*Math.tan(theta)) + (rp*Math.cos(rrr*theta))) * zoom;
			geometry.vertices.push( vertex );
		}
		return geometry;
	}

	//------------------------------------------------------
	//A cross!
	var cross = function(R,r,p,step,zoom,color) {
		step = step || _step;
		zoom = zoom || _zoom;
		color = color || _color;
		var geometry = new THREE.Geometry();

		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0;theta<Math.tau;theta+=step) {
			var vertex = new THREE.Vector3();
			vertex.x = ((rr*Math.sin(theta)) + (rp*Math.tan(rrr*theta))) * zoom;
			vertex.y = ((rr*Math.tan(theta)) - (rp*Math.sin(rrr*theta))) * zoom;
			vertex.z = ((rr*Math.sin(theta)) + (rp*Math.cos(rrr*theta))) * zoom;
			geometry.vertices.push( vertex );
		}
		return geometry;

	}

	//------------------------------------------------------
	//A knee!
	var knee = function(R,r,p,step,zoom,color) {
		step = step || _step;
		zoom = zoom || _zoom;
		color = color || _color;

		var geometry = new THREE.Geometry();

		var rr = R+r;
		var rp = r+p;
		var rrr = (R+r)/r;
		for(var theta=0,x=0,y=0;theta<Math.tau;theta+=step) {
			var vertex = new THREE.Vector3();
			vertex.x = ((rr*Math.cos(theta)) + (rp*Math.cos(rrr*theta))) * zoom;
			vertex.y = ((rr*Math.sin(theta)) - (rp*Math.tan(rrr*theta))) * zoom;
			vertex.z = ((rr*Math.cos(theta)) + (rp*Math.sin(rrr*theta))) * zoom;
			geometry.vertices.push( vertex );
		}

		return geometry;
	}

	return {
		cylinder:cylinder,
		rosette:rosette,
		ribbon:ribbon,
		river:river,
		cross:cross,
		knee:knee
	}

})();