import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const [removeAllConfirm, setRemoveAllConfirm] = useState(false);
  const [newItem, setNewItem] = useState(null);

  // Sync cartItems with localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Helper to calculate the price for each item including extras
  const calculateItemTotal = (item) => {
    const extrasTotal = item.extras?.reduce((total, extra) => total + extra.price, 0) || 0;
    return (item.basePrice + extrasTotal) * item.quantity;
  };

  // Add an item to the cart (with extras considered)
  const addToCart = (item, quantity, selectedExtras) => {
    if (cartItems.length > 0 && cartItems[0].restaurant._id !== item.restaurant._id) {
      setNewItem({ ...item, quantity, extras: selectedExtras });
      setRemoveAllConfirm(true);
    } else {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find(
          (i) => i._id === item._id && JSON.stringify(i.extras) === JSON.stringify(selectedExtras)
        );
        if (existingItem) {
          return prevItems.map((i) =>
            i._id === item._id && JSON.stringify(i.extras) === JSON.stringify(selectedExtras)
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prevItems, { ...item, quantity, extras: selectedExtras }];
      });
    }
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Remove a single item from the cart
  const removeFromCart = (itemId, extras) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item._id === itemId && JSON.stringify(item.extras) === JSON.stringify(extras)))
    );
  };

  // Confirm removing all items and add the new item
  const confirmRemoveAll = () => {
    setRemoveAllConfirm(false);
    setCartItems([{ ...newItem }]);
    setNewItem(null);
  };

  // Cancel removing all items
  const cancelRemoveAll = () => {
    setRemoveAllConfirm(false);
    setNewItem(null);
  };

  // Increase quantity of a specific item (with extras)
  const increaseQuantity = (itemId, extras) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId && JSON.stringify(item.extras) === JSON.stringify(extras)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity of a specific item (with extras)
  const decreaseQuantity = (itemId, extras) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId && JSON.stringify(item.extras) === JSON.stringify(extras) && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Calculate total cart price
  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        confirmRemoveAll,
        cancelRemoveAll,
        removeAllConfirm,
        clearCart,
        removeFromCart,
        calculateItemTotal,
        calculateCartTotal,
      }}
    >
      {children}
      {removeAllConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4">
              You already have items from a different restaurant in your cart. Would you like to remove all previous items?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelRemoveAll}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmRemoveAll}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Remove All
              </button>
            </div>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};
