import App from './components/app';
import './global.css';

declare global {
  interface Window {
    app: App;
  }
}
console.log('hello, world!');
window.app = new App();
