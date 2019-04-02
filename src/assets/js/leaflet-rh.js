import zrender from 'zrender';
/**
 * zrender shape extend: WindVane
 */
zrender['WindVane'] = zrender.Path.extend({
  type: 'windVane',

  shape: {
    x: 0,
    y: 0,
    speed: 0,
    width: 8,
    height: 25
  },

  buildPath: function (ctx, shape) {
    var x = shape.x;
    var y = shape.y;
    var width = shape.width;
    var height = shape.height;
    var speed = shape.speed;
    var dir = shape.dir;

    if (speed != null && speed > 0) {
      ctx.moveTo(x, y);
      ctx.lineTo(x, y - height);

      var wholeLines = Math.floor(speed / 4);
      var halfLine = ((speed % 4) > 0);

      var carriage = height;
      var interval = width / 2;
      var _wholeLines = wholeLines;
      var xShift = width;
      var yShift = xShift * Math.tan(30 * Math.PI / 180);
      for (var i = 0; i < wholeLines; i++) {
        ctx.moveTo(x, y - carriage);
        if (_wholeLines >= 5) {
          ctx.lineTo(x + xShift, y - carriage);
          ctx.lineTo(x, y - carriage + yShift);
          ctx.fill();
          i += 4;
          _wholeLines -= 5;
          carriage -= yShift;
        } else {
          ctx.lineTo(x + xShift, y - carriage - yShift);
          carriage -= interval;
        }

      }

      if (halfLine) {
        if (wholeLines == 0) carriage -= interval;
        ctx.moveTo(x, y - carriage);
        ctx.lineTo(x + xShift / 2 + 1, y - carriage - yShift / 2);
      }

      ctx.stroke();
    }
  }
});


/**
 * Leaflet RiHang Extentions
 */
L.RH = {
  Util: {
    getWindSpeedAndDegree: function (u, v) {
      var speed = Math.sqrt(u * u + v * v);
      var dir = 0;

      if (u == 0) {
        dir = v < 0 ? 0 : 180;
      } else {
        dir = Math.atan(v / u) / Math.PI * 180;
        dir = u > 0 ? (270 - dir) : (90 - dir);
      }
      return { speed: speed, dir: dir };
    },

    isNationalStationId: function (stationId) {
      if (!stationId) {
        return false;
      }

      if (stationId.length === 6) {
        return true;
      }

      if (stationId.charAt(0) >= 'A' && stationId.charAt(0) <= 'Z') {
        return true;
      }

      return false
    },

    graddingStationDataWithZoom: function (datas, map, options) {
      var defaultOptions = {
        cellSize: 60,
        includeShowAnyway: true
      };

      for (var key in options) {
        defaultOptions[key] = options[key];
      }

      var sortedDatas = datas.sort(function compareNumbers(a, b) {
        if (a.showAnyway === true && b.showAnyway === true) {
          return 0;
        } else if (a.showAnyway === true) {
          return 1;
        } else if (b.showAnyway === true) {
          return -1;
        } else {
          if (L.RH.Util.isNationalStationId(a.stationId) && L.RH.Util.isNationalStationId(b.stationId)) {
            return 0;
          } else if (L.RH.Util.isNationalStationId(a.stationId)) {
            return 1;
          } else if (L.RH.Util.isNationalStationId(b.stationId)) {
            return -1;
          }

          return 0;
        }
      });

      var ret = [];

      var existBounds = [];

      sortedDatas.forEach(function (element) {
        var pixelPoint = map.latLngToContainerPoint([element.lat, element.lng]);
        var eleBound = L.bounds(L.point(pixelPoint.x - defaultOptions.cellSize / 2, pixelPoint.y - defaultOptions.cellSize / 2), L.point(pixelPoint.x + defaultOptions.cellSize / 2, pixelPoint.y + defaultOptions.cellSize / 2));

        if (element.showAnyway) {
          ret.push(element);

          if (defaultOptions.includeShowAnyway) {
            existBounds.push(eleBound);
          }

        } else {

          var intersects = false;

          for (var i = 0; i < existBounds.length; i++) {
            var oneBound = existBounds[i];

            if (oneBound.intersects(eleBound)) {
              intersects = true;
              return;
            }
          }

          if (!intersects) {
            ret.push(element);
            existBounds.push(eleBound);
          }
        }

      });

      return ret;
    }
  }
}

