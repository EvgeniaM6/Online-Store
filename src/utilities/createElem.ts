export function createElem(
  tagName: string | HTMLElement,
  clasName?: string,
  parent?: HTMLElement,
  txtContent?: string
): HTMLElement {
  const createdElem: HTMLElement = typeof tagName === 'string' ? document.createElement(tagName) : tagName;

  if (clasName) {
    createdElem.className = clasName;
  }

  if (txtContent) {
    createdElem.textContent = txtContent;
  }

  if (parent) {
    parent.append(createdElem);
  }

  return createdElem;
}
