var mic = (function() {

	var context;
	var microphone;
	var filter;
	var analyzer;
	var listener;

	navigator.getUserMedia =navigator.getUserMedia       ||
							navigator.webkitGetUserMedia ||
							navigator.mozGetUserMedia    ||
							navigator.msGetUserMedia;

	var audiocontext = window.AudioContext || window.webkitAudioContext;

	var onStream = function(stream) {

		microphone = context.createMediaStreamSource(stream);
		analyser = context.createAnalyser();
		microphone.connect(analyser);
		requestAnimationFrame(analyze);
	};

	var onError = function(e) {
		console.error('No microphone!');
	};

	var analyze = function() {
		var data = new Uint8Array(analyser.frequencyBinCount);
		analyser.getByteTimeDomainData(data);
		for(var i = 0; i < data.length; i++) {
			listener(data[i]-128);
		}
		requestAnimationFrame(analyze);
	};

	var listen = function(callback) {
		listener = (typeof callback === 'function') ? callback : null;
		if (listener) {
			context = new audiocontext();
			context.createGain = context.createGainNode;
			context.createDelay = context.createDelayNode;
			context.createScriptProcessor = context.createJavaScriptNode;
			navigator.getUserMedia( {audio: true}, onStream, onError);
		} else {
			throw new Error("Listener callback not defined");
		}
	}

return {listen:listen}

})();