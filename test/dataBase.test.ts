import DataBase from '../src/components/dataBase';

describe('DataBase', () => {
  let dataBase: DataBase;
  beforeEach(() => {
    dataBase = new DataBase();
  });

  it('should create instance', () => {
    expect(dataBase).toBeDefined();
  });

  it('getAllProducts method should return not empty array', () => {
    expect(dataBase.getAllProducts().length).toBeGreaterThan(0);
  });

  it('getProductById method should return something', () => {
    expect(dataBase.getProductById(1)).toBeDefined();
  });

  it('getProductsByParams method should return something', () => {
    const params = new URLSearchParams('category=laptops');
    expect(dataBase.getProductsByParams(params)).toBeDefined();
  });
});
