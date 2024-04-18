import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import { Container, PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom';


function EditPost() {
    const [post, setPosts] = useState(null);
    const slug = useParams()
    const navigatev = useNavigate();

    useEffect(()=> {
        if(slug) {
            service.getpost(slug).then((postt)=> {
                if(postt) {
                    setPosts(postt)
                }
               
            })

        }
        else {
            navigate('/');
        }
    }, [slug, navigate]) 


  return post ? <div>
    <Container>
        <PostForm post = {post} />
    </Container>
  </div>
  : null
}

export default EditPost