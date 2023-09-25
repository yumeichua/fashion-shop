import { useDispatch, useSelector } from 'react-redux';

import Button from '../button/button.component';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

import { ProductCardContainer, Footer } from './product-card.styles';


const ProductCard = ({ product }) => {
    const { name, imageUrl, price } = product;
    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems);
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return (
        <ProductCardContainer>
            <img src={ imageUrl } alt={`${ name }`} />
            <Footer>
                <span className='name'>{ name }</span>
                <span className='price'>{ price }</span>
            </Footer>
            <Button buttonType='inverted' label='Add to cart' onClick={ addProductToCart }></Button>
        </ProductCardContainer>
    )
};

export default ProductCard;