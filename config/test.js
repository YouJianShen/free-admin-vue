var tian1 = new TDTWMTSImageProvider("http://t{l}.tianditu.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles", !1, 1, 18),
    tian2 = new TDTWMTSImageProvider("http://t{l}.tianditu.cn/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles", !1, 1, 18),
    imageprovider = new Cesium.ProviderViewModel({
        name: "谷歌影像",
        tooltip: "谷歌影像",
        iconUrl: "../Images/serverlayer.png",
        creationFunction: function () {
            return new WMTSImageryProvider("http://www.google.cn/maps/vt?lyrs=s@198&gl=en&x={x}&y={y}&z={z}", !0, {alpha: 1})
        }
    }), imgarcgisprovider = new Cesium.ProviderViewModel({
        name: "ArcGIS影像底图",
        tooltip: "ArcGIS影像底图",
        iconUrl: "../Images/serverlayer.png",
        creationFunction: function () {
            var e = new Cesium.ArcGisMapServerImageryProvider({url: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"});
            return e
        }
    }), imgarcgisprovider1 = new Cesium.ProviderViewModel({
        name: "ArcGIS基础底图",
        tooltip: "ArcGIS基础底图",
        iconUrl: "../Images/serverlayer.png",
        creationFunction: function () {
            var e = new Cesium.ArcGisMapServerImageryProvider({url: "http://services.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer"});
            return e
        }
    }), imageprovider1 = new Cesium.ProviderViewModel({
        name: "天地图矢量",
        tooltip: "天地图矢量",
        iconUrl: "../Images/serverlayer.png",
        creationFunction: function () {
            return tian1
        }
    }), imageprovider2 = new Cesium.ProviderViewModel({
        name: "天地图影像",
        tooltip: "天地图影像",
        iconUrl: "../Images/serverlayer.png",
        creationFunction: function () {
            return tian2
        }
    }), imageprovider3 = new Cesium.ProviderViewModel({
        name: "离线图像",
        tooltip: "离线加载图像",
        iconUrl: "../Images/serverlayer.png",
        creationFunction: function () {
            return new WMTSImageryProvider(ipConfig + ":2000/getImage?z={z}&y={y}&x={x}", !0, {alpha: 1})
        }
    }), _0 = new Cesium.CesiumTerrainProvider({url: "//assets.agi.com/stk-terrain/world", isGoogleCustom: !0}),
    localterrainprovider = new Cesium.ProviderViewModel({
        name: "谷歌地球DEM",
        tooltip: "谷歌地球DEM",
        iconUrl: "../Images/serverlayer.png",
        creationFunction: function () {
            return _0
        }
    }), localterrainprovider1 = new Cesium.ProviderViewModel({
        name: "Cesium地形",
        tooltip: "Cesium地形",
        iconUrl: "../Images/serverlayer.png",
        creationFunction: function () {
            return new Cesium.CesiumTerrainProvider({url: "//assets.agi.com/stk-terrain/world", requestVertexNormals: !0})
        }
    }), localterrainprovider2 = new Cesium.ProviderViewModel({
        name: "PAMAP地形",
        tooltip: "PAMAP地形",
        iconUrl: "../Images/serverlayer.png",
        creationFunction: function () {
            return new Cesium.CesiumTerrainProvider({url: "//assets.agi.com/stk-terrain/v1/tilesets/PAMAP/tiles"})
        }
    }), localterrainprovider3 = new Cesium.ProviderViewModel({
        name: "基础地形",
        tooltip: "基础地形地形",
        iconUrl: "../Images/serverlayer.png",
        creationFunction: function () {
            return new Cesium.EllipsoidTerrainProvider
        }
    }), localterrainprovider4 = new Cesium.ProviderViewModel({
        name: "离线高程",
        tooltip: "离线叠加高程",
        iconUrl: "../Images/serverlayer.png",
        creationFunction: function () {
            return new Cesium.CesiumTerrainProvider({url: ipConfig + ":2001/dem", requestVertexNormals: !0})
        }
    }),
    labellayer = new TDTWMTSImageProvider("http://t{l}.tianditu.cn/cia_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=c&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles", !1, 1, 16, {alpha: 0}),
    tiandituProviderPlaceName = new Cesium.WebMapTileServiceImageryProvider({
        url: "http://t0.tianditu.com/cia_w/wmts",
        layer: "cia",
        style: "default",
        format: "tiles",
        tileMatrixSetID: "w",
        maximumLevel: 19,
        credit: new Cesium.Credit("天地图")
    }),
    imageprovider_my = new WMTSImageryProvider("http://www.google.cn/maps/vt?lyrs=s@198&gl=en&x={x}&y={y}&z={z}", !0, {alpha: 1}),
    localterrainprovider_my = new Cesium.CesiumTerrainProvider({
        url: "//assets.agi.com/stk-terrain/world",
        requestVertexNormals: !0
    });
viewer = new Cesium.Viewer("cesiumContainer", {
    timeline: !1,
    sceneModePicker: !1,
    baseLayerPicker: !0,
    geocoder: !1,
    imageryProviderViewModels: [imageprovider, imageprovider1, imageprovider2, imgarcgisprovider, imgarcgisprovider1],
    terrainProviderViewModels: [localterrainprovider, localterrainprovider1, localterrainprovider2, localterrainprovider3],
    selectedImageryProviderViewModel: imageprovider,
    selectedTerrainProviderViewModel: localterrainprovider1,
    scene3DOnly: !0,
    animation: !0,
    navigationHelpButton: !0,
    homeButton: !1,
    infoBox: !1,
    fullscreenButton: !1,
    showRenderLoopErrors: !1,
    fullscreenElement: document.documentElement,
    mapProjection: new Cesium.WebMercatorProjection
}), viewer.scene.imageryLayers.addImageryProvider(tiandituProviderPlaceName), viewer.scene.globe.depthTestAgainstTerrain = !0;
var CesiumEditor = new CesiumEditManger(viewer);
CesiumEditor.init(), flytochina(viewer), showskyBox(viewer), $(".cesium-viewer-bottom").hide(), $(".cesium-viewer-fullscreenContainer").hide(), $(".cesium-viewer-animationContainer").hide();
var scene = viewer.scene, canvas = viewer.canvas, clock = viewer.clock, camera = viewer.scene.camera,
    entities = viewer.entities, dataContainer = new DataContainer(viewer);
dataContainer.loadfromserver();
var editor = new editManger(viewer, dataContainer);
editor.init();
var test = new WMTSImageryProvider(ipConfig + ":2000/getImage?z={z}&y={y}&x={x}", !0, {alpha: 1}), polylinecolor;
console.log(imageprovider);
var openlayer = new OpenLayer;
openlayer.CloseWin("toolWindow_close", "tool_window"), openlayer.moveShow("tool_window"), openlayer.add_Annota({
    addId: "add",
    isAdd: !0,
    outlineWidth: 2,
    style: Cesium.LabelStyle.FILL_AND_OUTLINE
}), openlayer.Position();
var xmldom = new XMLDocument({fileurl: ipConfig + ":2000/"});
openlayer.onLoad();