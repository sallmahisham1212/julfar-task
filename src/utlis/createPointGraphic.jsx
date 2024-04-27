import Draw from "@arcgis/core/views/draw/Draw.js";
import proj4 from 'proj4';
import Graphic from "@arcgis/core/Graphic.js";
import { createFormFeature } from './createForm.jsx'
import store from '../store/index'
import SpatialReference from "@arcgis/core/geometry/SpatialReference.js";

/* to open draw on map */
export const addToggleDrawOnMap = () => {
    store.getState().features.view.ui.add(["drawPointBtnCal"], "top-left");
    var drawPointBtn = document.getElementById("drawPointBtnCal");
    drawPointBtn.addEventListener("click",
        createDrawPoint
    );
}

const createDrawPoint = () => {
    let draw = new Draw({
        view: store.getState().features.view,
        spatialReference: SpatialReference.WGS84
    });

    let action = draw.create("point", { spatialReference: SpatialReference.WGS84, });

    action.on("cursor-update", function (evt) {
        createPointGraphic(evt.coordinates);
    });

    action.on("draw-complete", function (evt) {
        proj4.defs([
            [
                'EPSG:4326',
                '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees'],
            [
                'EPSG:3857',
                '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs']
        ]);
        action.destroy()
        action.removeHandles()
        // draw.complete()
        // // draw.destroy()
        // draw.removeHandles()
        const coordinates = proj4('EPSG:4326', 'EPSG:3857').inverse(evt.coordinates, true);
        store.getState().features.view.graphics.removeAll();
        createFormFeature(coordinates)
    });
}

/* to add graphic cursor on map to show point while moving */
function createPointGraphic(coordinates) {
    store.getState().features.view.graphics.removeAll();
    let point = {
        type: "point",
        x: coordinates[0],
        y: coordinates[1],
        spatialReference: store.getState().features.view.spatialReference
    };

    let graphic = new Graphic({
        geometry: point,
        symbol: {
            type: "simple-marker",
            style: "circle",
            color: "#03bafc",
            size: "16px",
        }
    });
    store.getState().features.view.graphics.add(graphic);
}

const convertVertexProj = (coordinates) => {
    /* to convert point projection */
    proj4.defs([['EPSG:4326',
        '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees'], [
        'EPSG:3857',
        '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs']]);

    return proj4('EPSG:4326', 'EPSG:3857').inverse(coordinates, true);
}