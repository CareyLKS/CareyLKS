import {  Subject } from "./observer";
import { stockRecords } from "./stocks";

export class Model extends Subject{
    public disList: string[] = [];
    public sel: string[] = [];
    public disNum=0;
    public DisMode=true; //Chart Mode
    // private foc="";
    public selNum =0;
    public redoN =0 ;
    public undoN=0;
    public shift=false;
    private UndoSel: Array<Array<string>>=[[]];
    private UndoDis: Array<Array<string>>=[[]];
    private UndoAvi: Array<Array<string>>=[[]];
    // private UndoFoc: string[]=[];
    private RedoSel:  Array<Array<string>>=[[]];
    private RedoDis:  Array<Array<string>>=[[]];
    private RedoAvi: Array<Array<string>>=[[]];
    // private RedoFoc: string[]=[];
    private lastDis: string[] = [];


    addSel(sid: string){
        console.log(`Last Fis: ${this.lastDis} ${this.disList.includes(sid)} ${this.disList} `);
        if (!this.disList.includes(sid)) return;
        console.log(`Display add ${sid}, Shift? ${this.shift}`);
        if (this.shift==false) {
            this.sel.length=0;
            this.sel.push(sid);
            this.lastDis.push(sid);
            // this.foc=sid
            // this.UndoFoc.push(sid);
        }
        else {
            let fid=this.sel.indexOf(sid);
            if (fid>-1) this.sel.splice(this.sel.indexOf(sid),1);
            else this.sel.push(sid);
        }
        this.selNum=this.sel.length;
        //if (this.selNum>0) this.foc=this.sel[0];
        this.notifyObservers();
    }

    disSelAll(){
        this.sel.length=0;
        // this.foc="";
        this.selNum=this.sel.length;
        this.notifyObservers();
    }

    KeyAction(key: KeyboardEvent){
        if (key.shiftKey && key.type==='keydown') this.shift=true;
        else this.shift=false;
        console.log(`Shift?? ${this.shift}`);
        this.notifyObservers();
    }

    ToggleMode(ch: boolean){
        this.DisMode=ch;
        console.log(`toggled ${this.DisMode}`)
        this.notifyObservers();
    }

    getPri(tar: string):number{ 
        for (let i=0;i<9;i++){
            if (stockRecords[i].symbol==tar){
                return stockRecords[i].price;
            }
        }    
        return 0;    
    }

    getCha(tar: string):number {
        for (let i=0;i<9;i++){
            if (stockRecords[i].symbol==tar){
                return stockRecords[i].change;
            }
        }    
        return 0;  
    }
    //get num shown
    getShown(): number {return this.disNum;}

    getName(tar:string):string {
        for (let i=0;i<9;i++){
            if (stockRecords[i].symbol==tar){
                return stockRecords[i].name;
            }
        }    
        return "";    
    }

    getID(tar:string):number {
        for (let i=0;i<9;i++){
            if (stockRecords[i].symbol==tar){
                return i;
            }
        }    
        return -1;    
    }

    getRank(id: number, cap:number):number{
        let rank=1;
         
        return rank;
    }

    getCap(tar:string):string {
        for (let i=0;i<9;i++){
            if (stockRecords[i].symbol==tar){
                return stockRecords[i].mcap;
            }
        }    
        return "";    
    }

    getFoc():string {return this.sel[0];}

    avi = ["NVDA","GOOG","AAPL","MSFT","AMZN","META","TSM","TSLA","AVGO"]
    
    disNew(){ //add random to display list
        this.record();
        
        // console.log("add new");
        let rnd = Math.floor(Math.random()* this.avi.length);
        // if (this.disNum==0) this.foc=this.avi[rnd];
        this.disList.push(this.avi[rnd]);
        this.avi.splice(rnd,1);
        this.disNum++;
        this.notifyObservers();
    }

    
    disRem(){
        this.record();
        // console.log(this.sel);
        let noSel=(this,this.sel.length==0);
        if (this.sel.length>0){
            if (this.sel.length==1) this.lastDis.pop();
            while (this.sel.length>0){
                let val=this.sel[0];
                this.sel.splice(0,1);
                let ind=this.disList.indexOf(val);
                if (ind!=-1) this.disList.splice(ind,1);
                this.avi.push(val);
            }
        }
        else {
            let rmv=this.disList.pop()?? "";
            this.avi.push(rmv);
            let ind=this.sel.indexOf(rmv);
            if (ind!=-1) this.sel.splice(ind,1);
        }
        this.selNum=this.sel.length;
        this.disNum=this.disList.length;
        let lst= this.lastDis.pop()?? "";
        // console.log(`Switch to last Dis ${lst}`);
        if (!noSel){
            if (this.lastDis.length>0)  this.addSel(lst);
            else if (this.disList.length>0)  this.addSel(this.disList[0]);
        }
        this.notifyObservers();
    }



