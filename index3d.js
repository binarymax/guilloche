(function(){

	var cross = {
		name : 'cross',
		fn : Guilloche.cross,
		R : 314/2,
		Rs : Math.tau/10000000,
		Rmin : 1,
		Rmax : 314,
		r : -0.25,
		rs : Math.tau/10000000,
		rmin : -0.50,
		rmax : -0.01,
		p : 12,
		ps : Math.tau/10000000,
		pmin : 4,
		pmax : 20,
		zoom : 20,
		step : 0.00005
	};
	var cylinder = {
		name : 'cylinder',
		fn : Guilloche.cylinder,
		R : 314/2,
		Rs : Math.tau/10000000,
		Rmin : 1,
		Rmax : 314,
		r : -0.25,
		rs : Math.tau/10000000,
		rmin : -0.50,
		rmax : -0.01,
		p : 12,
		ps : Math.tau/10000000,
		pmin : 4,
		pmax : 20,
		zoom : 20,
		step : 0.00005
	};
	var ribbon = {
		name : 'ribbon',
		fn : Guilloche.ribbon,
		R : 60,
		Rs : Math.tau/1000000,
		Rmin : 40,
		Rmax : 120,
		r : -0.25,
		rs : Math.tau/1000000,
		rmin : -0.50,
		rmax : -0.01,
		p : 12,
		ps : Math.tau/1000000,
		pmin : 4,
		pmax : 20,
		zoom : 18,
		step : 0.0001
	};
	var rosette = {
		name : 'rosette',
		fn : Guilloche.rosette,
		R : 73,
		Rs : Math.tau/10000000,
		Rmin : 1,
		Rmax : 157,
		r : -0.25,
		rs : Math.tau/10000000,
		rmin : -0.50,
		rmax : -0.01,
		p : 25,
		ps : Math.tau/10000000,
		pmin : 4,
		pmax : 20,
		zoom : 18,
		step : 0.00005
	};
	var river = {
		name : 'river',
		fn : Guilloche.river,
		R : 70,
		Rs : Math.tau/10000000,
		Rmin : 60,
		Rmax : 80,
		r : -0.25,
		rs : Math.tau/10000000,
		rmin : -0.50,
		rmax : -0.01,
		p : 25,
		ps : Math.tau/10000000,
		pmin : 4,
		pmax : 20,
		zoom : 12,
		step : 0.00005
	};
	var knee = {
		name : 'knee',
		fn : Guilloche.knee,
		R : 500,
		Rs : Math.tau/1000000,
		Rmin : 400,
		Rmax : 600,
		r : -0.25,
		rs : Math.tau/1000000,
		rmin : -0.50,
		rmax : -0.01,
		p : 25,
		ps : Math.tau/1000000,
		pmin : 4,
		pmax : 20,
		zoom : 20,
		step : 0.0001
	};
	var shell = {
		name : 'shell',
		fn : Guilloche.shell,
		R : 60,
		Rs : Math.tau/10000000,
		Rmin : 40,
		Rmax : 120,
		r : -0.5,
		rs : Math.tau/10000000,
		rmin : -1.50,
		rmax : -0.01,
		p : 25,
		ps : Math.tau/10000000,
		pmin : 4,
		pmax : 20,
		zoom : 10,
		step : 0.0001
	};

	var models = [];

	if(1) models.push(cross);
	if(1) models.push(cylinder);
	if(1) models.push(ribbon);
	if(1) models.push(rosette);
	if(1) models.push(river);
	if(1) models.push(knee);
	if(1) models.push(shell);

	var ambiance = Animate('guilloche',window.innerWidth,window.innerHeight,models);

})()