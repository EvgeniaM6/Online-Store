import { createElem } from '../../utilities';

export default class Header {
  clientTotalSum: HTMLElement;

  constructor() {
    console.log('header');
    this.clientTotalSum = createElem('span', 'total__text');
    this.drawLayout();
    this.updateData();
  }

  drawLayout(): void {
    const appBlock: HTMLDivElement | null = document.querySelector('app');
    const headerEl: HTMLElement = createElem('header', 'container', appBlock);
    const logoBlock: HTMLElement = createElem('div', 'logo', headerEl);
    const clientBlock: HTMLElement = createElem('div', 'client', headerEl);
    const clientTotalBlock: HTMLElement = createElem('div', 'client__total total', clientBlock);
    createElem('span', 'total__text', clientTotalBlock, 'Cart total:');
    createElem('span', 'total__currency', clientTotalBlock, '€');
    clientTotalBlock.append(this.clientTotalSum);
    const clientBacketBlock: HTMLElement = createElem('div', 'client__backet', clientBlock);
  }

  updateData(): void {
    const totalSum = 0; // вместо 0 получить из переменной сумму покупок в корзине
    const totalSumStr = this.convertSumToStr(totalSum);
    this.clientTotalSum.textContent = totalSumStr;
  }

  convertSumToStr(num: number): string {
    let str = `${num}`;
    if (!str.includes('.')) str = `${str}.00`;
    const indexDot = str.indexOf('.');
    if (str.slice(indexDot + 1).length < 2) str = `${str}0`;

    if (num >= 1000) {
      const arrDigitsAndComma: Array<string> = [];
      const strFrac = str.slice(-3);
      str
        .slice(0, -3)
        .split('')
        .reverse()
        .forEach((digit, i) => {
          arrDigitsAndComma.push(digit);
          if (i && !((i + 1) % 3)) arrDigitsAndComma.push(',');
        });
      const strInteger = arrDigitsAndComma.reverse().join('');
      str = `${strInteger}${strFrac}`;
    }
    return str;
  }
}
