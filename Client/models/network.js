var Network = (function() {

	// parameter: server - should be both address and port
	var network = function(args) {
		
		if (args) {
				this.server = args.server;
				this.processMessageCallback;
				this.webSocket = undefined;
				this.loader = args.loader;
		}
		else
			throw new Error('Network requires an argument hash');

		this.initialize();

	}		

	network.prototype.receiveMessage = function(message) {
        var data = message.data;
        var value = JSON.parse(data);
        if (this.processMessageCallback)
        		this.processMessageCallback(value);
	}

	network.prototype.initialize = function() {
		this.webSocket = new WebSocket('ws://' + this.server);
        this.webSocket.onmessage = this.receiveMessage;

        this.webSocket.onopen = function() {
        	console.log('websocket connection established.');
        	loader();
        }

        this.webSocket.onclose = function() {
        	console.log('websocket connection closed.');
        }
	}

	network.prototype.sendMessage = function(message) {
		this.webSocket.send(message);
	}

	return network;

})();