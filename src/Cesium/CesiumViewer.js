// var Cesium = require("cesium");

class CesiumViewer {

    markerManager = null;

    imageProviders = {

        tdMap: new Cesium.WebMapTileServiceImageryProvider({
            url: "http://t0.tianditu.com/img_w/wmts?",
            layer: "img",
            style: "default",
            format: "tiles",
            tileMatrixSetID: "w",
            credit: new Cesium.Credit("天地图全球影像服务"),
            maximumLevel: 18
        })
    };

    terrainProviders = {
        base: new Cesium.CesiumTerrainProvider({url: "//assets.agi.com/stk-terrain/world", requestVertexNormals: !0})
    };

    _deault = {
        baseLayerPicker: false, //是否显示图层选择器
        fullscreenButton: true,//是否显示全屏按钮
        geocoder: false, //是否显示geocoder小器件，右上角查询按钮
        homeButton: false,   //是否显示Home按钮
        infoBox: false,  //是否显示信息框
        sceneModePicker: false,  //是否显示3D/2D选择器
        timeline: false, //是否显示时间轴
        selectionIndicator: false,   //是否显示选取指示器组件
        navigationHelpButton: false, //是否显示右上角的帮助按钮
        imageryProvider: this.imageProviders.base, //地图影像类型，默认本地
        requestRenderMode: true,
        scene3DOnly: true,
        animation: false,  //是否创建动画小器件，左下角仪表
        terrainProvider: this.terrainProviders.base,
        targetDom: "map_container"
    };

