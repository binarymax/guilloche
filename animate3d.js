var Animate = (function(){

	var Animator = function(id,width,height,settings) {
		this.settings = (settings instanceof Array) ? settings:[settings];

		width = width || window.innerWidth;
		height = height || window.innerHeight;

		this.mouseX = 0;
		this.mouseY = 0;
		this.width = width;
		this.height = height;
		this.halfX = width>>1;
		this.halfY = height>>1;

		this.container = document.getElementById(id);
		this.camera = new THREE.PerspectiveCamera( 75, width / height, 1, 3000 );
		this.camera.position.z = 1000;
		this.scene = new THREE.Scene();

		this.materials = new THREE.PointsMaterial( { size: 1 } );

		for(var i=0;i<settings.length;i++) {
			var set = settings[i];
			var geo = set.fn(set.R, set.r, set.p, set.step, set.zoom);
			var pts = new THREE.Points( geo, this.materials );
			this.scene.add( pts );
		}

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( width, height );
		this.container.appendChild( this.renderer.domElement );

		//document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		//document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		//document.addEventListener( 'touchmove', onDocumentTouchMove, false );
		//window.addEventListener( 'resize', onWindowResize, false );

		this.on = true;

	};

	Animator.prototype.render = function() {
		var self = this;
		var time = Date.now() * 0.00005;
		self.camera.position.x += ( self.mouseX - self.camera.position.x ) * 0.05;
		self.camera.position.y += ( - self.mouseY - self.camera.position.y ) * 0.05;
		self.camera.lookAt( self.scene.position );

		for ( i = 0; i < self.scene.children.length; i++ ) {
			var object = self.scene.children[i];
			if (object instanceof THREE.Points) {
				object.rotation.y = time * ((i<4) ? (i+1) : (-(i+1)));
			}
		}

		self.renderer.render( self.scene, self.camera );
	};

	Animator.prototype.loop = function() {
		var self = this;
		requestAnimationFrame(function(){self.loop();});
		if (self.on) self.render();
	};

	Animator.prototype.toggle = function(){
		this.on = !this.on;
	};

	return function(id,width,height,settings) {
		var a = new Animator(id,width,height,settings);
		a.loop();
		return a;
	}


	/*
	function onWindowResize() {
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}

	function onDocumentMouseMove( event ) {
		mouseX = event.clientX - windowHalfX;
		mouseY = event.clientY - windowHalfY;
	}

	function onDocumentTouchStart( event ) {
		if ( event.touches.length === 1 ) {
			event.preventDefault();
			mouseX = event.touches[ 0 ].pageX - windowHalfX;
			mouseY = event.touches[ 0 ].pageY - windowHalfY;
		}
	}

	function onDocumentTouchMove( event ) {
		if ( event.touches.length === 1 ) {
			event.preventDefault();
			mouseX = event.touches[ 0 ].pageX - windowHalfX;
			mouseY = event.touches[ 0 ].pageY - windowHalfY;
		}
	}
	*/

})();