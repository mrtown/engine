GlobalConstants = (function() {
	
	var globalConstants = function() {
		this.TILE_COUNT = 10;
		this.X_OFFSET = 900;
		this.TILE_WIDTH = 128;
		this.TILE_HEIGHT = 64
		this.TILE_WIDTH_HALF = this.TILE_WIDTH / 2;
		this.TILE_HEIGHT_HALF = this.TILE_HEIGHT / 2;
	}

	return globalConstants;

})();