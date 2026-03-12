import View from "../view";
import { Model } from "../model";
import "./css/stbar.css";

export class StBar extends View {
    private mdl: Model;
    update():void{
        while (this.root.firstChild) this.root.removeChild(this.root.firstChild);
        const id=this.mdl.getFoc();
        const NumLab = document.createElement("div");
        if (this.mdl.selNum==1){
            const StkSt = document.createElement("div");
            StkSt.innerText=`${this.mdl.getName(id)}: $${this.mdl.getPri(id).toFixed(2)}`;
            this.root.appendChild(StkSt);
            NumLab.innerText=`${this.mdl.disNum} Stocks ( ${this.mdl.selNum} Selected)`;
        }
        else if (this.mdl.disNum==1) NumLab.innerText=`1 Stock (${this.mdl.selNum} Selected)`;
        else if (this.mdl.disNum>1) NumLab.innerText=`${this.mdl.disNum} Stocks ( ${this.mdl.selNum} Selected)`;
        else NumLab.innerText=`No Stocks (0 Selected)`;
        const Spc = document.createElement("space");
        this.root.appendChild(Spc);
        this.root.appendChild(NumLab);

    };

    constructor(model: Model){
        super();
        this.mdl=model;
        this.root.id="StBar";
        this.update();
        model.addObserver(this);
    }

}