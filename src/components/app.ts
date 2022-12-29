import Header from './header/header';
import DrawElements from './drawElements';
import Footer from './footer/footer';
import Router from './router';

export default class App {
  header: Header;
  footer: Footer;
  currentPage: DrawElements;
  router: Router;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.currentPage = new DrawElements();
    this.router = new Router();
  }

  start(): void {
    this.header.drawLayout();
    this.footer.drawFooter();
    this.router.checkHref();
  }
}
