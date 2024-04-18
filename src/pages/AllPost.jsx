import React, { useState } from 'react'
import service from '../appwrite/config'
import { useEffect } from 'react'
import { Container ,PostCard,  } from '../components'


function AllPost() {
    const [post, setPosts] = useState([])

    useEffect(()=> {
        service.getPosts([]).then((posts)=> {
            if(posts) {
                setPosts(posts.documents);
            }
        })
    }, [])

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'> 
            {post.map((element)=> (
                <div key={element.$id} className='p-2 '>
                    <PostCard post = {element} />
                </div>
            ))}
        </div>

      </Container>
    </div>
  )
}

export default AllPost