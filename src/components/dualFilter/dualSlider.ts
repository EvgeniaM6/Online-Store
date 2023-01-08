import { Filters, IProducts } from '../../models';
import { createElem } from '../../utilities';
import './dualFilter.scss';

export default class DualFilter {
  createDualFilterElems(data: Array<IProducts>): void {
    Object.values(Filters).forEach((filterType) => {
      if (filterType.slice(0, 3) === 'ds:') {
        const dualSlidersBlock = createElem('div', 'dual-sliders-block', '.dual-sliders');
        const sliderType = filterType.slice(3);
        dualSlidersBlock.innerHTML = this.drawDualFilter(sliderType);
        this.drawDualControls(sliderType, dualSlidersBlock, data);
        this.drawOutData(sliderType, dualSlidersBlock);
        const fromSlider = dualSlidersBlock.querySelector('#fromSlider') as HTMLInputElement;
        const toSlider = dualSlidersBlock.querySelector('#toSlider') as HTMLInputElement;
        const fromNum = dualSlidersBlock.querySelector('.from-value__num') as HTMLElement;
        const toNum = dualSlidersBlock.querySelector('.to-value__num') as HTMLElement;
        this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
        this.setToggleAccessible(toSlider);
        fromSlider.addEventListener('input', () => this.controlFromSlider(fromSlider, toSlider, fromNum, sliderType));
        toSlider.addEventListener('input', () => this.controlToSlider(fromSlider, toSlider, toNum, sliderType));
      }
    });
  }

  drawDualControls(sliderType: string, dualSlidersBlock: HTMLElement, data: Array<IProducts>): void {
    // <input class="dual-slider__fromSlider" type="range" value="10" min="10" max="1748" id="fromSlider"/>
    // <input class="dual-slider__toSlider" type="range" value="1749" min="11" max="1749" id="toSlider"/>
    const [minValue, maxValue] = this.getMinMaxParam(sliderType);
    const [minShownValue, maxShownValue] = this.getMinMaxParam(sliderType, data);
    console.log('sliderType=', sliderType, 'min=', minValue, 'max=', maxValue);
    const dualControlsContainer = dualSlidersBlock.querySelector('.dual-slider__control') as HTMLElement;
    const fromSlider = createElem('input', 'dual-slider__fromSlider', dualControlsContainer) as HTMLInputElement;
    fromSlider.type = 'range';
    fromSlider.min = `${minValue}`;
    fromSlider.max = `${maxValue}`;
    fromSlider.value = `${minShownValue}`;
    fromSlider.id = 'fromSlider';
    const toSlider = createElem('input', 'dual-slider__toSlider', dualControlsContainer) as HTMLInputElement;
    toSlider.type = 'range';
    toSlider.min = `${minValue}`;
    toSlider.max = `${maxValue}`;
    toSlider.value = `${maxShownValue}`;
    toSlider.id = 'toSlider';
  }

  getMinMaxParam(sliderType: string, data?: Array<IProducts>): Array<number> {
    return window.app.dataBase.getMinMaxParam(sliderType, data);
  }

  drawOutData(sliderType: string, dualSlidersBlock: HTMLElement): void {
    // `<div class="dual-slider__from-data from-value">
    //   <span>€</span>
    //   <span class="from-value__num">10.00</span>
    // </div>
    // <span>⟷</span>
    // <div class="dual-slider__to-data to-value">
    //   <span>€</span>
    //   <span class="to-value__num">1100.00</span>
    // </div>`
    const outDataContainer = dualSlidersBlock.querySelector('.dual-slider__out-data') as HTMLElement;
    const fromValue = createElem('div', 'dual-slider__from-data from-value', outDataContainer) as HTMLElement;
    if (sliderType === Filters.Price.slice(3)) {
      createElem('span', null, fromValue, '€') as HTMLElement;
    }
    const textFromInput = dualSlidersBlock.querySelector('.dual-slider__fromSlider') as HTMLInputElement;
    const textFrom = textFromInput.value;
    console.log('textFrom=', textFrom);
    createElem('span', 'from-value__num', fromValue, textFrom) as HTMLElement;
    createElem('span', null, outDataContainer, '⟷') as HTMLElement;
    const toValue = createElem('div', 'dual-slider__to-data to-value', outDataContainer) as HTMLElement;
    if (sliderType === Filters.Price.slice(3)) {
      createElem('span', null, toValue, '€') as HTMLElement;
    }
    const textToInput = dualSlidersBlock.querySelector('.dual-slider__toSlider') as HTMLInputElement;
    const textTo = textToInput.value;
    console.log('textTo=', textTo);
    createElem('span', 'to-value__num', toValue, textTo) as HTMLElement;
  }

  drawDualFilter(dualFilterType: string): string {
    return `
      <div class="dual-slider dual-slider-${dualFilterType}">
        <div class="dual-slider__title">${dualFilterType}</div>
        <div class="dual-slider__out-data">
        </div>
        <div class="dual-slider__control">
        </div>
      </div>
    `;
  }

  controlFromSlider(
    fromSlider: HTMLInputElement,
    toSlider: HTMLInputElement,
    fromInput: HTMLElement,
    sliderType: string
  ) {
    const [from, to] = this.getParsed(fromSlider, toSlider);
    this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    if (from > to) {
      fromSlider.value = `${to}`;
      fromInput.textContent = `${to}`;
    } else {
      fromInput.textContent = `${from}`;
    }
    this.filterProductsByParam(sliderType, from, to);
  }

  controlToSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, toInput: HTMLElement, sliderType: string) {
    const [from, to] = this.getParsed(fromSlider, toSlider);
    this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    this.setToggleAccessible(toSlider);
    if (from <= to) {
      toSlider.value = `${to}`;
      toInput.textContent = `${to}`;
    } else {
      toInput.textContent = `${from}`;
      toSlider.value = `${from}`;
    }
    this.filterProductsByParam(sliderType, from, to);
  }

  getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement) {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);
    return [from, to];
  }

  fillSlider(
    from: HTMLInputElement,
    to: HTMLInputElement,
    sliderColor: string,
    rangeColor: string,
    controlSlider: HTMLInputElement
  ) {
    const rangeDistance = +to.max - +to.min;
    const fromPosition = +from.value - +to.min;
    const toPosition = +to.value - +to.min;
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} 100%)`;
  }

  setToggleAccessible(currentTarget: HTMLInputElement) {
    const toSlider = document.querySelector('#toSlider') as HTMLInputElement;
    if (Number(currentTarget.value) <= 0) {
      toSlider.style.zIndex = `${2}`;
    } else {
      toSlider.style.zIndex = `${0}`;
    }
  }

  filterProductsByParam(sliderType: string, from: number, to: number) {
    window.app.router.changeHrefBySlider(sliderType, from, to);
  }
}
