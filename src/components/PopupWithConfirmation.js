import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup{
    constructor(data, popupSelector){
        super (data, popupSelector);
        this._formElement = this._element.querySelector(data.formSelector);
    }
    _setSubmitListener = ((evt)=>{
        evt.preventDefault();
        this._handleSubmit();
        this.close();
    });
    open(handleSubmit){
        super.open();
        this._handleSubmit = handleSubmit;
        this._formElement.addEventListener('submit', this._setSubmitListener);
    }
    close(){
        this._formElement.removeEventListener('submit', this._setSubmitListener);
        super.close();
    }
}