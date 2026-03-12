import type { Observer } from "./logic/observer";

export default abstract class View implements Observer {
  // Called whenever the model changes to update the view's display
  abstract update(): void;

  // the element that is the root of this view
  protected _root: HTMLElement;
  get root(): HTMLElement {
    return this._root;
  }

  constructor(html = "<div />") {
    // create view root using a <template>
    const temp = document.createElement("template");
    temp.innerHTML = html;
    this._root = temp.content.firstElementChild as HTMLElement;
  }
}
