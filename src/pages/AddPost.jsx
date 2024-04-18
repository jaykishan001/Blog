import React from 'react'
import { useSelector } from 'react-redux'
import { Container } from '../components'
import { PostForm } from '../components'


function AddPost() {
  return (
    <div className='py-8'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost