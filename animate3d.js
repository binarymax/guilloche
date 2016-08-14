var Animate = (function(){

	var Animator = function(id,width,height,settings) {
		
		var self = this;

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

		this.frame = 0;
		this.ambient = [];

		this.uniforms = [];
		this.attributes = [];
		this.shaders = [];

		
		var fragmentshader = document.getElementById("fragmentshader").innerText;

		for(var i=0;i<settings.length;i++) {
			var set = settings[i];
			var geo = set.fn(set.R, set.r, set.p, set.step, set.zoom);
			
			var vertexshader = document.getElementById("vertexshader_" + set.name).innerText;

			self.uniforms[set.name] = {
				texture:{value:new THREE.TextureLoader().load("circle.png")},
				amplitude:{value:1.0},
				zoom:{value:set.zoom},
				R: {value:set.R},
				Rs:{value:set.Rs},
				r: {value:set.r},
				rs:{value:set.rs},
				p: {value:set.p},
				ps:{value:set.ps}
			};

			self.shaders[set.name] = new THREE.ShaderMaterial({
				uniforms: self.uniforms[set.name],
				vertexShader: vertexshader,
				fragmentShader: fragmentshader
			});
			
			var pts = new THREE.Points( geo, self.shaders[set.name] );
			pts.name = set.name;
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

		var ambient = self.ambient.pop()||0;
		//console.log(ambient);

		for(var i=0;i<self.settings.length;i++) {
			var setting = self.settings[i];
			var object = self.scene.getObjectByName(self.settings[i].name);
			object.rotation.y = time * ((i<4) ? (i+2) : (-(i+2)));
			//object.rotation.x = time * ((i>4) ? (i+2) : (-(i+2)));

			if (setting.Rs) {
				setting.R = (self.uniforms[setting.name].R.value += setting.Rs);
				if(setting.R<=setting.Rmin || setting.R>=setting.Rmax) setting.Rs*=-1;
			}

			if (setting.rs) {
				setting.r = (self.uniforms[setting.name].r.value += setting.rs);
				if(setting.r<=setting.rmin || setting.r>=setting.rmax) setting.rs*=-1;
			}

			if (setting.ps) {
				setting.p = (self.uniforms[setting.name].p.value += setting.ps);
				if(setting.p<=setting.pmin || setting.p>=setting.rmax) setting.ps*=-1;
			}
			

			//Use the microphone to move the points:
			self.uniforms[setting.name].amplitude.value = ambient;
			//console.log(self.uniforms[setting.name].amplitude.value);

		}

		//Rock the boat with a sin wave
		//self.uniforms.amplitude.value = Math.sin(self.frame+=0.05)*50;
		

		self.renderer.render( self.scene, self.camera );
	};

	
	Animator.prototype.listen = function() {
		var self = this;
		mic.listen(function(val){
			if (val instanceof Array) {
				self.ambient = self.ambient.concat(val);
			} else {
				self.ambient.push(val);
			}
		});
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
		a.listen();
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