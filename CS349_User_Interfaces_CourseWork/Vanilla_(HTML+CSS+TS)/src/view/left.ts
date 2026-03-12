import View from "../view";
import { Model } from "../model";
import "./css/left.css";

export class Left extends View{

    private model: Model;

    update():void{
        this.addStock();
    };

    constructor(model: Model){
        super();
        this.model = model;
        this.root.id = "left";
        this.model.addObserver(this);
        this.root.addEventListener("click", () => {
            console.log("BackGroud");
            model.disSelAll();
        });
    }

    addStock(){
        const mdl = this.model;
        while (this.root.firstChild) this.root.removeChild(this.root.firstChild);
        for (let i=0;i<mdl.disList.length;i++){
            const StBlk = document.createElement("div");
            //StBlk.id="StBlk";
            const id=mdl.disList[i];
            const arrow = mdl.getCha(id)>= 0 ? "↑" : "↓";
            const sign =mdl.getCha(id)>= 0 ? "+" : ""; 
            const chgStr = `${sign}${mdl.getCha(id).toFixed(2)} ${arrow}`;

            StBlk.innerHTML=`
            <div class="stTop">${mdl.getName(id)} (${id})</div>
            <div class="stBottom">
                <span>${mdl.getPri(id).toFixed(2)}</span>
                <span>(${chgStr})</span>
            </div>
            `;
            
            StBlk.classList.add("StBlk");    
            if (mdl.sel.includes(id)){
                if (mdl.sel.at.length==1) StBlk.classList.toggle("Selected");
                else StBlk.classList.toggle("MultiSelected");
            } 
            

            StBlk.addEventListener("click", (e) => {
                e.stopPropagation(); 
                mdl.addSel(id);
                console.log(`Chose ${id}`);
            });

            this.root.appendChild(StBlk);
        }
    }

}

