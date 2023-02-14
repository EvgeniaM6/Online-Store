// import { CreateNode } from '../utilities/createNode';

export default class DrawElements {
  drawBasketPage(): void {
    window.app.basketPage.drawBasketPage();
  }

  drawDetailPage(id?: number): void {
    window.app.details.renderDetails(id);
  }

  drawError404(): void {
    window.app.page404.renderPage404();
  }
}
