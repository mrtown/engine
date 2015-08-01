var MapBuilder = (function() {
    
	var mapBuilder = function() {
		this.TILE_COUNT = 10;
		this.X_OFFSET = 900;
		this.TILE_WIDTH = 128;
		this.TILE_HEIGHT = 64
		this.TILE_WIDTH_HALF = this.TILE_WIDTH / 2;
		this.TILE_HEIGHT_HALF = this.TILE_HEIGHT / 2;
	}


	mapBuilder.prototype.build = function() {

		var tiles = [];
		var tileTexture = new Texture({
			texturePath: 'images/block.png',
			normalsPath: 'images/blockNormals.png',
			loader: loader,		
		});

		var drawOrder = -10000;
		for(var x = 0; x < this.TILE_COUNT; x++)
			for(var y = 0; y < this.TILE_COUNT; y++) {
				var isoX = (x - y) * this.TILE_WIDTH_HALF;
				var isoY = (x + y) * this.TILE_HEIGHT_HALF;
				var tile = new Sprite({
					texture: tileTexture,	
					isLightable: false,
					castsShadow: false,
					drawOrder: drawOrder++,
					x: isoX - this.TILE_WIDTH_HALF + this.X_OFFSET, 
					y: isoY
				});		
				
				tiles.push(tile);
			}	

		return tiles;
	}

	return mapBuilder;
})();