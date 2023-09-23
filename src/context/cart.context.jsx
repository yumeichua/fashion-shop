import { createContext, useState, useContext } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {}
});

export const CartProvider = ({ children }) => {
    const [ isCartOpen, setIsCartOpen ] = useState(null);
    const value = { isCartOpen, setIsCartOpen };
    return (
        <CartContext.Provider value={ value }>{ children }</CartContext.Provider>
    )
};