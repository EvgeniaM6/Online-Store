import Header from './header/header';
import DrawElements from './drawElements';
import Footer from './footer/footer';

export default class App {
  header: Header;
  footer: Footer;
  currentPage: DrawElements;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.currentPage = new DrawElements();
  }
}
