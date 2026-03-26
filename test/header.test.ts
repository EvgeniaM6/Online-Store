import Header from '../src/components/header/header';

describe('Header', () => {
  let header: Header;
  beforeEach(() => {
    header = new Header();
  });

  it('should create instance', () => {
    expect(header).toBeDefined();
  });

  it('convertSumToStr method should return string', () => {
    expect(header.convertSumToStr(0)).toBe('0.00');
    expect(header.convertSumToStr(1)).toBe('1.00');
    expect(header.convertSumToStr(1.2)).toBe('1.20');
    expect(header.convertSumToStr(1.23)).toBe('1.23');
    expect(header.convertSumToStr(1000)).toBe('1,000.00');
  });

  it('drawLayout method should return nothing', () => {
    expect(header.drawLayout()).toBeUndefined();
  });
});
