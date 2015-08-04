var Renderer = (function() {

	var image = new Image();
	image.src = 'images/hover.png';

	var renderer = function(args) {
		var _this = this;

		if (args) {
			_this.sprites = args.sprites;
			_this.lights = args.lights;
			_this.context = args.context;
		} 
		else
			throw new Error('Renderer requires an argument hash');
	}

	renderer.prototype.render = function() {
		var _this = this;

		this.sprites.sort(function(a, b) {
			return a.drawOrder - b.drawOrder;
		})

		// renders sprites and lighting
		for(var spriteIndex=0; spriteIndex<this.sprites.length; spriteIndex++) {
			var sprite = this.sprites[spriteIndex];
			if (sprite.isLightable) 
				_this.renderLight(sprite, _this.lights);
			else {
	        	// disable shadow
	        	this.context.shadowOffsetX = 0;
        		this.context.shadowOffsetY = 0;

				var canvas = document.createElement('canvas');
			    var ctx = canvas.getContext("2d");
			    canvas.width = sprite.texture.width;
			    canvas.height = sprite.texture.height;
			    ctx.putImageData(sprite.texture.texture, 0 ,0);	
				this.context.drawImage(canvas, sprite.x, sprite.y);
			}
		}

		// renders hover indicator
		if (selectedX >= 0 && selectedX < 10 && selectedY >= 0 && selectedY < 10) {

			var isoX = (selectedX - selectedY) * globalConstants.TILE_WIDTH_HALF;
			var isoY = (selectedX + selectedY) * globalConstants.TILE_HEIGHT_HALF;

			_this.context.drawImage(image, isoX - globalConstants.TILE_WIDTH_HALF + globalConstants.X_OFFSET, isoY);	
		}
	
	}

	renderer.prototype.renderLight = function(sprite, lights) {
		console.log('rendering a light');
	    var shiny = 3; 
	    var specularity = 20;
	    var cleanImage = sprite.getCleanData();
	    var data = cleanImage.data;
	    
		var i = 0;
	    var ni = 0;
	    var dx = 0, dy = 0, dz = 0;
		
	    for(var y = sprite.y; y < sprite.texture.height + sprite.y; y++) {
	        for(var x = sprite.x; x < sprite.texture.width + sprite.x; x++) {

	            // get surface normal
	            nx = sprite.texture.normals[ni];
	            ny = sprite.texture.normals[ni+1];
	            nz = sprite.texture.normals[ni+2];

			    for(var lightIndex = 0; lightIndex < lights.length; lightIndex++) {

	                dx = lights[lightIndex].x - x;
	                dy = lights[lightIndex].y - y;
	                dz = 300;

	                // normalize it
	                magInv = 1.0/Math.sqrt(dx*dx + dy*dy + dz*dz);
	                dx *= magInv;
	                dy *= magInv;
	                dz *= magInv;

		            // take the dot product of the direction and the normal
		            // to get the amount of specularity
		            var dot = dx*nx + dy*ny + dz*nz;
		            var spec = Math.pow(dot, 500)*specularity;
		            spec += Math.pow(dot, 4)*shiny;
		            // spec + ambient
		            var intensity = spec + .5;
		            
	           		if (intensity > 1) 
		                for(var channel = 0; channel < 3; channel++) 
		                    //if (channel == lights[lightIndex].color)
		                	    data[i+channel] = Math.round(clamp(data[i+channel]*intensity, 0, 255));		                                		            
		        }

	            i += 4;
	            ni += 3;
	        }
    	}

        // calculate shade
        if (sprite.castsShadow) {
	        var shadeDirection = this.calculateShade(sprite, lights);
			this.context.shadowColor = '#000000';
			this.context.shadowBlur = 8;
			this.context.shadowOffsetX = shadeDirection.x * (shadeDirection.distance > 150 ? 150 : shadeDirection.distance) * .1;
			this.context.shadowOffsetY = shadeDirection.y * (shadeDirection.distance > 150 ? 150 : shadeDirection.distance) * .1;        	
        } else {
        	this.context.shadowOffsetX = 0;
        	this.context.shadowOffsetY = 0;
        }

    	var canvas = document.createElement('canvas');
        var ctx = canvas.getContext("2d");
        canvas.width = sprite.texture.width;
        canvas.height = sprite.texture.height;
        ctx.putImageData(cleanImage, 0 ,0);	
		this.context.drawImage(canvas, sprite.x, sprite.y);
	}

	renderer.prototype.calculateShade = function(sprite, lights) {
		// which light is closest?
		var closestLightIndex = undefined;
		var closestLightDistance = undefined;
		for(var lightIndex=0; lightIndex<lights.length; lightIndex++) {
			var xDiff = (lights[lightIndex].x - sprite.x);
			var yDiff = (lights[lightIndex].y - sprite.y);
			var distance = Math.sqrt(xDiff*xDiff + yDiff*yDiff);

			if (closestLightIndex == undefined || distance < closestLightDistance) {
				closestLightIndex = lightIndex;
				closestLightDistance = distance;
			}
		}

		var x = sprite.x - lights[closestLightIndex].x;
		var y = sprite.y - lights[closestLightIndex].y;

        var magInv = 1.0/Math.sqrt(x*x + y*y);
        x *= magInv;
        y *= magInv;

        return {x: x, y: y, distance: closestLightDistance};       
	}

	var clamp = function(x, min, max) {
	    if (x < min) return min;
	    if (x > max) return max-1;
	    return x;
	}

	return renderer;

})();