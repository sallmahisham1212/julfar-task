import Fullscreen from "@arcgis/core/widgets/Fullscreen.js";
import Home from "@arcgis/core/widgets/Home.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle.js";

/* add map controls inside view */

export const createFullScreen = (view) => {
    let fullscreen = new Fullscreen({
        view: view
    });
    view.ui.add(fullscreen, "top-left");
}

export const createHome = (view) => {
    let homeWidget = new Home({
        view: view
    });
    view.ui.add(homeWidget, "top-left");
}

export const createScaleBar = (view) => {
    let scaleBar = new ScaleBar({
        view: view
    });
    view.ui.add(scaleBar, {
        position: "bottom-left"
    });
}

export const createBasemapToggle = (view) => {
    let basemapToggle = new BasemapToggle({
        view: view,  
        nextBasemap: "dark-gray-vector" 
    });
    view.ui.add(basemapToggle, "top-left");
}

