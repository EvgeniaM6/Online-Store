import './page404.scss';

export default class Page404 {
  renderPage404(): void {
    const main = document.querySelector('.main');
    if (!main) return;
    main.innerHTML = this.drawPage404();
  }

  drawPage404(): string {
    return `
    <div class="page-404">
      <div class="container">
        <h1 class="page-404__title">Page not found</h1>
        <p class="page-404__number">404</p>
        <a href="#" class="page-404__link">Go to the main page</a>
      </div>
    </div>
    `;
  }
}
