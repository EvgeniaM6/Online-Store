import App from '../components/app';

declare global {
  interface Window {
    app: App;
  }
}
