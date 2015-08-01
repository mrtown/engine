var GameClient = (function() {

		var gameClient = function() {

		}

		gameClient.prototype.processResponse = function(payload) {
			console.log('gameClient is processing payload');
		}
		
		return gameClient;

})();