L.RH.NoTranslateCanvas = L.Canvas.extend({
  options: {
    padding: 0,
    interactive: true,
  },

  _initContainer: function () {
    L.Canvas.prototype._initContainer.call(this);
    if (!this.options.interactive)
      this._container.style.pointerEvents = 'none';
  },

  _update: function () {
    if (this._map._animatingZoom && this._bounds) {
      return;
    }

    this._drawnLayers = {};

    L.Renderer.prototype._update.call(this);

    var b = this._bounds,
      container = this._container,
      size = b.getSize(),
      // m = L.Browser.retina ? 2 : 1;
      m = 1; // modified by helen in 2016/9/30

    L.DomUtil.setPosition(container, b.min);

    // set canvas size (also clearing it); use double size on retina
    container.width = m * size.x;
    container.height = m * size.y;
    container.style.width = size.x + 'px';
    container.style.height = size.y + 'px';

    //if (L.Browser.retina) {
    //    this._ctx.scale(2, 2);
    //    this._ctx.translate(-b.min.x, -b.min.y);
    //}

    // translate so we use the same path coordinates after canvas element moves
    //this._ctx.translate(-b.min.x, -b.min.y);

    // Tell paths to redraw themselves
    // this.fire('update');
  }
});
L.RH.noTranslateCanvas = function (options) {
  return L.Browser.canvas ? new L.RH.NoTranslateCanvas(options) : null;
};


L.RH.ZrCanvas = L.RH.NoTranslateCanvas.extend({
  initialize: function (options) {
    L.RH.NoTranslateCanvas.prototype.initialize.call(this, options);

    this._initZr();
  },

  onAdd: function () {
    this._initZr();

    this.getPane().appendChild(this._container);
    this._update();
  },

  _initZr: function () {
    if (!this._container) {
      this._initContainer(); // defined by renderer implementations

      // if (this._zoomAnimated) {
      //   L.DomUtil.addClass(this._container, 'leaflet-zoom-animated');
      // }

      L.DomUtil.addClass(this._container, 'leaflet-zoom-hide');
    }

    if (this._container) {
      this.zr = zrender.init(this._container);
    }
  }
});
L.RH.zrCanvas = function (options) {
  return L.Browser.canvas ? new L.RH.ZrCanvas(options) : null;
};

L.RH.CanvasLayer = L.Path.extend({
  options: {
    renderer: L.RH.noTranslateCanvas()
  },

  getEvents: function () {
    return {
      zoomend: this._zoomend,
      moveend: this._update
    };
  },

  beforeAdd: function (map) {
    this._map = map;
    L.Path.prototype.beforeAdd.call(this, map);
  },

  onAdd: function () {
    this._renderer = this._map.getRenderer(this);
    this._update();
  },

  onRemove: function () {
    if (this._map.hasLayer(this._renderer))
      this._map.removeLayer(this._renderer);
  },

  _zoomend: function () { },
  _update: L.Util.falseFn(),

  clear: function () {
    var size = this.size = this._renderer._bounds.getSize();
    this._renderer._ctx.clearRect(0, 0, size.x, size.y);
  }

});

L.RH.ZrBaseLayer = L.RH.CanvasLayer.extend({
  options: {
    renderer: null
  },

  initialize: function (options) {
    L.setOptions(this, options);

    if (!this.options.render) {
      this.options.renderer = L.RH.zrCanvas({
        pane: 'overlayPane'
      });
    }
  },

  onRemove: function () {
    this.clear();
    this.rootGroup.removeAll();
    this._renderer.zr.dispose();
  },

  _update: function () {
    if (!this.rootGroup) {
      this.rootGroup = new zrender.Group();
      this._renderer.zr.add(this.rootGroup);
    } else {
      this.rootGroup.removeAll();
    }

    this.rhUpdate(this.rootGroup);
  },

  // Your logic should be here
  rhUpdate: function (rootGroup) {

  }
});

L.RH.zrBaseLayer = function (options) {
  return new L.RH.ZrBaseLayer(options);
};


/**
 * 
 * 使用该功能组件时要遵循的数据格式
 * 
  datas = [{
          stationId: 54511,
          stationName: '气象台',
          lng: 75.77 ,
          lat: 37.98,
          datas: [1, null, 1, null],
          datasVisibilityMask: [true, false, true, false]  //控制要素的显示，与datas一一对应
          showAnyway:true  //true表示显示全部|false表示抽稀
          wind: [u, v],
          stationImageUrl: Math.random() < 0.3 ? './assets/img/ico.png' : null
        }]
 */