    genGraghData(id: number, W:number, H:number): {xs:number[], ys:number[], xa:string[], ya:string[],ygap:number[]}{
         //cal ratio
        let xs= Array(7).fill(0); //coordinate
        let ys= Array(7).fill(0); //coordinate
        let ya:string[]= Array(7).fill(""); //label
        let xa = Array(7).fill(0); //label
        let ygap = Array(7).fill(0); //label y
        //console.log(`Size: ${W}x${H}`);
        let his=stockRecords[id].history;
        let mx=-1, mn=99999;
        for (let i=0;i<7;i++) {mx=Math.max(mx,his[i].mcap), mn=Math.min(mn,his[i].mcap)};
        let gap=((mx-mn)/7);
        const padL=Math.max(42, W*0.10); 
        const padT=Math.max(11, H*0.04); 
        const padR=Math.max(16, W*0.03);
        const padB=Math.max(28, H*0.13);
        const plotW =W-padL-padR;
        const plotH =H-padT-padB;
        for (let i=0;i<7;i++){
            xs[i]=padL+(i/6)*plotW;  
            ys[i]=(H-padB)-((his[i].mcap-mn)/(mx-mn))*plotH;
            ya[i]=new Intl.NumberFormat('en-US',
                {minimumFractionDigits: 0,maximumFractionDigits: 0,useGrouping: true})
                .format(gap*(i+1));
            xa[i]=his[i].year;
            ygap[i]=H/7.2*i;
        }
        return {xs,ys,xa,ya,ygap};
    }
    
    record(){
        this.UndoDis.push([...this.disList]);
        this.UndoSel.push([...this.sel]);
        this.UndoAvi.push([...this.avi]);
        // this.UndoFoc.push(this.foc);
        this.undoN++;
        this.redoN=0;
        this.RedoAvi.length=0;
        this.RedoDis.length=0;
        this.RedoSel.length=0;

        // console.log(`Record Done, ${this.selNum} ${this.sel} ${this.disNum} ${this.disList}`)
        this.notifyObservers();
    }

    undo(){
        if (this.undoN<=0) return;
        this.RedoDis.push([...this.disList]);
        this.RedoSel.push([...this.sel]);
        this.RedoAvi.push([...this.avi]);
        // this.RedoFoc.push(this.foc);
        // console.log(`Saved for redo, ${this.selNum} ${this.sel} ${this.disNum} ${this.disList}`)
        const tl=this.UndoDis.pop()?? []
        this.disList=[...tl];
        const td=this.UndoSel.pop()?? [];
        this.sel=[...td];
        const ta=this.UndoAvi.pop()??[];
        this.avi=[...ta];
        // this.foc=this.UndoFoc.pop()??"";
        this.undoN--;
        this.redoN++;
        this.disNum=this.disList.length;
        this.selNum=this.sel.length;

        // console.log(`Undo Done, ${this.selNum} ${this.sel} ${this.disNum} ${this.disList}`)
        this.notifyObservers();
    }

    redo(){
        if (this.redoN<=0) return;

        this.UndoDis.push([...this.disList]);
        this.UndoSel.push([...this.sel]);
        this.UndoAvi.push([...this.avi]);
        // this.UndoFoc.push(this.foc);


        const tl=this.RedoDis.pop()?? []
        this.disList=[...tl];
        const td=this.RedoSel.pop()?? [];
        this.sel=[...td];
        const ta=this.RedoAvi.pop()??[];
        this.avi=[...ta];
        // this.foc=this.RedoFoc.pop()??"";

        this.undoN++;
        this.redoN--;
        this.disNum=this.disList.length;
        this.selNum=this.sel.length;
        // console.log(`Redo Done, ${this.selNum} ${this.sel} ${this.disNum} ${this.disList}`)
        this.notifyObservers();
    }

    
}
