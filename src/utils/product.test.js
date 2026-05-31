import {
  getProductId,
  getLineItemId,
  indexProducts,
  findProduct,
  getStock,
  formatPrice,
} from './product';

describe('product utils', () => {
  test('getProductId prefers _id, falls back to id', () => {
    expect(getProductId({ _id: 'abc', id: 1 })).toBe('abc');
    expect(getProductId({ id: 7 })).toBe('7');
    expect(getProductId(null)).toBe('');
  });

  test('getLineItemId handles productId, productid and id', () => {
    expect(getLineItemId({ productId: 'p1' })).toBe('p1');
    expect(getLineItemId({ productid: 'p2' })).toBe('p2');
    expect(getLineItemId({ id: 3 })).toBe('3');
  });

  test('findProduct matches across id shapes (this is the wishlist fix)', () => {
    const products = [
      { _id: 'a', name: 'A' },
      { id: 2, name: 'B' },
    ];
    const index = indexProducts(products);
    expect(findProduct(index, 'a').name).toBe('A');
    expect(findProduct(products, 2).name).toBe('B');
    expect(findProduct(index, 'missing')).toBeUndefined();
  });

  test('getStock coerces to a number, defaulting to 0', () => {
    expect(getStock({ stock: 5 })).toBe(5);
    expect(getStock({})).toBe(0);
    expect(getStock(null)).toBe(0);
  });

  test('formatPrice renders rupees', () => {
    expect(formatPrice(2499)).toBe('₹2,499');
    expect(formatPrice(0)).toBe('₹0');
    expect(formatPrice(undefined)).toBe('₹0');
  });
});
