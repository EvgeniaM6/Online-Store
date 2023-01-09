import Header from './header/header';
import DrawElements from './drawElements';
import Footer from './footer/footer';
import Router from './router';
import DataBase from './dataBase';
import MainPageTemplate from './mainPageTemplate/mainPageTemplate';
import ProductCard from './productCard/productCard';
import Filter from './filter/filter';
import DualFilter from './dualFilter/dualSlider';

export default class App {
  header: Header;
  footer: Footer;
  currentPage: DrawElements;
  router: Router;
  dataBase: DataBase;
  mainPageTemplate: MainPageTemplate;
  productCard: ProductCard;
  filter: Filter;
  dualFilter: DualFilter;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.currentPage = new DrawElements();
    this.router = new Router();
    this.dataBase = new DataBase();
    this.mainPageTemplate = new MainPageTemplate();
    this.productCard = new ProductCard();
    this.filter = new Filter();
    this.dualFilter = new DualFilter();
  }

  start(): void {
    this.header.drawLayout();
    this.footer.drawFooter();
    this.router.checkHref();
  }
}
