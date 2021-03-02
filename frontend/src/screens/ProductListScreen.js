import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts, deleteProduct, createProductAction } from '../actions/productAction'
import { PRODUCT_CREATE_RESET } from '../constants/productConstant'



const ProductListScreen = ({ history, match }) => {
    const pageNumber = match.params.pageNumber || 1 
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page } = productList

    // Let get the created products
    const createProduct = useSelector(state => state.createProduct)
    const { loading: loadingCreated, success: successCreated, error: errorCreated, product: productCreate } = createProduct

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let count = 1


    useEffect(() => {
        // To reset the create product store
        dispatch({ type: PRODUCT_CREATE_RESET })
        // Check if user is login and is admin
        if (!userInfo.isAdmin) {
            history.push('/login')
        }
        
        // Let check if product has been created
        if (successCreated) {
            history.push(`/admin/product/${productCreate._id}`)
        } else {
            dispatch(listProducts('', pageNumber))
        }
    }, [dispatch, history, userInfo, successDelete, successCreated, productCreate, pageNumber])

    const deleteHandler = (id) => {
        if (window.confirm('Do you want to delete user')) {
            // DELETE PRODUCT
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
      dispatch(createProductAction())
    }
    return <>
        
        <Row className='align-item-center'>
            <Col>
            <h1>Products</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Create Product
                </Button>
            </Col>
        </Row>
        {/* For deleting product */}
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

        {/* For creating product */}
        {loadingCreated && <Loader />}
        {errorCreated && <Message variant='danger'>{errorCreated}</Message>}
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <>
            <Table striped hover responsive bordered className='table-sm'>
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{count++}</td>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category} </td>
                            <td>{product.brand} </td>
                            <td><LinkContainer to={`/admin/product/${product._id}/edit`}>
                                <Button variant='light' className='btn-sm'><i className='fas fa-edit'></i></Button>
                            </LinkContainer>

                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>
        <Paginate pages={pages} page={page} isAdmin={true} />
        </>
        )}

    </>
}

export default ProductListScreen
