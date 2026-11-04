# ApexStore - Simple React + Vite E-Commerce

A simple, easy-to-explain React e-commerce application using Vite, plain HTML, standard CSS, and JavaScript.

---

## Why This Structure is Simple to Explain

- **No Tailwind CSS**: Styled entirely using simple, readable classes in [**`src/index.css`**](file:///e:/Ecommerce%20website/frontend/src/index.css).
- **Clean JSX**: Standard React components without complicated utility classes or boilerplate.
- **Easy-to-Follow Flow**:
  1. **Navbar** (`src/components/Navbar.jsx`): Header, search bar, links, and cart icon badge.
  2. **Home** (`src/pages/HomePage.jsx`): Hero banner, category buttons, and product cards grid.
  3. **Product Detail** (`src/pages/ProductDetailPage.jsx`): Large image, specifications, quantity selector, and Add to Cart / Buy Now buttons.
  4. **Shopping Cart** (`src/pages/CartPage.jsx`): Items in cart, quantity increment/decrement (`- / +`), delete, and order summary.
  5. **Checkout** (`src/pages/CheckoutPage.jsx`): Delivery address, payment options (UPI, Card, Net Banking, COD), and Pay Now button.
  6. **Payment Success** (`src/pages/PaymentSuccessPage.jsx`): Confirmation checkmark, order ID, and link to orders.
  7. **Orders** (`src/pages/OrdersPage.jsx`): Filter orders by Delivered, Shipped, or Cancelled.
  8. **Auth** (`LoginPage.jsx`, `RegisterPage.jsx`, `ForgotPasswordPage.jsx`, `ResetPasswordPage.jsx`): Standard login, signup, and reset forms.

---

## How to Run

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.
