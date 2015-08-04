var TextureLoader = (function() {

	var textureLoader = function() {
		this.textures = [];
	}

	textureLoader.prototype.load = function(textureLabels) {
		// ensure list is empty, just in case load() is called multiple times
		this.textures = [];

		var that = this;
		_.each(textureLabels, function(texture) {

			var newTexture = new Texture({
				texturePath: 'images/{0}.png'.replace('{0}', texture),
				normalsPath: 'images/{0}Normals.png'.replace('{0}', texture),
				loader: loader,		
			});

			that.textures[texture] = newTexture;
		});
	}



	return textureLoader;

})();