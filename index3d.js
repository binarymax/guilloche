(function(){

	var inc = Math.tau/10000000;
	var ind = Math.tau/1000000;

	var cross = { 
		name:'cross', fn:Guilloche.cross,
		R:314/2, Rs:inc, Rmin:1, Rmax:314, r:-0.25, rs:inc, rmin:-0.50, rmax:-0.01, p:12, ps:inc, pmin:4, pmax:20, zoom:20, step:0.00003
	};
	var cylinder = { 
		name:'cylinder', fn:Guilloche.cylinder,
		R:314/2, Rs:inc, Rmin:1, Rmax:314, r:-0.25, rs:inc, rmin:-0.50, rmax:-0.01, p:12, ps:inc, pmin:4, pmax:20, zoom:20, step:0.00005
	};
	var ribbon = { 
		name:'ribbon', fn:Guilloche.ribbon,
		R:60,    Rs:ind, Rmin:40, Rmax:120, r:-0.25, rs:ind, rmin:-0.50, rmax:-0.01, p:12, ps:ind, pmin:4, pmax:20, zoom:8, step:0.0001
	};
	var rosette = { 
		name:'rosette', fn:Guilloche.rosette,
		R:73,    Rs:inc, Rmin:1, Rmax:157, r:-0.25, rs:inc, rmin:-0.50, rmax:-0.01, p:25, ps:inc, pmin:4, pmax:20, zoom:20, step:0.00005
	};
	var river = { 
		name:'river', fn:Guilloche.river,
		R:70,    Rs:inc, Rmin:60, Rmax:80, r:-0.25, rs:inc, rmin:-0.50, rmax:-0.01, p:25, ps:inc, pmin:4, pmax:20, zoom:12, step:0.00005
	};
	var knee = { 
		name:'knee', fn:Guilloche.knee,
		R:500,   Rs:ind, Rmin:400, Rmax:600, r:-0.25, rs:ind, rmin:-0.50, rmax:-0.01, p:25, ps:ind, pmin:4, pmax:20, zoom:20, step:0.0001
	};
	var shell = { 
		name:'shell', fn:Guilloche.shell,
		R:60,    Rs:inc, Rmin:40, Rmax:120, r:-0.5, rs:inc, rmin:-1.50, rmax:-0.01, p:25, ps:inc, pmin:4, pmax:20, zoom:10, step:0.0001
	};

	var models = [];

	if(1) models.push(knee);
	if(1) models.push(cross);
	if(1) models.push(cylinder);
	if(1) models.push(ribbon);
	if(1) models.push(rosette);
	if(1) models.push(river);
	if(1) models.push(shell);

	var ambiance = Animate('guilloche',window.innerWidth,window.innerHeight,models);

})()