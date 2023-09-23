import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contain productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    // If found, increment quantity
    if ( existingCartItem ) {
        console.log("existing item found");
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
            { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
    }
    // return new array with modified cartItems / new cart item
    return [ ...cartItems, { ...productToAdd, quantity: 1 }]
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    setCartCount: () => {}
});

export const CartProvider = ({ children }) => {
    const [ isCartOpen, setIsCartOpen ] = useState(null);
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartCount, setCartCount ] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, setCartCount };
    return (
        <CartContext.Provider value={ value }>{ children }</CartContext.Provider>
    )
};