L.RH.ZdzLayer = L.RH.ZrBaseLayer.extend({
  // 配置参数
  options: {
    xOffset: 5,
    yOffset: 5,
    showStationName: true,
    showWind:true,
    stationNameColor: 'black',
    datasVisibilityMask: [true, true, true, true, true],
    datasColor: ['#A52A2A', '#0000A0', '#008000', 'black', '#f0f'],  //与datasVisibilityMask一一对应
    graddingOptions: {
      cellSize: 60,
      includeShowAnyway: true
    },
    centerPointColor: 'red',  //当数据中没有stationImageUrl字段或为null时，设置中心圆的颜色
    clickHandler: function (element) { }
  },

  getOptions: function () {
    return this.options;
  },

  setData: function (datas) {
    this.datas = datas;
    this._zoomMapDatas = {};

    this.datas.forEach(function (element) {
      if (element.wind) {
        element.windSD = L.RH.Util.getWindSpeedAndDegree(element.wind[0], element.wind[1])
      }
    }, this);

    if (this.rootGroup) {
      this._update(this.rootGroup);
    }
  },

  addData: function (items) {
    this.datas = this.datas || [];
    this._zoomMapDatas = {};

    var bounds = this._map.getBounds();
    var pixelBounds = L.bounds(this._map.latLngToContainerPoint(bounds.getNorthWest()), this._map.latLngToContainerPoint(bounds.getSouthEast()))

    items.forEach(function(element) {
      if (element.wind) {
        element.windSD = L.RH.Util.getWindSpeedAndDegree(element.wind[0], element.wind[1])
      }

      this.datas.push(element);

      var from = L.latLng(element.lat, element.lng);

      var fromPixel = this._map.latLngToContainerPoint(from);

      if (pixelBounds.contains(fromPixel)) {
        this.drawOne(this.rootGroup, element, fromPixel);
      }
    }, this)
  },

  getData: function() {
    return this.datas;
  },

  refresh: function() {
    this._zoomMapDatas = {};
    
    if (this.rootGroup) {
      this._update(this.rootGroup);
    }
  },

  rhUpdate: function (rootGroup) {
    if (!this.datas) {
      return;
    }

    var filteredDatas = this._zoomMapDatas[this._map.getZoom()];

    if (!filteredDatas) {
      filteredDatas = L.RH.Util.graddingStationDataWithZoom(this.datas, this._map, this.options.graddingOptions);
      this._zoomMapDatas[this._map.getZoom()] = filteredDatas;
    }

    var bounds = this._map.getBounds();
    var pixelBounds = L.bounds(this._map.latLngToContainerPoint(bounds.getNorthWest()), this._map.latLngToContainerPoint(bounds.getSouthEast()))

    filteredDatas.forEach(function (element) {
      var from = L.latLng(element.lat, element.lng);

      var fromPixel = this._map.latLngToContainerPoint(from);

      if (pixelBounds.contains(fromPixel)) {
        this.drawOne(rootGroup, element, fromPixel);
      }
    }, this);

  },

  drawOne: function(rootGroup, element, fromPixel) {
    if (this.options.datasVisibilityMask[0] && element.datas[0] !== undefined && element.datas[0] !== null) {
      rootGroup.add(new zrender.Text({
        style: {
          x: fromPixel.x - this.options.xOffset,
          y: fromPixel.y - this.options.yOffset,
          text: '' + element.datas[0],
          textAlign: 'right',
          textVerticalAlign: 'bottom',
          fontSize: '14',
          textFill: this.options.datasColor[0]
        }
      }));
    }

    if (this.options.datasVisibilityMask[1] && element.datas[1] !== undefined && element.datas[1] !== null) {
      rootGroup.add(new zrender.Text({
        style: {
          x: fromPixel.x + this.options.xOffset,
          y: fromPixel.y - this.options.yOffset,
          text: '' + element.datas[1],
          textAlign: 'left',
          textVerticalAlign: 'bottom',
          fontSize: '14',
          textFill: this.options.datasColor[1]
        }
      }));
    }

    var hasBottomValue = false;

    if (this.options.datasVisibilityMask[2] && element.datas[2] !== undefined && element.datas[2] !== null) {
      rootGroup.add(new zrender.Text({
        style: {
          x: fromPixel.x - this.options.xOffset,  //
          y: fromPixel.y + this.options.yOffset,
          text: '' + element.datas[2],
          textAlign: 'right',
          textVerticalAlign: 'top',
          fontSize: '14',
          textFill: this.options.datasColor[2]
        }
      }));

      hasBottomValue = true;
    }

    if (this.options.datasVisibilityMask[3] && element.datas[3] !== undefined && element.datas[3] !== null) {
      rootGroup.add(new zrender.Text({
        style: {
          x: fromPixel.x + this.options.xOffset,
          y: fromPixel.y + this.options.yOffset,
          text: '' + element.datas[3],
          textAlign: 'left',
          textVerticalAlign: 'top',
          fontSize: '14',
          textFill: this.options.datasColor[3]
        }
      }));

      hasBottomValue = true;
    }

    if (this.options.datasVisibilityMask[4] && element.datas[4] !== undefined && element.datas[4] !== null) {
      rootGroup.add(new zrender.Text({
        style: {
          x: fromPixel.x,
          y: fromPixel.y - this.options.yOffset - 15,
          text: '' + element.datas[4],
          textAlign: 'center',
          textVerticalAlign: 'bottom',
          fontSize: '14',
          textFill: this.options.datasColor[4]
        }
      }));

      hasBottomValue = true;
    }

    if (this.options.showWind && element.windSD) {
    	
      var vaneColor = 'black';
      if (element.vaneColorFn) {
    	  vaneColor = element.vaneColorFn(element.windSD.speed, element.windSD.dir);
      }

      rootGroup.add(new zrender.WindVane({
        style: {
          fill: vaneColor,
          stroke: vaneColor,
          strokeWidth: 1
        },
        shape: {
          speed: element.windSD.speed
        },
        position: [fromPixel.x, fromPixel.y],
        rotation: -Math.PI * (element.windSD.dir / 180)
      }));
    }

    if (this.options.showStationName) {
      var yOffset = this.options.yOffset + 5;

      if (hasBottomValue) {
        yOffset += this.options.yOffset + 5;
      }
      
      rootGroup.add(new zrender.Text({
        style: {
          x: fromPixel.x,
          y: fromPixel.y + yOffset,
          text: '' + element.stationName,
          textAlign: 'center',
          textVerticalAlign: 'top',
          fontSize: '14',
          textFill: this.options.stationNameColor
        }
      }));

    }

    if (element.stationImageUrl) {

      var imgW = typeof element.stationImageWidth == 'number' ? element.stationImageWidth : 14;
      var imgH = typeof element.stationImageHeight == 'number' ? element.stationImageHeight :14;

      rootGroup.add(new zrender.Image({
        style: {
          x: fromPixel.x - imgW / 2,
          y: fromPixel.y - imgH / 2,
          image: element.stationImageUrl,
          width: imgW,
          height: imgH
        },
        onclick: (function () {
          this.options.clickHandler && this.options.clickHandler(element)
        }).bind(this)
      }));
    } else {

      if (element.datas.length) {  //如果不为空数组时才画圆
        rootGroup.add(new zrender.Circle({
          shape: {
            cx: fromPixel.x,
            cy: fromPixel.y,
            r: 3
          },
          style: {
            fill: this.options.centerPointColor
          },
          onclick: (function () {
            this.options.clickHandler && this.options.clickHandler(element)
          }).bind(this)
        }));
      }

    }
  }
});

