import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, userUpdateAction } from '../actions/userAction'
import FormContainer from '../components/FormContainer'
import { USER_UPDATE_RESET } from '../constants/userConstant'



const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setisAdmin] = useState(false)
   

    // redux at work
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    // For user update to know if success
    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate


    

    // to disable login user not to visit login
    useEffect(() => {
        // Let check if updat is successful
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
                console.log(user)
            } else {
                setName(user.name)
                setEmail(user.email)
                setisAdmin(user.isAdmin)
            }
        }

    }, [dispatch, userId, user, successUpdate, history])

    const submitHandler = (e) => {
        e.preventDefault()
        // Dispatch here
        dispatch(userUpdateAction({ _id: userId, name, email, isAdmin }))
    
    }
 

    return (
        <>
        <Link to={'/admin/userlist'} className='btn btn-light my-3'>
                Go Back
        </Link>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            <FormContainer>
                <h1>Edit User</h1>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name </Form.Label>
                            <Form.Control type="text" placeholder="Enter Fullname"
                                value={name} onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address </Form.Label>
                            <Form.Control type="email" placeholder="Enter Email Address"
                                value={email} onChange={(e) => setEmail(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='isAdmin'>
                            
                            <Form.Check type="checkbox"
                                label='isAdmin'
                                checked={isAdmin}
                                onChange={(e) => setisAdmin(e.target.checked)}>
                            </Form.Check>
                        </Form.Group>

            

                        <Button type='submit' variant='primary'>
                            Update
                </Button>
                    </Form>
                )}
          

            </FormContainer>
        </>
      
    )

}

export default UserEditScreen
