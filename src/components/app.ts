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
    window.addEventListener('hashchange', () => this.renderRoute());
  }

  renderRoute(): void {
    console.log('hashchange!');
    this.router.checkHref();
  }
}
