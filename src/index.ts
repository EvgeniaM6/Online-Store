import App from './components/app';
import './global.scss';

declare global {
  interface Window {
    app: App;
  }
}
// console.log('hello, world!');
window.app = new App();
