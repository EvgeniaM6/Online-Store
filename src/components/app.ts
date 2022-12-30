import Header from './header/header';
import DrawElements from './drawElements';
import Footer from './footer/footer';
import Router from './router';
import DataBase from './dataBase';

export default class App {
  header: Header;
  footer: Footer;
  currentPage: DrawElements;
  router: Router;
  dataBase: DataBase;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.currentPage = new DrawElements();
    this.router = new Router();
    this.dataBase = new DataBase();
  }

  start(): void {
    this.header.drawLayout();
    this.footer.drawFooter();
    this.router.checkHref();
  }
}
