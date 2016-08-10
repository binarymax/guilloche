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

var rosette = Animate('rosette',0,640,{
	fn : Guilloche.rosette,
	R : 60,
	Rs : 0,
	Rmin : 50,
	Rmax : 50,
	r : -0.25,
	rs : 0.0001,
	rmin : -0.40,
	rmax : -0.10,
	p : 30,
	ps : 0.1,
	pmin : 8,
	pmax : 16,
	step : 0.001,
	classic : true
});

var knee = Animate('knee',0,640,{
	fn : Guilloche.knee,
	R : 50,
	Rs : 0,
	Rmin : 50,
	Rmax : 50,
	r : -0.25,
	rs : 0.0001,
	rmin : -0.40,
	rmax : -0.10,
	p : 12,
	ps : 0.1,
	pmin : 8,
	pmax : 16
});

var river = Animate('river',0,400,{
	fn : Guilloche.river,
	R : 50,
	Rs : 0,
	Rmin : 50,
	Rmax : 50,
	r : -0.25,
	rs : 0.0001,
	rmin : -0.40,
	rmax : -0.10,
	p : 12,
	ps : 0.1,
	pmin : 8,
	pmax : 16,
	step : 0.0001,
	zoom : 3
});

var cross = Animate('multi1',0,640,[
	{
		fn : Guilloche.cross,
		R : 50,
		Rs : 0,
		Rmin : 50,
		Rmax : 50,
		r : -0.25,
		rs : 0.0001,
		rmin : -0.50,
		rmax : -0.01,
		p : 12,
		ps : 0.1,
		pmin : 4,
		pmax : 20,
		zoom : 4,
		step : 0.0001
	},
	{
		fn : Guilloche.ribbon,
		R : 50,
		Rs : 0,
		Rmin : 50,
		Rmax : 50,
		r : -0.25,
		rs : 0.0001,
		rmin : -0.50,
		rmax : -0.01,
		p : 12,
		ps : 0.1,
		pmin : 4,
		pmax : 20,
		zoom : 4,
		step : 0.0001
	},
	{
		fn : Guilloche.rosette,
		R : 60,
		Rs : 0,
		Rmin : 50,
		Rmax : 50,
		r : -0.25,
		rs : 0.0001,
		rmin : -0.50,
		rmax : -0.01,
		p : 25,
		ps : 0.1,
		pmin : 4,
		pmax : 20,
		zoom : 4,
		step : 0.0001
	}	
]);