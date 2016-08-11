var mic = (function() {

	var listener = null;

	/*
	var current = [[0],[0]];
	var id = 0;
	var omax = 0;

	setInterval(function(){

		var od = id;
		id = id?0:1;
		var max = Math.round(Math.max.apply(null,current[od]));

		if (listener) listener(max);

		current[od] = [0];
		omax = max;

	},100);

	*/

	var audioContext = new AudioContext();

	var BUFF_SIZE = 16384;

	var audioInput = null,
		microphone_stream = null,
		gain_node = null,
		script_processor_node = null,
		script_processor_fft_node = null,
		analyserNode = null;

	if(!navigator.getUserMedia)
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
									navigator.mozGetUserMedia || navigator.msGetUserMedia;

	if (navigator.getUserMedia){
		navigator.getUserMedia({audio:true}, 
			function(stream) {
					start_microphone(stream);
			},
			function(e) {
				alert('Error capturing audio.');
			}
		);
	} else { 
		throw new Error('getUserMedia not supported in this browser.');
	}

	function record_data(given_typed_array, num_row_to_display, label) {
		var size_buffer = given_typed_array.length;
		var max_index = num_row_to_display;
		for (var index = 0; index < max_index && index < size_buffer; index += 1) {
			//current[id].push(given_typed_array[index]);
			var val = Math.round(given_typed_array[index]);
			if (listener) listener(val);
		}
	}

	function process_microphone_buffer(event) {

		var i, N, inp, microphone_output_buffer;
		microphone_output_buffer = event.inputBuffer.getChannelData(0); // just mono - 1 channel for now
		// microphone_output_buffer  <-- this buffer contains current gulp of data size BUFF_SIZE
		record_data(microphone_output_buffer, 5, "from getChannelData");
	}

	function start_microphone(stream){

		var volume = document.getElementById('volume');

		gain_node = audioContext.createGain();
		gain_node.connect( audioContext.destination );

		microphone_stream = audioContext.createMediaStreamSource(stream);
		microphone_stream.connect(gain_node); 

		script_processor_node = audioContext.createScriptProcessor(BUFF_SIZE, 1, 1);
		script_processor_node.onaudioprocess = process_microphone_buffer;

		microphone_stream.connect(script_processor_node);

		// --- enable volume control for output speakers

		if (volume) volume.addEventListener('change', function() {

				var curr_volume = this.value;
				gain_node.gain.value = curr_volume;

				console.log("curr_volume ", curr_volume);
		});

		// --- setup FFT

		script_processor_fft_node = audioContext.createScriptProcessor(2048, 1, 1);
		script_processor_fft_node.connect(gain_node);

		analyserNode = audioContext.createAnalyser();
		analyserNode.smoothingTimeConstant = 0;
		analyserNode.fftSize = 2048;

		microphone_stream.connect(analyserNode);

		analyserNode.connect(script_processor_fft_node);

		script_processor_fft_node.onaudioprocess = function() {

			// get the average for the first channel
			var array = new Uint8Array(analyserNode.frequencyBinCount);
			analyserNode.getByteFrequencyData(array);

			// draw the spectrogram
			if (microphone_stream.playbackState == microphone_stream.PLAYING_STATE) {

					record_data(array, 5, "from fft");
			}
		};
	}

	var listen = function(callback) {
		listener = (typeof callback === 'function') ? callback : null;
	}

	return {listen:listen};

})();