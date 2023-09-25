import { createAction } from "../../utils/reducer.utils";

import { CART_ACTION_TYPES } from "./cart.types";

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

export const setIsCartOpen = (bool) => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);
}

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}