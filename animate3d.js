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

		
		var vertextemplate = document.getElementById("vertextemplate").innerText;
		var fragmentshader = document.getElementById("fragmentshader").innerText;

		for(var i=0;i<settings.length;i++) {
			var set = settings[i];
			var geo = set.fn(set.R, set.r, set.p, set.step, set.zoom);
			
			var vertexshader = vertextemplate.replace('{{model}}',set.fn.shader);

			self.uniforms[set.name] = {
				texture:{value:new THREE.TextureLoader().load("circle.png")},
				amplitude:{value:1.0},
				zoom:{value:set.zoom*1.0},
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

		this.on = true;

		window.addEventListener( 'resize', function onWindowResize() {

			self.width = window.innerWidth;
			self.height = window.innerHeight;
			self.halfx = window.innerWidth / 2;
			self.halfy = window.innerHeight / 2;

			self.camera.aspect = self.width / self.height;
			self.camera.updateProjectionMatrix();

			self.renderer.setSize( self.width, self.height );

		}, false );


		document.documentElement.requestFullscreen = document.documentElement.requestFullscreen || 
			document.documentElement.webkitRequestFullscreen || 
			document.documentElement.mozRequestFullScreen || 
			document.documentElement.webkitRequestFullscreen;

		document.exitFullscreen = document.exitFullscreen || 
			document.webkitExitFullscreen || 
			document.mozCancelFullScreen || 
			document.webkitExitFullscreen;

		function toggleFullScreen() {
			if (!document.fullscreenElement) {
				document.documentElement.requestFullscreen();
			} else {
				if (document.exitFullscreen) {
					document.exitFullscreen(); 
				}
			}
		}

		document.addEventListener("keydown", function(e) {
			if (e.keyCode == 13) {
				toggleFullScreen();
			}
		}, false);
	};

	Animator.prototype.render = function() {
		var self = this;
		var time = Date.now() * 0.0000000000005;
		self.camera.position.x += ( self.mouseX - self.camera.position.x ) * 0.05;
		self.camera.position.y += ( - self.mouseY - self.camera.position.y ) * 0.05;
		self.camera.lookAt( self.scene.position );

		var ambient = Math.max((self.ambient.pop()||0)/2,0);

		var axi = ['y','x','z'];
		for(var i=0;i<self.settings.length;i++) {
			var setting = self.settings[i];
			var object = self.scene.getObjectByName(self.settings[i].name);
			var div = ambient||1;
			var rot = (div/(Math.PI*100-Math.PI*50));
			var def = Math.tau/(360*12);
			var prp = axi[i%2];
			object.rotation[prp] += (rot>0?Math.max(rot,def):Math.min(rot,-def)) * (i%2?-1:1);// + ((i+1)*def/2);
			//object.rotation.x += (rot>0?Math.max(rot,def):Math.min(rot,-def)) * (i%2?-1:1);// + ((i+1)*def/2);
			//object.rotation.z += (rot>0?Math.max(rot,def):Math.min(rot,-def)) * (i%2?-1:1);// + ((i+1)*def/2);
			//object.rotation.y = time * ((i<4) ? (i+2) : (-(i+2)));
			//object.rotation.x = time * ((i>4) ? (i+2) : (-(i+2)));
			//object.rotation.z = time * ((i>4) ? (i+3) : (-(i+3)));

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

})();