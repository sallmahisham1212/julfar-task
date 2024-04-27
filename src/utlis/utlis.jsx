import { featuresActions } from '../store/featuresSlice';
import store from '../store/index'
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-icon";
import "@esri/calcite-components/dist/components/calcite-slider";
import SpatialReference from "@arcgis/core/geometry/SpatialReference.js";
import esriConfig from "@arcgis/core/config";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import { createFullScreen, createHome, createScaleBar, createBasemapToggle } from './addMapControls.jsx'
import { addToggleDrawOnMap } from './createPointGraphic.jsx'

let view
let map
let graphicsLayer

export const createMap = async () => {
    esriConfig.apiKey = "AAPKf38c421390304f138f77efffebcec174cliPVb-_xzzWhkpQrsTLklgkApWOT-DIDQiYwBKgmxRt4zvn_Tw_KNHsZjlc31Lc"
    graphicsLayer = new GraphicsLayer();
    map = new Map({
        basemap: "arcgis/imagery",
        spatialReference: SpatialReference.WGS84,
        layers: [graphicsLayer]
    });
    store.dispatch(featuresActions.addMap(map))
    view = new MapView({
        map: map,
        center: [31.234750555565807, 30.048836075059086],
        zoom: 13,
        container: "viewDiv",
    });
    store.dispatch(featuresActions.addView(view))
    addMapControls()
    addToggleDrawOnMap()

}

const addMapControls = () => {
    createFullScreen(view)
    createHome(view)
    createScaleBar(view)
    createBasemapToggle(view)
}








