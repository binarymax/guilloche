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