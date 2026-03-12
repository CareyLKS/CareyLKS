import View from "../view";
import { Model } from "../model";
import { Left } from "./left";
import { Right } from "./right";
import "./css/cont.css";


export class Cont extends View{

    update():void{};

    constructor(model: Model){
        super();
        this.root.id="cont";
        this.root.appendChild(new Left(model).root);
        this.root.appendChild(new Right(model).root);
    }
}
