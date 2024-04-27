import store from '../store/index'
import * as promiseUtils from "@arcgis/core/core/promiseUtils.js";
import Graphic from "@arcgis/core/Graphic.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import { createTable } from './createTable.jsx'
import Point from "@arcgis/core/geometry/Point.js";
import SpatialReference from "@arcgis/core/geometry/SpatialReference.js";
import ClassBreaksRenderer from "@arcgis/core/renderers/ClassBreaksRenderer.js";
import Color from "@arcgis/core/Color.js";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";

export const createLayerPoint = () => {
    store.getState().features.view.when()
        .then(fetchImages)
        .then(getFeaturesFromPromises)
        .then(createLayer)
        .then(addToView)
        .catch((e) => {
            console.error(e);
        });
}
function fetchImages() {
    const graphicPromises = [];
    for (let i = 0; i <= store.getState().features.features.length; i++) {
        if (store.getState().features?.features[i]?.nameId) {
            const graphicPromise = exifToGraphic(store.getState().features.features[i].emailId,
                store.getState().features.features[i].nameId,
                store.getState().features.features[i].radioId,
                store.getState().features.features[i].msgId, store.getState().features.features[i].coordinates, i);
            graphicPromises.push(graphicPromise);
        }
    }
    return promiseUtils.eachAlways(graphicPromises);
}

function exifToGraphic(email, name, radio, msg, coordinates, id) {
    let idSymbol = 1

    if (radio == "complain") {
        idSymbol = 10
    }
    if (radio == "requestInformation") {
        idSymbol = 20
    }
    if (radio == "missedServices") {
        idSymbol = 30
    }
    if (radio == "addinformation") {
        idSymbol = 40
    }
    return new Promise((resolve, reject) => {
        let pointGeo = new Point({
            latitude: coordinates[1],
            longitude: coordinates[0]
        });
        resolve(new Graphic({
            geometry: pointGeo,
            attributes: {
                "OBJECTID": id + 1,
                "name": name,
                "email": email,
                "radio": radio,
                "msg": msg,
                "idSymbol": idSymbol
            }
        }));
    });
}

function getFeaturesFromPromises(eachAlwaysResponses) {
    return eachAlwaysResponses.filter((graphicPromise) => {
        return graphicPromise.value;
    }).map((graphicPromise) => {
        return graphicPromise.value;
    });
}

function createLayer(graphics) {
    let renderer = new ClassBreaksRenderer( {
        field: "idSymbol",
        defaultSymbol: {
            type: "simple-marker",
            style: "circle",
            color: "black",
            size: "16px",
        },
         classBreakInfo: [
            {
                minValue: 0,
                maxValue: 5,
                symbol: {
                    type: "simple-marker",
                    style: "circle",
                    color: "white",
                    size: "16px",
                }
            }, {
                minValue: 6,
                maxValue: 15,
                symbol: {
                    type: "simple-marker",
                    style: "circle",
                    color: "green",
                    size: "16px",
                }
            }, {
                minValue: 16,
                maxValue: 25,
                symbol: {
                    type: "simple-marker",
                    style: "circle",
                    color: "red",
                    size: "16px",
                }
            },
            {
                minValue: 26,
                maxValue: 35,
                symbol: {
                    type: "simple-marker",
                    style: "circle",
                    color: "blue",
                    size: "16px",
                }
            }, {
                minValue: 36,
                maxValue: 45,
                symbol: {
                    type: "simple-marker",
                    style: "circle",
                    color: "pink",
                    size: "16px",
                }
            }
        ] 
    })
  
    
    return new FeatureLayer({
        source: graphics,
        id: '12121212',
        visible: true,
        spatialReference: SpatialReference.WGS84,
        hasZ: true,
        objectIdField: "OBJECTID",
        fields: [{
            name: "OBJECTID",
            type: "oid"
        }, {
            name: "name",
            type: "string"
        }, {
            name: "email",
            type: "string"
        }, {
            name: "radio",
            type: "string"
        }, {
            name: "msg",
            type: "string"
        }, {
            name: 'idSymbol',
            type: "integer"
        }],
        popupTemplate: {
            title: "Data Feature",
            content: "<div><div>Name: {name}</div><div>Email: {email}</div><div>Feedback: {radio}</div><div>Message: {msg}</div></div>"
        },
        renderer: renderer
    });
}

function addToView(layer) {
    store.getState().features.view.map.add(layer)
    createTable(layer)
}

