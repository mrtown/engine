var Texture = (function() {

	var texture = function(args) {

		var _this = this;

		if (args) {
			_this.texturePath = args.texturePath;
			_this.normalsPath = args.normalsPath;		
			_this.loader = args.loader;	
		}
		else
			throw new Error('Texture requires an argument hash');

		// load the texture and the nomals for this sprite
		loadImage(_this.texturePath, function(e) {
			_this.texture = getDataFromImage(this);
			_this.cleanContext = getCleanContext(this);
			_this.loader();
		});

		loadImage(_this.normalsPath, function(e) {			
			var normalsData = getDataFromImage(this);			
			_this.width = normalsData.width;
			_this.height = normalsData.height;
			_this.normals = processNormals(normalsData);
			_this.loader();
		});

	}

    var getDataFromImage = function(img) {
    	var canvas = document.createElement('canvas');
        var ctx = canvas.getContext("2d");
      
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0 ,0);
      
        return ctx.getImageData(0, 0, img.width, img.height);
    }	

	var getCleanContext = function(img) {
    	var canvas = document.createElement('canvas');
        var ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0 ,0);

        return ctx;      
	}

	var processNormals = function(normalsData) {

		var normals = [];
		var width = normalsData.width;
		var height = normalsData.height;
		var data = normalsData.data;

        for(var i = 0; i < (height) * (width) * 4; i += 4) {

            var nx = 255-data[i] * 2;
            var ny = data[i+1] * 2 - 255;
            var nz = data[i+2] * 2 - 255;

            // normalize
            var magInv = 1.0 / Math.sqrt(nx * nx + ny * ny + nz * nz);
            nx *= magInv;
            ny *= magInv;
            nz *= magInv;

            normals.push(nx);
            normals.push(ny);
            normals.push(nz);
        }		

        return normals;
	}	

    var loadImage = function (src, callback) {
        var img = document.createElement('img');
        
        img.onload = callback;
        img.src = src;     
    }	

	return texture;

})();