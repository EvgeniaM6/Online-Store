import DrawElements from './drawElements';

export default class App {
    currentPage: DrawElements;

    constructor() {
        this.currentPage = new DrawElements();
    }
}
