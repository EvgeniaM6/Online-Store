import Footer from '../src/components/footer/footer';

describe('Footer', () => {
  let footer: Footer;
  beforeEach(() => {
    footer = new Footer();
  });

  it('should create instance', () => {
    expect(footer).toBeDefined();
  });

  it('footerTemplate method should return not empty string', () => {
    expect(footer.footerTemplate().length).toBeGreaterThan(0);
  });

  it('drawFooter method should not return string', () => {
    expect(footer.drawFooter()).not.toBe('coconut');
  });
});
