var Sprite = (function() {

	// private statics

	// constructor	
	var sprite = function(args) {
		var _this = this;

		if (args) {
			_this.texture = args.texture;
			_this.isLightable = args.isLightable;
			_this.x = args.x || 0;
			_this.y = args.y || 0;
			_this.drawOrder = args.drawOrder || 0;
			_this.castsShadow = args.castsShadow;
		}
		else
			throw new Error('Sprite requires an argument hash');
	}

	sprite.prototype.getCleanData = function() {
		if (this.cache == undefined) {
			var data = this.texture.cleanContext.getImageData(0, 0, this.texture.width, this.texture.height);
			this.cache = data;
			this.dataCache = new Uint8ClampedArray(data.data);
		} 

		this.cache.data.set(new Uint8ClampedArray(this.dataCache));
		return this.cache;	
	}

	return sprite;
})();