    CesiumViewer(options) {
        var _this = this;

        this.viewer = new Cesium.Viewer(options.targetDom, options);

        this.viewer._cesiumWidget._creditContainer.style.display = "none";

        this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

        if (options.onMapPick) {
            this.onMapPick = options.onMapPick;
        }

        this.handler.setInputAction(function (evt) {
            var pickModel = _this.viewer.scene.pick(evt.position);
            console.log(evt.position);

            if (debug) {
                markerManager.addMarkers(evt.position, "terrianMark");
            }

            if (pickModel) {
                _this.onMapPick && _this.onMapPick(pickModel.id);
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        this.viewer.scene.camera.setView(this.baseView);

        this.markerManager = get3DMarkerManager(this);
    }


    baseView = {
        destination: new Cesium.Cartesian3.fromDegrees(_cache.lng, _cache.lat, 8870.867706),
        orientation: {
            heading: 0.21023546627422757,
            pitch: -0.8953545823730757,
            roll: -0.3926082278098528
        }
    }


    _setCenter(center) {
        _cache.lat = center.lat;
        _cache.lng = center.lng;
        this.baseView.destination = new Cesium.Cartesian3.fromDegrees(_cache.lng, _cache.lat, 8870.867706);
        this.viewer.scene.camera.setView(this.baseView);
    }

    _setZoom(level) {
        _cache.level = level;

        this.baseView.orientation = {
            heading: 0.21023546627422757,
            pitch: -0.8953545823730757,
            roll: -0.3926082278098528
        };
        this.viewer.scene.camera.setView(this.baseView);
    }

    /**
     * 获取经纬坐标及海拔
     * @param position
     * @returns {*}
     */
    getTerrainPosition(position) {
        var cartesian3 = Cesium.Cartesian3.fromDegrees(position.lng, position.lat);
        //计算出法线矢量
        var ray = getRay(cartesian3);
        console.log(ray);
        console.log(_this.viewer.camera.getPickRay({x: 513, y: 617}));
        ray = _this.viewer.camera.getPickRay({x: 513, y: 617});

        position = _this.viewer.scene.globe.pick(ray, _this.viewer.scene);

        return position;

        function getRay(cartesian3) {
            var x = cartesian3.x;
            var y = cartesian3.y;
            var z = cartesian3.z;
            var length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
            return new Cesium.Ray({
                x: x * 2,
                y: y * 2,
                z: z * 2
            }, {
                x: x / length,
                y: y / length,
                z: z / length
            })
        }
    }

    checkMapLoaded() {
        var ray = _this.viewer.camera.getPickRay({x: 500, y: 500});
        var position = _this.viewer.scene.globe.pick(ray, _this.viewer.scene);
        return position;
    }

    refresh() {
        this.viewer.scene.camera.setView(this.baseView);
    }
}

function get3DMarkerManager(map) {


    function MarkerManager(map) {
        _this = this;
        this._map = map;
        this.placeMethod = {
            terrianMark: function (position) {
                _this.remove("terrianMark");
                var ray = _this._map.viewer.camera.getPickRay(position);
                position = _this._map.viewer.scene.globe.pick(ray, _this._map.viewer.scene);
                if (Cesium.defined(position)) {
                    var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position);

                    return _this._map.viewer.entities.add({
                        name: '点击位置',
                        polygon: {
                            hierarchy: Cesium.Cartesian3.fromDegreesArray(getMarkerArray()),
                            material: Cesium.Color.RED
                        }
                    });
                }


                function getMarkerArray() {
                    var toFixed = utils.toFixed;
                    var x = 0.001;
                    return [
                        toFixed(cartographic.longitude * 180 / Cesium.Math.PI), toFixed(cartographic.latitude * 180 / Cesium.Math.PI + 0.1 * x),
                        toFixed(cartographic.longitude * 180 / Cesium.Math.PI + 0.2 * x), toFixed(cartographic.latitude * 180 / Cesium.Math.PI + 0.3 * x),
                        toFixed(cartographic.longitude * 180 / Cesium.Math.PI + 0.3 * x), toFixed(cartographic.latitude * 180 / Cesium.Math.PI + 0.2 * x),
                        toFixed(cartographic.longitude * 180 / Cesium.Math.PI + 0.1 * x), toFixed(cartographic.latitude * 180 / Cesium.Math.PI),
                        toFixed(cartographic.longitude * 180 / Cesium.Math.PI + 0.3 * x), toFixed(cartographic.latitude * 180 / Cesium.Math.PI - 0.2 * x),
                        toFixed(cartographic.longitude * 180 / Cesium.Math.PI + 0.2 * x), toFixed(cartographic.latitude * 180 / Cesium.Math.PI - 0.3 * x),
                        toFixed(cartographic.longitude * 180 / Cesium.Math.PI), toFixed(cartographic.latitude * 180 / Cesium.Math.PI - 0.1 * x),
                        toFixed(cartographic.longitude * 180 / Cesium.Math.PI - 0.2 * x), toFixed(cartographic.latitude * 180 / Cesium.Math.PI - 0.3 * x),
                        toFixed(cartographic.longitude * 180 / Cesium.Math.PI - 0.3 * x), toFixed(cartographic.latitude * 180 / Cesium.Math.PI - 0.2 * x),
                        toFixed(cartographic.longitude * 180 / Cesium.Math.PI - 0.1 * x), toFixed(cartographic.latitude * 180 / Cesium.Math.PI),
                        toFixed(cartographic.longitude * 180 / Cesium.Math.PI - 0.3 * x), toFixed(cartographic.latitude * 180 / Cesium.Math.PI + 0.2 * x),
                        toFixed(cartographic.longitude * 180 / Cesium.Math.PI - 0.2 * x), toFixed(cartographic.latitude * 180 / Cesium.Math.PI + 0.3 * x)
                    ]
                }
            }
        };
        this.entityMap = {
            _default: []
        };
    }

    MarkerManager.prototype = {
        LIST_PREFIX: "map_3d_marker_",
        addMarkers: function (markers, group, callback) {
            if (!this.entityMap[group]) {
                this.entityMap[group] = [];
            }
            console.log(group);
            this.entityMap[group].push(this.placeMethod[group](markers));
        },
        clear: function () {
            this._map.viewer.entities.removeAll();
            this._map.viewer.render();
        },
        remove: function (group) {
            var entities = this.entityMap[group];
            if (entities) {
                for (var i = 0; i < entities.length; i++) {
                    if (entities[i] instanceof Array) {
                        for (var j = 0; j < entities[i].length; j++) {
                            this._map.viewer.entities.remove(entities[i][j]);
                        }
                    } else {
                        this._map.viewer.entities.remove(entities[i]);
                    }
                }
                entities = [];
                this._map.viewer.render();
            }
        },
        setEvent: function () {
        },
        setPlaceMethed: function (placeMethod) {
            this.placeMethod = utils.apply(this.placeMethod,placeMethod);
        }
    }

    return new MarkerManager(map);
}

export default CesiumViewer;