import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import axios from 'axios';
import './AllProducts.css';
import Loader from '../../components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { setProductsState } from '../../redux/features/productSlice';
import { TextField } from '@mui/material';


const AllProducts = () => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])

    const productState = useSelector(state => state.productState)
    const dispatch = useDispatch()



    const loadproducts = async () => {

        setLoading(true)
        await axios.get('https://fakestoreapi.com/products').then(res => {
            dispatch(setProductsState(res.data))
            setProducts(res.data)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    };

    useEffect(() => {
        if (productState.products.length < 1) {
            loadproducts();
        } else {
            setProducts(productState.products)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const searchProduct = (e) => {
        e.preventDefault()

        const filteredResults = productState.products.filter((item) => {
            const { title, description, category } = item;
            const lowercaseSearch = e.target.value;
            return (
                title.toLowerCase().includes(lowercaseSearch) ||
                description.toLowerCase().includes(lowercaseSearch) ||
                category.toLowerCase().includes(lowercaseSearch)
            );
        });
        setProducts(filteredResults)
    }


    return (

        loading ? <Loader /> :
            <div className='allproductswrapper'>
                <div className="allproductssearchbar">
                    <TextField
                        margin="normal"
                        sx={{
                            width: 400
                        }}
                        label="search"
                        onChange={e => searchProduct(e)}
                    />
                </div>
                <div className='allproducts'>
                    {products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
    );
};

export default AllProducts;