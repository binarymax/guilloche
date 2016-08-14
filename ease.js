var ease = (function() {

	/*
	t => current frame
	b => start value
	c => change value
	d => duration
	*/

	function linear(t, b, c, d) {
		return c*t/d + b;
	}

	function quadIn(t, b, c, d) {
		t/=d;
		return c*t*t + b;
	};
	
	function quadOut(t, b, c, d) {
		t/=d;
		return -c*t*(t-2) + b;
	};

	function quadInOut(t, b, c, d) {
		t/=d/2;
		if(t<1) return c/2*t*t + b;
		t--;
		return -c/2*(t*(t-2)-1) + b;
	};

	function cubeIn(t, b, c, d) {
		t/=d;
		return c*t*t*t + b;		
	};

	function cubeOut(t, b, c, d) {
		t/=d;
		t--;
		return c*(t*t*t+1) + b;
	};

	function cubeInOut(t, b, c, d) {
		t/=d/2;
		if(t<1) return c/2*t*t*t + b;
		t-=2;
		return c/2*(t*t*t+2) + b;
	};

	function quartIn(t, b, c, d) {
		t/=d;
		return c*t*t*t*t + b;
	};

	function quartOut(t, b, c, d) {
		t/=d;
		t--;
		return -c*(t*t*t*t-1) + b;
	};

	function quartInOut(t, b, c, d) {
		t/=d/2;
		if(t<1) return c/2*t*t*t*t + b;
		t-=2;
		return -c/2*(t*t*t*t-2) + b;
	};

	function quintIn(t, b, c, d) {
		t/=d;
		return c*t*t*t*t*t + b;
	};

	function quintOut(t, b, c, d) {
		t/=d;
		t--;
		return c*(t*t*t*t*t+1) + b;
	};

	function quintInOut(t, b, c, d) {
		t/=d/2;
		if(t<1) return c/2*t*t*t*t*t + b;
		t-=2;
		return c/2*(t*t*t*t*t+2) + b;
	};

	function sinIn(t, b, c, d) {
		t/=d;
		return -c * Math.cos(t*(Math.PI/2)) + c + b;
	};

	function sinOut(t, b, c, d) {
		t/=d;
		return c * Math.sin(t*(Math.PI/2)) + b;
	};

	function sinInOut(t, b, c, d) {
		t/=d;
		return -c/2 * (Math.cos(Math.PI*t)-1) + b;
	};

	function expIn(t, b, c, d) {
		t=(t/d-1)*10;
		return c * Math.pow(2,t) + b;
	};

	function expOut(t, b, c, d) {
		t=-10*t/d;
		return c * (-Math.pow(2,t) + 1) + b;
	};

	function expInOut(t, b, c, d) {
		t/=d/2;
		if(t<1) return c/2*Math.pow(2,10*(t-1)) + b;
		t--;
		return c/2*(-Math.pow(2,-10*t)+2) + b;
	};

	function sigIn(t, b, c, d) {
		//TODO sigmoidal
	};

	function sigOut(t, b, c, d) {
		//TODO sigmoidal
	};

	function sigInOut(t, b, c, d) {
		//TODO sigmoidal
	};

	function gravIn(t, b, c, d) {
		//TODO gravity
	};

	function gravOut(t, b, c, d) {
		//TODO gravity
	};

	function gravInOut(t, b, c, d) {
		//TODO gravity
	};

	//------------------------------------------------

	/*------------------------------------------------
	Memoized and Weighted Interpolation
	Copyright(c) 2016, Max Irwin
	MIT License
	-------------------------------------------------*/

	var interpolate = function(start, end, steps, round, form) {
		if (steps<3 || start===end) return [start,end];
		var i = [start];

		var t = 1;
		var b = start;
		var c = end-start;

		var k = (form(steps-2,b,c,steps-2)===end)?1:2;
		var d = steps-k;
		
		while (t<=d) {
			v = form(t,b,c,d);
			r = round?Math.round(v):v;
			i.push(r);
			t++;
		}

		if (k===2) i.push(end);

		return i;

	};

	var weight = function(start, end, steps, round, weights) {
		var l = start.length;
		var i = new Array(l);
		for(var z=0;z<l;z++) {
			var b = start[z];
			var c = end[z]-start[z];
			i[z] = new Array(steps);
			for(var x=0;x<steps;x++) {
				var v=weights[x]*c+b;
				i[z][x]=round?Math.round(v):v;
			}
		}
		return l===1?i[0]:i;
	};

	var memos = [];
	var memoize = function(form) {
		var name = form.toString();
		name = '_' + name.substr(9,name.indexOf('(')-9);
		return function(start,end,steps,round) {

			//Coerce individual values into 1 dimensional arrays
		    if (!(start instanceof Array)) start = [start];
		    if (!(end   instanceof Array)) end   = [end];
		    //Make sure dimensions match for start and end
		    if(start.length !== end.length) throw new Error("Dimension mismatch!");

			var hash = steps + name;
			var weights = memos[hash];

			if(!weights) weights = memos[hash] = interpolate(0,1,steps,false,form);

			return weight(start,end,steps,round,weights);

		};
	};	

	//  ------------------------------------------

	return {
		linear:memoize(linear),
		quad:{
			In:memoize(quadIn),
			Out:memoize(quadOut),
			InOut:memoize(quadInOut)
		},
		cube:{
			In:memoize(cubeIn),
			Out:memoize(cubeOut),
			InOut:memoize(cubeInOut)
		},
		quart:{
			In:memoize(quartIn),
			Out:memoize(quartOut),
			InOut:memoize(quartInOut)
		},
		quint:{
			In:memoize(quintIn),
			Out:memoize(quintOut),
			InOut:memoize(quintInOut)
		},
		sin:{
			In:memoize(sinIn),
			Out:memoize(sinOut),
			InOut:memoize(sinInOut)
		},
		exp:{
			In:memoize(expIn),
			Out:memoize(expOut),
			InOut:memoize(expInOut)
		}
	}

})();
