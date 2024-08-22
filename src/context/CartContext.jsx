import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const [removeAllConfirm, setRemoveAllConfirm] = useState(false);
  const [newItem, setNewItem] = useState(null);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item, quantity) => {
    if (cartItems.length > 0 && cartItems[0].restaurant._id !== item.restaurant._id) {
      setNewItem({ ...item, quantity });
      setRemoveAllConfirm(true);
    } else {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((i) => i._id === item._id);
        if (existingItem) {
          return prevItems.map((i) =>
            i._id === item._id ? { ...i, quantity: i.quantity + quantity } : i
          );
        }
        return [...prevItems, { ...item, quantity }];
      });
    }
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((item) => item._id !== itemId)));
  };

  const confirmRemoveAll = () => {
    setRemoveAllConfirm(false);
    setCartItems([{ ...newItem }]);
    setNewItem(null);
  };

  const cancelRemoveAll = () => {
    setRemoveAllConfirm(false);
    setNewItem(null);
  };

  const increaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
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
        removeFromCart
      }}
    >
      {children}
      {removeAllConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4">You already have items from a different restaurant in your cart. Would you like to remove all previous items?</p>
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
