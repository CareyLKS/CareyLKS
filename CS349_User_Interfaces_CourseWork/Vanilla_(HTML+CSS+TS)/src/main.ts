import { Model } from "./model";
import {ToolBar } from   "./view/toolb";
import { Cont } from "./view/cont";
import { StBar } from "./view/stbar";

const model = new Model();

import "./main.css";

// root container (the div already in index.html)
const root = document.querySelector("div#app") as HTMLDivElement;
if (!root) throw new Error("root div for app not found");


root.appendChild(new ToolBar(model).root);
root.appendChild(new Cont(model).root);
root.appendChild(new StBar(model).root);




