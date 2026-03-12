import View from "../view";
import { Model } from "../model";
import "./css/tool.css";

export class ToolBar extends View {

    update():void{
    };

    constructor(model: Model){
        super();
        this.root.id = "tool";
        model.addObserver(this);
        

        const toolt = document.createElement("div");
        toolt.id = "toolt";
        toolt.textContent = "Stocks"

        const space = document.createElement("div");
        space.id = "space";

        const undo = document.createElement("button");
        const redo = document.createElement("button");

        const sep = document.createElement("label");
        const sep1 = document.createElement("label");

        const add = document.createElement("button");
        const del = document.createElement("button");


        undo.innerText = "↩️";
        redo.innerText = "↪️";
        add.innerText = "Add";
        del.innerText = "Del";

        sep.innerText= " | ";
        sep1.innerText= " | ";

        this.root.appendChild(toolt);
        this.root.appendChild(space);
        this.root.append(undo, redo, sep, add, del, sep1);

        const rbCLabel = document.createElement("label");
        rbCLabel.innerText = "Chart";

        const rbChart = document.createElement("input");
        rbChart.type = "radio";
        rbChart.name = "mode";
        rbChart.id = "rbChart";

        const rbLLabel = document.createElement("label");
        rbLLabel.innerText = "List";

        const rbList = document.createElement("input");
        rbList.type = "radio";
        rbList.name = "mode";
        rbList.id = "rbList";

        this.root.appendChild(rbCLabel);
        this.root.appendChild(rbChart);
        this.root.appendChild(rbLLabel);
        this.root.appendChild(rbList);

        if (rbChart.checked == false && rbList.checked==false) {
            rbChart.checked=true;
            rbChart.disabled=(model.selNum!=1);
            rbList.disabled=(model.selNum!=1);
        }

        undo.addEventListener("click", () => {
            console.log("undo clicked");
            model.undo();
            add.disabled=(model.disNum==9);
            del.disabled=(model.disNum==0);
            rbChart.disabled=(model.selNum!=1);
            rbList.disabled=(model.selNum!=1);
            redo.disabled=(model.redoN<=0);
            undo.disabled=(model.undoN<=0);
        });

        redo.addEventListener("click", () => {
            console.log("redo clicked");
            model.redo();
            add.disabled=(model.disNum==9);
            del.disabled=(model.disNum==0);
            rbChart.disabled=(model.selNum!=1);
            rbList.disabled=(model.selNum!=1);
            redo.disabled=(model.redoN<=0);
            undo.disabled=(model.undoN<=0);
        });

        add.addEventListener("click", () => {
            if (model.disNum<9)  model.disNew();
            add.disabled=(model.disNum==9);
            del.disabled=(model.disNum==0);
            rbChart.disabled=(model.selNum!=1);
            rbList.disabled=(model.selNum!=1);
            //console.log("add clicked");

        });

        del.addEventListener("click", () => {
            //console.log("del clicked");
            if (model.disNum>0)  model.disRem();
            add.disabled=(model.disNum==9);
            del.disabled=(model.disNum==0);
            rbChart.disabled=(model.selNum!=1);
            rbList.disabled=(model.selNum!=1);
        });

        rbChart.addEventListener("click", ()=>{
            model.ToggleMode(true);
        })
        rbList.addEventListener("click", ()=>{
            model.ToggleMode(false);
        })

        let keyInput = (key: KeyboardEvent) =>{
            model.KeyAction(key);
            if (key.key==="A" && key.type=="keydown" && !key.repeat && model.disNum<9) model.disNew();
            if (key.key==="D" && key.type=="keydown" && !key.repeat && model.disNum>0) model.disRem();
            if (key.key==="C" && key.type=="keydown" && !key.repeat) model.disSelAll();
            if (key.key==="U" && key.type=="keydown" && !key.repeat) model.undo();
            if (key.key==="R" && key.type=="keydown" && !key.repeat) model.redo();
            add.disabled=(model.disNum==9);
            del.disabled=(model.disNum==0);
            rbChart.disabled=(model.selNum!=1);
            rbList.disabled=(model.selNum!=1);
        }

        let Mousein = (mou: MouseEvent)=>{
            add.disabled=(model.disNum==9);
            del.disabled=(model.disNum==0);
            rbChart.disabled=(model.selNum!=1);
            rbList.disabled=(model.selNum!=1);
            redo.disabled=(model.redoN<=0);
            undo.disabled=(model.undoN<=0);
        }
        document.addEventListener('mousemove', Mousein);
        document.addEventListener('keydown', keyInput);
        document.addEventListener('keyup', keyInput);

    }
}
