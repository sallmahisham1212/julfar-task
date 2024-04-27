import React, { useEffect } from 'react';
import { createMap } from '../../utlis/utlis'

const MapEsri = () => {
    
    useEffect(() => {
        createMap()
    }, [])

    return (
        <React.Fragment>
            <div id="viewDiv"></div>
            <div id="drawPointBtnCal" className='button-container'>
                <button className='button-draw esri-icon-radio-unchecked'></button>
            </div>
            <div id="tableDiv"> </div>
        </React.Fragment>
    );
};

export default MapEsri;
