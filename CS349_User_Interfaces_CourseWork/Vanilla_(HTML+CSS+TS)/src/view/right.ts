import View from "../view";
import { Model } from "../model";
import "./css/right.css";
import { ListView } from "./listView";
import { ChartView } from "./chartView";
import { stockRecords } from "../stocks";

export class Right extends View {

    private mdl: Model;

    update():void{
        this.show();
    }

    constructor(model: Model){
        super();
        this.root.id="Right";
        this.mdl=model;
        model.addObserver(this);
        this.show();
        
    }

    show(){
        while (this.root.firstChild) this.root.removeChild(this.root.firstChild)
        //console.log(`Dis? ${this.mdl.DisMode}`);
        if (this.mdl.selNum==0){
            const wel=document.createElement("wel");
            wel.innerHTML=`
            <div class="T"> <b>Welcome to Assignment 3!</b></div>
            <div class="nText">
            This is the HTML/CSS version of the Stocks application.
            <br>
            <p>
            Supported actions
            <ul>
                <li> Use the Add and Del buttons to add or remove a stock. </li>
                <li> Click to select a stock in the list, or Shift-click to select multiple stocks. </li>
                <li> When viewing a single stock, use the Chart and List buttons for details. </li>
            </ul>

            Keyboard shortcuts
            <ul>
                <li> A - add a random stock </li>
                <li> D - delete selected stocks </li>
                <li> C - clear all selections </li>
                <li> U - undo
                <li> R - redo </li>
            </ul>
            </div>
            `;
            this.root.appendChild(wel);
        }
        else if (this.mdl.selNum==1){
            while (this.root.firstChild) this.root.removeChild(this.root.firstChild);
            const sid=this.mdl.sel[0];
            const id = this.mdl.getID(sid);
            // console.log(`Will shiw id: ${sid}`);
            let his=stockRecords[id].history;
            const arrow = this.mdl.getCha(sid)>= 0 ? "↑" : "↓";
            const sign =this.mdl.getCha(sid)>= 0 ? "+" : ""; 
            const chgStr = `${sign}${this.mdl.getCha(sid).toFixed(2)} ${arrow}`;
            const tit = document.createElement("Text");
            tit.innerHTML=`
            <div class="T"> <b>${this.mdl.getName(sid)} (${sid})</b></div><br>
            <div class="nText">
            <span> Market Cap: $${new Intl.NumberFormat('en-US',
                {minimumFractionDigits: 0,maximumFractionDigits: 0,useGrouping: true})
                .format(his[6].mcap)} B </br>
            <span> Stock Price: ${this.mdl.getPri(sid).toFixed(2)} (${chgStr})</br>
            <br>`;
            this.root.appendChild(tit);
            

            if (this.mdl.DisMode==false) this.root.appendChild(new ListView(this.mdl).root);
            else this.root.appendChild(new ChartView(this.mdl).root);
        }
        else {
            const wel=document.createElement("wel");
            wel.innerHTML=`
            <div class="nText">
                Multiple stocks selected. Details can only be shown when a single stock is selected.
                <ul>
                <li> Use Shift-click to modify your selection, or </li>
                <li> Press Del to delete all selected Stocks from the list. </li>
                </ul>
            </div>
            `;
            this.root.appendChild(wel);

        }
    }
}
