
import FeatureTable from "@arcgis/core/widgets/FeatureTable.js";
import store from '../store/index'

export const createTable = (layer) =>{
    document.getElementById("tableDiv").innerHTML =""
    const featureTable = new FeatureTable({
        view: store.getState().features.view,
        layer: layer,
        highlightEnabled:true,
        highlightOnRowSelectEnabled:true,
        container: "tableDiv"
    });

    store.getState().features.view.ui.add(featureTable);
}