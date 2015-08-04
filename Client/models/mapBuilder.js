var MapBuilder = (function() {
    
	var mapBuilder = function() {

	}


	mapBuilder.prototype.build = function() {

		var tiles = [];
		var tileTexture = new Texture({
			texturePath: 'images/block.png',
			normalsPath: 'images/blockNormals.png',
			loader: loader,		
		});

		var drawOrder = -10000;
		for(var x = 0; x < globalConstants.TILE_COUNT; x++)
			for(var y = 0; y < globalConstants.TILE_COUNT; y++) {
				var isoX = (x - y) * globalConstants.TILE_WIDTH_HALF;
				var isoY = (x + y) * globalConstants.TILE_HEIGHT_HALF;
				var tile = new Sprite({
					texture: tileTexture,	
					isLightable: false,
					castsShadow: false,
					drawOrder: drawOrder++,
					x: isoX - globalConstants.TILE_WIDTH_HALF + globalConstants.X_OFFSET, 
					y: isoY
				});		
				
				tiles.push(tile);
			}	

		return tiles;
	}

	return mapBuilder;
})();