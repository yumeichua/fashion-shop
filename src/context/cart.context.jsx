import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contain productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    // If found, increment quantity
    if ( existingCartItem ) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
            { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
    }
    // return new array with modified cartItems / new cart item
    return [ ...cartItems, { ...productToAdd, quantity: 1 }]
};

const removeCartItem = (cartItems, productToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);
    // check if quantity is equal to 1, if so remove the item from the cart
    if ( existingCartItem.quantity === 1 ) {
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
    } 
    // return back cartItems with matching cart Item with reduced quantity
    return cartItems.map((cartItem) => cartItem.id === productToRemove.id ? 
        { ...cartItem, quantity: cartItem.quantity - 1 } 
        : cartItem
    );
};

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    setCartCount: () => {},
    clearItemFromCart: () => {},
    cartTotal: 0
});

export const CartProvider = ({ children }) => {
    const [ isCartOpen, setIsCartOpen ] = useState(null);
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartCount, setCartCount ] = useState(0);
    const [ cartTotal, setCartTotal ] = useState(0);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setCartTotal(newCartTotal);
    }, [cartItems]);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemFromCart, 
        clearItemFromCart,
        cartItems, 
        cartCount, 
        setCartCount,
        cartTotal
    };
    return (
        <CartContext.Provider value={ value }>{ children }</CartContext.Provider>
    )
};