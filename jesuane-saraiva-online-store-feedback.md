# Overall:

- Change `<title>` tag to more appropriate name then "React App" and icon also
- Remove unecessary React default files e.g. favicon, react logo etc
- Consider organising your imports in someway, it makes it easier to read - eslint and prettier can help organise
- Multiple `<h1>` tags on page e.g in header and in main
- Remove unnecessary comments e.g. commented out code (LandingPage.tsx)
- Consider using an `.env` file for things like `API_URL`
- Review deprecation warnings - some easy fixes e.g. when running `npm run build` there is a `SASS - Move Declarations Above Nested Rules` warning
- Consider using optional chaining (?.) throughout the codebase when accessing potentially null or undefined properties. This can prevent runtime errors and improve code clarity
- Be consistent throughout your code - i.e. stick to one way of doing things. For example in scss when defining colors, don't use rgba, hex and the color, use one of them throughout:
  - Rem or pixel
  - Rgba, hex, color
  - Font-weight: bold then 700
- Accessibility
  - Background and foreground colors do not have a sufficent contrast ratio
- Performance
  - Consider using lazy loading for images
  - Consider using `useMemo` to prevent unnecessary re-computations. This can improve performance, especially for complex calculations or when dealing with large datasets. You could use this for your sorting on the PLP page.
  - You could use something like the below for the PLP page to prevent unnecessary fetches and use caching and useMemo for the products. The images are currently taking a long time to load:

```ts
const {
  data: products,
  isLoading,
  isFetching,
  error,
} = useQuery({
  queryKey: ["products"], // Remove sortBy from queryKey
  queryFn: fetchProducts,
  staleTime: Infinity, // Cache indefinitely (or adjust as needed)
  initialData: () => queryClient.getQueryData(["products"]), // Use cached data if available
});

const sortedProducts = useMemo(() => {
  // Sort with useMemo
  if (!products) return []; // Handle undefined products

  return [...products].sort((a, b) => {
    switch (sortBy) {
      case Order.PriceAsc:
        return a.price - b.price;
      case Order.PriceDesc:
        return b.price - a.price;
      default:
        return 0;
    }
  });
}, [products, sortBy]);
```

# API:

- API can return different status codes not just a 200 response, e.g. 401 Unauthorised, 403 Forbidden, 404 Not Found - don't assume it will always be 200
- In this instance I would be tempted to only make one api call as all the necessary details for a single product are in the allProducts data. A singleProduct API call is not required in this instance.
- When calling an async function, you need to await it e.g. calling `fetchProduct()` in ProductPage.tsx on line 49.
- Can consolidate fakeStoreApi.ts into a single fetch function (see below). This also removes need for util file api.ts. Notice the use of `Promise<T>` instead of `Promise<any>` type.

```ts
export const fetchFromApi = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Network response was not ok for endpoint: ${endpoint}`);
    }

    const data: T = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Failed to fetch data from ${endpoint}.`);
  }
};
```

Usage examples:

```ts
// Fetch all products

export const fetchProducts = async (): Promise<Product[]> => {
  return fetchFromApi<Product[]>("/products");
};

// Fetch a single product by ID

export const fetchProduct = async (id: string): Promise<Product> => {
  return fetchFromApi<Product>(`/products/${id}`);
};
```

# TESTING:

- test files should be `.spec.ts` not `.test.ts` - this is the modern way of writing tests now
- With userEvent, the new syntax is to have `const user = userEvent.setup()` at the start of a test and then use it via `user.click`
- Be consistent with the way you write tests, i prefer testing using e.g.`screen.getByText(/Add to Cart/i)`, rather then `screen.getByText('Add to Cart')`
- Keep your tests clean by reducing repeated code. For example, in `Header.test.tsx`, the line `renderWithRouter(<Header />);` is repeated in every test. This can be moved into the `beforeEach` block for better organization and readability.

```ts
beforeEach(() => {
  renderWithRouter(<Header />);
});
```

- In `Cart.test.tsx` I don't the way we are mocking and using any like:

```ts
(require("../../../context/CartContext") as any).useCart.mockReturnValue({
  items: mockCartItems,
  updateQuantity: mockUpdateQuantity,
  removeItem: mockRemoveItem,
});
```

Try something more like this which might work as a nicer structure:

```ts
jest.mock("../../../context/CartContext", () => ({
  useCart: jest.fn(),
}));

type MockCartContext = {
  items: CartItem[];
  updateQuantity: jest.Mock<(id: string, quantity: number) => void>;
  removeItem: jest.Mock<(id: string) => void>;
};

const setup = (mockContext: MockCartContext) => {
  (useCart as jest.Mock).mockReturnValue(mockContext);
  render(<Cart />);
};
```

# Styles:

- Ensure consistency in the comments and code e.g in `_mixins.scss`:
  - `md-phone` in code, but not in comments
  - Breakpoints described in comments are different to ones used in code
- Avoid `!important`
