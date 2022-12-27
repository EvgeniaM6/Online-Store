import Header from './header/header';
import { CreateNode } from '../utilities/createNode';
import { footerTemplate } from './footer/footer';

export default class DrawElements {
    page: unknown; // !исправить тип

    constructor() {
        this.page = this.drawMainPage();
    }

    drawMainPage(): void {
        this.drawHeader();
        this.drawFooter();
    }

    drawHeader(): void {
        const header = new Header();
    }

    drawFooter(): void {
        const footer = new CreateNode(document.body, 'footer', 'footer', '');
        footer.node.innerHTML = footerTemplate();
    }
}
