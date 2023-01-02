import './dualFilter.scss';

// const arrDualFilterType = ['price', 'stock'];
export default function drawDualFilter(dualFilterType: string): string {
  return `
  <div class="dual-sliders-block">
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
  </div>
  `;
}
