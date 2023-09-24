import { useContext } from 'react';

import { ProductCardContainer, Footer } from './product-card.styles';

import Button from '../button/button.component';
import { CartContext } from '../../context/cart.context';

const ProductCard = ({ product }) => {
    const { name, imageUrl, price } = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product);

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