L.RH.zdzLayer = function (options) {
  return new L.RH.ZdzLayer(options);
};


L.RH.LightningLayer = L.RH.ZrBaseLayer.extend({
  // 配置参数
  options: {
    centerPointColorFn: function(type) {
    	if ('+' === type) {
    		return 'blue';
    	} else if ('-' === type) {
    		return 'blue'; //'red';
    	}
    	
    	return 'blue';
    }
  },

  getOptions: function () {
    return this.options;
  },
  
  parseM4Data: function(rawdata) {
	rawdata = rawdata.trim();
	
	var lines = rawdata.split('\n');
		
	var datas = [];
	
	for (var i = 4; i < lines.length; i++) {
		var line = lines[i];
		
		if (line) {
			line = line.trim();
			
			if (line) {
				var arr = line.split(' ');
				
				if (arr.length === 5) {
					datas.push({
						lng: parseFloat(arr[1]),
						lat: parseFloat(arr[2]),
						type: arr[4]
					})
				}
			}
		}
	}
	
	this.setData(datas);
  },

  setData: function (datas) {
    this.datas = datas;

    if (this.rootGroup) {
      this._update(this.rootGroup);
    }
  },

  getData: function() {
    return this.datas;
  },

  refresh: function() {
    if (this.rootGroup) {
      this._update(this.rootGroup);
    }
  },

  rhUpdate: function (rootGroup) {
    if (!this.datas) {
      return;
    }
    
    this.datas.forEach(function (element) {
      var from = L.latLng(element.lat, element.lng);

      var fromPixel = this._map.latLngToContainerPoint(from);

      this.drawOne(rootGroup, element, fromPixel);
    }, this);

  },

  drawOne: function(rootGroup, element, fromPixel) {
//	  rootGroup.add(new zrender.Text({
//        style: {
//          x: fromPixel.x,
//          y: fromPixel.y,
//          text: '' + element.type,
//          textAlign: 'center',
//          textVerticalAlign: 'middle',
//          fontSize: '14',
//          textFill: this.options.centerPointColorFn(element.type)
//        }
//      }));
	rootGroup.add(new zrender.Circle({
      shape: {
        cx: fromPixel.x,
        cy: fromPixel.y,
        r: 3
      },
      style: {
        fill: this.options.centerPointColorFn(element.type)
      }
    }));
  }
});

L.RH.lightningLayer = function (options) {
  return new L.RH.LightningLayer(options);
};