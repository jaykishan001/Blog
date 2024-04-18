import React from 'react'
import service from '../../appwrite/config'
import RTE from '../RTE'
import Input from '../Input'
import Button from '../Header/Button'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Select from '../Select'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import authService from '../../appwrite/auth'
import { useEffect } from 'react'


function PostForm({post}) {

    const {register, watch, control, getValues, handleSubmit, setValue} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active' 
        }
    })

    const navigate = useNavigate();
    const userData = useSelector((state)=> state.auth.userData);

    const submit = async(data) => {
        if(post) {
            // is image is present then upload it other null 
           const file = data.image[0] ? service.uploadFile(data.image[0]) : null;
           // if we have file and we want to delete it 
           if(file) {
            service.deleteFile(post.featuredImage)
           }
           //post update
           const dbPost = await service.updatePost(post.$id, {...data, featuredImage: file ? file.$id : undefined})
            
           if(dbPost){
            navigate(`/post/${dbPost.$id}`)
           }
        }

        else {
            // user want to create new form new post
            // first upload the file

           const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
           if(file) {
            const fileId = file.$id
            data.featuredImage = fileId

           const dbPost = await service.createPost({...data, userId: userData.$id,})
           if(dbPost) {
            navigate(`/post/${dbPost.$id }`)
           }
           }


        }
    }

    const slugTransform = useCallback((value)=> {
        if(value && typeof value === 'string') {
            return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
        }
    },[])
  // how we can use this method usecallback one 
   
  useEffect(()=>{

    const subscription = watch((value, {name})=> {
        if(name == "title") {
            setValue('slug', slugTransform(value.title, 
            {shouldValidate: true}
            ))
        }
    })

    return () => {
        subscription.unsubscribe()
    }

  }, 
  [watch, setValue, slugTransform])

  return (
    <form onSubmit={handleSubmit(Submit)} className="flex flex-wrap">

      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img src={previewUrl} alt={post.title} className="rounded-lg" />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>

    </form>
  )
}

export default PostForm