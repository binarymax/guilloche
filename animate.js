//------------------------------------------------------------------
//Animation Frame Polyfill
window.requestAnimFrame = (function(){ return (
	window.requestAnimationFrame       ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame    ||
	function(callback) {
  		window.setTimeout(callback, 1000 / 60);
	}
);})();

//------------------------------------------------------------------

var Animate = (function(){

	var Animator = function(id,width,height,settings) {
		var self = this;
		this.img = Pixels(id,width||Guilloche.width,height||Guilloche.height,settings.classic);
		this.can = document.getElementById(id);
		this.settings = (settings instanceof Array) ? settings:[settings];
		this.on = false;
		this.render();
		this.loop();
		this.can.onclick = function(e){ self.toggle(); };
	};

	Animator.prototype.render = function() {
		var self = this;
		self.img.clean();
		self.settings = self.settings.map(function(settings){
			settings.fn(self.img, settings.R, settings.r, settings.p, settings.step, settings.zoom);
			if(settings.Rs) {
				settings.R += settings.Rs;
				if(settings.R<=settings.Rmin || settings.R>=settings.Rmax) settings.Rs*=-1;
			}

			if(settings.rs) {
				settings.r += settings.rs;
				if(settings.r<=settings.rmin || settings.r>=settings.rmax) settings.rs*=-1;
			}

			if(settings.ps) {
				settings.p += settings.ps;
				if(settings.p<=settings.pmin || settings.p>=settings.rmax) settings.ps*=-1;
			}
			return settings;
		});
		self.img.render();
	};

	Animator.prototype.loop = function() {
		var self = this;
		requestAnimFrame(function(){self.loop();});
		if (self.on) self.render();
	};

	Animator.prototype.toggle = function(){
		this.on = !this.on;
	};

	return function(id,width,height,settings) {
		return new Animator(id,width,height,settings);
	}

})();