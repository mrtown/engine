var Light = (function() {

	var light = function(args) {
		var _this = this;

		if (args) {
			this.x = args.x;
			this.y = args.y;
			this.color = args.color;
		}
		else
			throw new Error('Light requires an argument hash');
	}

	return light;
})();