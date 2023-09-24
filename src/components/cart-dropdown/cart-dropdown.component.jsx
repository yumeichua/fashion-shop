import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../context/cart.context';

import { CartDropdownContainer, EmptyMesage, CartItemsContainer } from './cart-dropdown.styles';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => navigate('/checkout');

    return (
        <CartDropdownContainer>
            <CartItemsContainer>
                {
                    cartItems.length ? (
                        cartItems.map((cartItem) => {
                            return <CartItem key={ cartItem.id } cartItem={ cartItem }/>
                        })
                    ): (
                        <EmptyMesage>Your cart is empty.</EmptyMesage>
                    )
                }
                
            </CartItemsContainer>
            <Button label="Checkout" onClick={ goToCheckoutHandler } />
        </CartDropdownContainer>
    )
};

export default CartDropdown;