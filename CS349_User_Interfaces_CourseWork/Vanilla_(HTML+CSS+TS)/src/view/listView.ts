import View from "../view";
import { Model } from "../model";
import "./css/listView.css";
import { stockRecords } from "../stocks";

export class ListView extends View{

    private mdl: Model;

    update(){
        while (this.root.firstChild) this.root.removeChild(this.root.firstChild);
        const sid=this.mdl.getFoc();
        const id = this.mdl.getID(sid);
        console.log(id);
        if (this.mdl.selNum){
            let his=stockRecords[id].history;
            const table = document.createElement("table");
            table.className = "Table";
            table.innerHTML = `
            <thead>
                <tr>
                <th>Year</th>
                <th>Market Cap</th>
                <th>Change</th>
                </tr>
            </thead>
            <tbody></tbody>
            `;

        const tbody = table.querySelector("tbody") as HTMLTableSectionElement;

        for (let i=0;i<7;i++) {
            const year=his[i].year;
            const cap=his[i].mcap;
            const arrow = this.mdl.getCha(sid)>= 0 ? "↑" : "↓"; 
            const ch = i==0? null:cap-his[i-1].mcap;

            const arr = ch ==null? "" :(ch >=0? "↑":"↓");
            const sign = ch ==null? "" :(ch >=0? "+" : "");
            const chS = ch === null ? "n/a" : `${sign}${ch.toFixed(2)} ${arrow}`;
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${year}</td>
                <td>$${cap.toLocaleString()} B</td>
                <td>${chS}</td>
            `;
            tbody.appendChild(tr);
            }

            this.root.appendChild(table);


        }
    }

    constructor(model: Model){
        super();
        this.mdl = model;
        this.root.id = "listView";
        this.mdl.addObserver(this);
    }

}