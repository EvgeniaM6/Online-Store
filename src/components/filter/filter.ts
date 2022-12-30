import './filter.scss';

export default function drawFilter(filterType: string): string {
  return `
    <div class="filter">
        <div class="filter__title">${filterType}</div>
        <div class="filter__list">
          <div class="filter__item">
            <input type="checkbox" id="smartphones" />
            <label for="smartphones">smartphones</label>
            <span>(5/5)</span>
          </div>
        </div>
      </div>
  `;
}
