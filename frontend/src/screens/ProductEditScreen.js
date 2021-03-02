import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails, updateProductAction } from '../actions/productAction'
import FormContainer from '../components/FormContainer'
import { PRODUCT_UPDATE_RESET, PRODUCT_DETAILS_RESET } from '../constants/productConstant'



const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)


    // redux at work
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    // Let get update details on the hand so we can do anything we want to do with it.
    const updateProduct = useSelector(state => state.updateProduct)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = updateProduct


    // to disable login user not to visit login
    useEffect(() => {
        // Let check if updat is successful

        if (successUpdate) {
            dispatch({ type: PRODUCT_DETAILS_RESET })
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {

            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))

            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }


    }, [dispatch, productId, product, successUpdate, history])

    // Let handle file upload here
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post('/api/upload', formData, config)
            console.log(data)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }
    const submitHandler = (e) => {
        e.preventDefault()
        // Dispatch here
        dispatch(updateProductAction({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))


    }


    return (
        <>
            <Link to={'/admin/productlist'} className='btn btn-light my-3'>
                Go Back
        </Link>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            <FormContainer>
                <h1>Edit Product</h1>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name </Form.Label>
                            <Form.Control type="text" placeholder="Enter Product Name"
                                value={name} onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Enter Price </Form.Label>
                            <Form.Control type="number" placeholder="Enter Price"
                                value={price} onChange={(e) => setPrice(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Enter Image </Form.Label>
                            <Form.Control type="text" placeholder="Enter Image Url"
                                value={image} onChange={(e) => setImage(e.target.value)}>
                            </Form.Control>

                            <Form.File id='image-file' label='Choose Image' custom onChange={uploadFileHandler}></Form.File>
                            {uploading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>Enter Brand </Form.Label>
                            <Form.Control type="text" placeholder="Enter brand"
                                value={brand} onChange={(e) => setBrand(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Enter Category </Form.Label>
                            <Form.Control type="text" placeholder="Enter category"
                                value={category} onChange={(e) => setCategory(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>Enter CountInStock </Form.Label>
                            <Form.Control type="number" placeholder="Enter countInStock"
                                value={countInStock} onChange={(e) => setCountInStock(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Enter Description </Form.Label>
                            <Form.Control type="text" placeholder="Enter Description"
                                value={description} onChange={(e) => setDescription(e.target.value)}>
                            </Form.Control>
                        </Form.Group>


                        <Button type='submit' variant='primary'>
                            Update Product
                </Button>
                    </Form>
                )}


            </FormContainer>
        </>

    )

}

export default ProductEditScreen
