import { createElem } from '../../utilities';
import './header.scss';

export default class Header {
  clientTotalSum: HTMLElement;
  clientBasketNum: HTMLElement;

  constructor() {
    console.log('header');
    this.clientTotalSum = createElem('span', 'total__sum');
    this.clientBasketNum = createElem('div', 'basket__num');
    this.drawLayout();
  }

  drawLayout(): void {
    const header: HTMLElement | null = document.querySelector('.header');
    const headerContainer: HTMLElement = createElem('div', 'container header__container', header);
    const headerEl: HTMLElement = createElem('div', 'header__block', headerContainer);

    const logoBlock: HTMLElement = createElem('div', 'logo', headerEl);
    createElem('div', 'logo__image', logoBlock);
    createElem('h1', 'logo__title', logoBlock, 'Online Store');
    logoBlock.addEventListener('click', () => this.buildPage('main'));

    const clientBlock: HTMLElement = createElem('div', 'client', headerEl);
    const clientTotalBlock: HTMLElement = createElem('div', 'client__total total', clientBlock);
    createElem('span', 'total__text', clientTotalBlock, 'Cart total:');
    createElem('span', 'total__currency', clientTotalBlock, '€');
    clientTotalBlock.append(this.clientTotalSum);

    const clientBasketBlock: HTMLElement = createElem('div', 'client__basket basket', clientBlock);
    const clientBasketContainer: HTMLElement = createElem('div', 'basket__container', clientBasketBlock);
    const clientBasketNumBlock: HTMLElement = createElem('div', 'basket__num-block', clientBasketContainer);
    clientBasketNumBlock.append(this.clientBasketNum);
    clientBasketBlock.addEventListener('click', () => this.buildPage('basket'));

    const totalSum = 0; // вместо 0 получить из переменной сумму и кол-во покупок в корзине
    const totalAmount = 0;
    this.updateData(totalSum, totalAmount);
  }

  updateData(totalSum: number, totalAmount: number): void {
    this.updateTotalSum(totalSum);
    this.updateTotalAmount(totalAmount);
  }

  updateTotalSum(totalSum: number): void {
    const totalSumStr = this.convertSumToStr(totalSum);
    this.clientTotalSum.textContent = totalSumStr;
  }

  updateTotalAmount(totalAmount: number): void {
    const totalAmountStr = `${totalAmount}`;
    this.clientBasketNum.textContent = totalAmountStr;
  }

  convertSumToStr(num: number): string {
    let str = `${num}`;
    if (!str.includes('.')) str = `${str}.00`;
    const indexDot = str.indexOf('.');
    if (str.slice(indexDot + 1).length < 2) str = `${str}0`;

    if (num >= 1000) {
      const arrDigitsAndComma: Array<string> = [];
      const [strInteger, strFrac] = str.split('.');
      const lastDigitIndex = strInteger.length - 1;
      strInteger
        .split('')
        .reverse()
        .forEach((digit, i) => {
          arrDigitsAndComma.push(digit);
          if (i && !((i + 1) % 3) && i < lastDigitIndex) arrDigitsAndComma.push(',');
        });
      const strIntegerComma = arrDigitsAndComma.reverse().join('');
      str = `${strIntegerComma}.${strFrac}`;
    }
    return str;
  }

  buildPage(page: string): void {
    // вып. ф-ция из другого модуля, которая выз. др. ф-ции: обновить адрес (page), нарисовать страницу (page)
    console.log(`build ${page}`);
  }
}
