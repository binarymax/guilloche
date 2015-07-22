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
	var fn = Guilloche.knee;
	var fn2 = Guilloche.ribbon;
	var on = false;

	var R = 50;
	var Rs = 1;
	var Rmin = 1;
	var Rmax = 200;

	var r = -0.25;
	var rs = 0.0001;
	var rmin = -0.40;
	var rmax = -0.10;

	var p = 12;
	var ps = 0.1;
	var pmin = 8;
	var pmax = 16;

	var img = Pixels('canvas',Guilloche.width,Guilloche.height);

	var render = function() {

		//R += Rs;
		//if(R<=Rmin || R>=Rmax) Rs*=-1;

		r += rs;
		if(r<=rmin || r>=rmax) rs*=-1;

		p += ps;
		if(p<=pmin || p>=rmax) ps*=-1;

		img.clean();
		//Guilloche.knee(img, 50, r, 12);
		//Guilloche.rosette(img, 50, r, 25);
		fn(img, R, r, p);
		fn2(img, R, r, p);
		img.render();
	};

	var loop = function() {
		requestAnimFrame(loop);
		if(on) render();
	};

	var preview = function(){
		fn(img, 50, r, 12);
		img.render();
	}

	var toggle = function(){
		on = !on;
	};

	loop();

	return {
		toggle:toggle,
		preview:preview

	}

})();
