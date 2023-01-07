import { Filters } from '../../models';
import { createElem } from '../../utilities';
import './dualFilter.scss';

export default class DualFilter {
  createDualFilterElems(): void {
    Object.values(Filters).forEach((filterType) => {
      if (filterType.slice(0, 3) === 'ds:') {
        const dualSlidersBlock = createElem('div', 'dual-sliders-block', '.dual-sliders');
        dualSlidersBlock.innerHTML = this.drawDualFilter(filterType.slice(3));
      }
    });
  }

  drawDualFilter(dualFilterType: string): string {
    return `
      <div class="dual-slider dual-slider-${dualFilterType}">
        <div class="dual-slider__title">${dualFilterType}</div>
        <div class="dual-slider__out-data">
          <div class="dual-slider__from-data">$10.00</div>
          <span>⟷</span>
          <div class="dual-slider__to-data">$1100.00</div>
        </div>
        <div class="dual-slider__control">
          <input class="dual-slider__fromSlider" type="range" value="20" min="0" max="100" />
          <input class="dual-slider__toSlider" type="range" value="80" min="0" max="100" />
        </div>
      </div>
    `;
  }
}
