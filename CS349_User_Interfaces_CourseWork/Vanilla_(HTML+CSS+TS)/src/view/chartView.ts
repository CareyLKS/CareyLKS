import View from "../view";
import { Model } from "../model";
import "./css/ChartView.css";
import { stockRecords } from "../stocks";

export class ChartView extends View{

    private mdl: Model;

    update(){}

    constructor(model: Model){
        super();
        this.mdl = model;
        this.root.id = "ChartView";
        this.mdl.addObserver(this);
        this.draw()
    }

    draw(){ 
        const sid=this.mdl.getFoc();
        const id = this.mdl.getID(sid);
        let his=stockRecords[id].history;

        const gra = document.createElement("canvas");
        this.root.appendChild(gra);
        let {xa,ya,xs,ys,ygap}=this.mdl.genGraghData(id,gra.width,gra.height)
        requestAnimationFrame(() => { 
            //start drawing
            const ctx = gra.getContext("2d");
            if (!ctx) return;
            ctx.strokeStyle = "gray";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(xs[0], ys[0]);
            for (let i=1; i<7;i++) ctx.lineTo(xs[i], ys[i]);
            ctx.stroke();

            ctx.fillStyle = "blue";
            for (let i=0; i<7; i++){
                ctx.beginPath();
                ctx.arc(xs[i],ys[i],4,0,Math.PI*2);
                ctx.fill();

            }
            ctx.fillStyle = "#000";
            //ctx.font = `${Math.min(14, gra.height*0.06)}px Arial`;
            let H=gra.height;
            for (let i=0;i<7;i++){
                ctx.font = "12px sans-serif";
                ctx.strokeStyle = "normal";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.textBaseline = "top";
                ctx.fillText(xa[i],xs[i],gra.height-15);
                ctx.fillText(ya[i],15+2*xs[0]-xs[1],H-23-ygap[i]);
                //console.log(ya[i],ygap[i]);
            }
        });
        let lb= document.createElement("label");
        lb.innerText="Market Cap by Year (Billions)";
        this.root.appendChild(lb);
    }

}