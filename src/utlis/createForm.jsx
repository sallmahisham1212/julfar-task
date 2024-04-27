import { featuresActions } from '../store/featuresSlice';
import store from '../store/index'
import { createLayerPoint } from './createLayerPoint.jsx'

export const createFormFeature = ( coordinates)=>{
    let div = document.createElement("div");
    let form = document.createElement("form");
    form.id = "idForm"
    form.innerHTML = '<form name="idForm" action="" method="POST" id="idForm"> <calcite-label> Name:<calcite-input form="idForm" placeholder="Name" id="nameId" validation-message="name is a required field." status="idle" required> </calcite-input> </calcite-label> <calcite-label> Email:<calcite-input form="idForm" type="email" id="emailId" placeholder="Email" status="idle" validation-message="email is a required field." required></calcite-input> </calcite-label> <calcite-radio-button-group form="idForm" name="radiooptions" id="radioId" scale="s" layout="vertical" validation-message="type of feedback is a required field." status="idle" required> <calcite-label> Types of feedback:</calcite-label> <calcite-label layout="inline"> <calcite-radio-button  value="complain"></calcite-radio-button> Complain </calcite-label > <calcite-label layout="inline"> <calcite-radio-button  value="requestInformation"></calcite-radio-button> Request Information </calcite-label> <calcite-label layout="inline"> <calcite-radio-button  value="missedServices"></calcite-radio-button> Missed Services </calcite-label> <calcite-label layout="inline"> <calcite-radio-button  value="addinformation"></calcite-radio-button> Add information </calcite-label> <calcite-label layout="inline"> <calcite-radio-button  value="others"></calcite-radio-button> Others </calcite-label> </calcite-radio-button-group> <calcite-label> Message:<calcite-input required status="idle" form="idForm" id="msgId" type="textarea" validation-message="message is a required field" placeholder="Message"></calcite-input> </calcite-label> <calcite-button form="idForm" type="submit">Submit</calcite-button> </form>'
    div.append(form)

    store.getState().features.view.openPopup({
        title: "Please fill form",
        content: div,
        location: coordinates
    });

    var temp = { coordinates: coordinates, id: parseInt(Date.now() * Math.random()).toString() }
   
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        /* check on validation */
        let emailItem = document.getElementById("emailId");
        let namelItem = document.getElementById("nameId");
        let radiolItem = document.getElementById("radioId");
        let msglItem = document.getElementById("msgId");
        if (!temp.emailId) {
            emailItem.status = "invalid";
            return;
        } else {
            emailItem.status = "valid";
        }
        if (!temp.nameId) {
            namelItem.status = "invalid";
            return;
        } else {
            namelItem.status = "valid";
        }
        if (!temp.radioId) {
            radiolItem.status = "invalid";
            return;
        } else {
            radiolItem.status = "valid";
        }
        if (!temp.msgId) {
            msglItem.status = "invalid";
            return;
        } else {
            msglItem.status = "valid";
        }

        store.dispatch(featuresActions.addFeature(temp))
        store.getState().features.view.closePopup();

        createLayerPoint()
      
    });

    document.addEventListener("calciteInputChange", (event) => {
        temp[event.target.id] = event.target.value
    });
    document.addEventListener("calciteRadioButtonChange", (event) => {
        temp.radioId = event.target.value
    });

}

