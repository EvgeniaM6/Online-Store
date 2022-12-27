import './footer.scss';

export function footerTemplate(): string {
    return `
    <div class="container footer__container">
      <a class="rss-logo" href="https://rs.school/js/" target="_blank"></a>
      <div class="info-team">
        <span class="info-team__year">2022 | team</span>
        <a class="info-team__author" href="https://github.com/avshir" target="_blank">avshir <span class
        ="info-team__divider">&</span></a>
        <a class="info-team__author" href="https://github.com/EvgeniaM6" target="_blank">EvgeniaM6</a>
      </div>
    </div>
  `;
}
