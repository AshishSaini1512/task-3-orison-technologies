import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./common/header/Header";
import Pages from "./pages/Pages";
import Cart from "./common/Cart/Cart";
import Footer from "./common/footer/Footer";
import Data from "./components/Data";
import Sdata from "./components/shops/Sdata";

function App() {
  // Step 1: Extract productItems and shopItems from the data
  const { productItems } = Data;
  const { shopItems } = Sdata;

  // Step 2: Initialize state for CartItem
  const [CartItem, setCartItem] = useState([]);

  // Step 4: Function to add items to cart
  const addToCart = (product) => {
    const productExists = CartItem.find((item) => item.id === product.id);

    if (productExists) {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExists, qty: productExists.qty + 1 }
            : item
        )
      );
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }]);
    }
  };

  // Step 6: Function to decrease quantity
  const decreaseQty = (product) => {
    const productExists = CartItem.find((item) => item.id === product.id);

    if (productExists.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id));
    } else {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExists, qty: productExists.qty - 1 }
            : item
        )
      );
    }
  };

  return (
    <Router>
      <Header CartItem={CartItem} />
      <Routes>
        <Route
          path="/"
          element={
            <Pages
              productItems={productItems}
              addToCart={addToCart}
              shopItems={shopItems}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              CartItem={CartItem}
              addToCart={addToCart}
              decreaseQty={decreaseQty}
            />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;