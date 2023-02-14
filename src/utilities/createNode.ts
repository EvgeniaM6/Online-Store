export class CreateNode {
  parentElem?: HTMLElement | null;
  tagName: string | undefined;
  className: string | undefined;
  textContent: string | undefined;
  node: HTMLElement;

  constructor(parentElem: HTMLElement | null, tagName = 'div', className = '', textContent = '') {
    const elem: HTMLElement = document.createElement(tagName);
    this.node = elem;

    elem.className = className;
    elem.textContent = textContent;
    if (parentElem) {
      parentElem.append(elem);
    }
  }

  destroy(): void {
    this.node.remove();
  }
}
