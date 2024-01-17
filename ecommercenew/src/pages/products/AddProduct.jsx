import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./AddProduct.css"
import { useDispatch } from 'react-redux'
import { addProduct } from '../../redux/features/productSlice'
import toast from 'react-hot-toast'


const AddProduct = () => {

    const [product, setProduct] = useState({
        title: "",
        price: 0,
        description: "",
        category: "",
        image: ""
    })

    const [categories, setCategories] = useState([])
    const dispatch = useDispatch()


    useEffect(() => {
        axios.get("https://fakestoreapi.com/products/categories").then(res => {
            setCategories(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])




    const handleSubmit = () => {
        axios.post("https://fakestoreapi.com/products", product, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            console.log(res.data)
            dispatch(addProduct(res.data))
            toast.success("Product Added Successfully")
        }).catch(err => {
            console.log(err)
            toast.error(err)
        })
    }



    return (
        <div className='addproductpage'>

            <Container component="main" maxWidth="sm" sx={{
                margin: 0
            }}>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    className='textfield'
                    onChange={e => setProduct(product => ({ ...product, title: e.target.value }))}
                />

                <TextField
                    margin="normal"
                    type='number'
                    required
                    fullWidth
                    id="price"
                    label="Price"
                    name="price"
                    autoComplete="price"
                    autoFocus
                    className='textfield'
                    onChange={e => setProduct(product => ({ ...product, price: e.target.value }))}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    autoComplete="description"
                    autoFocus
                    className='textfield'
                    multiline
                    rows={5}
                    onChange={e => setProduct(product => ({ ...product, description: e.target.value }))}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="image"
                    label="Image Link"
                    name="image"
                    autoComplete="image"
                    className='textfield'
                    onChange={e => setProduct(product => ({ ...product, image: e.target.value }))}
                />


                <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"

                        // value={age}
                        sx={{
                            width: "100%"
                        }}
                        className='textfield'
                        label="Category"
                    // onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {categories.map(c => {
                            return <MenuItem value={c}>{c}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={e => handleSubmit(e)}
                >
                    Sign In
                </Button>
            </Container>
        </div>
    )
}

export default AddProduct