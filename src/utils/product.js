// Helpers that paper over the backend's inconsistent identifiers. MongoDB
// documents expose `_id`, the legacy mock data used `id`, cart/order line items
// use `productId` (and occasionally the lower-cased `productid` that Mongo's
// default field casing produces). Centralising the matching here means the rest
// of the app can stop re-implementing it (and getting it wrong, as the old
// Wishlist did).

/** Canonical, comparable id for a product document. */
export const getProductId = (product) =>
  product == null ? '' : String(product._id ?? product.id ?? '');

/** Canonical, comparable id for a cart/order/wishlist line item. */
export const getLineItemId = (item) =>
  item == null ? '' : String(item.productId ?? item.productid ?? item.id ?? '');

/** Build an id -> product lookup for O(1) access in lists. */
export const indexProducts = (products = []) => {
  const map = new Map();
  for (const product of products) map.set(getProductId(product), product);
  return map;
};

/** Find a product by any id shape, using a prebuilt index when available. */
export const findProduct = (products, id) => {
  const key = String(id ?? '');
  if (products instanceof Map) return products.get(key);
  return (products || []).find((p) => getProductId(p) === key);
};

export const getStock = (product) => Number(product?.stock ?? 0);

/** Format a number as Indian Rupees, e.g. 2499 -> "₹2,499". */
export const formatPrice = (value) =>
  `₹${Number(value || 0).toLocaleString('en-IN')}`;
