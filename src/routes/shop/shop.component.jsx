import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { fetchCategoriesStart } from '../../store/categories/category.action';

import './shop.styles.scss';

const Shop = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const getCategoriesMap = async () => {
            dispatch(fetchCategoriesStart());
        }
        getCategoriesMap();
    }, []);

    return (
        <Routes>
            <Route index element={ <CategoriesPreview /> }></Route>
            <Route path=":category" element={ <Category /> }></Route>
        </Routes>
    );
};

export default Shop;