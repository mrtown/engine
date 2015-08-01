var SpriteBuilder = (function() {
	var spriteBuilder = function() {

	}

	spriteBuilder.prototype.build = function() {
		var sprites = [];

		var deathKnightTexture = new Texture({
			texturePath: 'images/texture.png',
			normalsPath: 'images/normals.png',
			loader: loader,		
		});

		var deathKnight = new Sprite({
			texture: deathKnightTexture,	
			isLightable: true,
			castsShadow: false,
			drawOrder: 1,
			x: 810, 
			y: 220
		});		

		sprites.push(deathKnight);

		return sprites;
	}

	return spriteBuilder;
})();