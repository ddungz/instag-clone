import React, { useState, ChangeEvent, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'

const CreatePost = () => {
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState()
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const file = target.type === 'file' ? (target.files ? target.files[0] : "") : ""
        setImage(file)
    }
    const [imageUrl, setImageUrl] = useState("")

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append("file", image)
        formData.append("upload_preset", "instaclone")
        formData.append("cloud_name", "dixtx2zqt")

        const response = await fetch("", {
            method: "post",
            body: formData
        });
        return response.json();
    }

    const assignImageUrl = (url: string) => {
        useEffect(() => {
            const newImageUrl = async (url: string) => {
                await setImageUrl(url)
            }
            newImageUrl(url)
        })
    }

    const newPost = async () => {
        // uploading image
        console.log('start uploading')
        const imageRes = await uploadImage()
        console.log('end uploading', imageRes)
        const imageUrl = imageRes.url ? imageRes.url : ""
        assignImageUrl(imageUrl)
        console.log('url = ' + imageUrl)

        // posting data
        console.log('start posting')
        fetch("http://localhost:5000/posts/store", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title, body, imageUrl
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(!data.success) M.toast({html: data.message, classes: "#c62828 red darken-3"})
            else {
                M.toast({html: 'Created post successfully', classes: "#43a047 green darken-1"})
                history.push('/')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="card input-field"
            style={{
                margin: "30px auto",
                maxWidth: "500px",
                padding: "20px",
                textAlign: "center"
            }}
        >
            <input type="text" placeholder="title" onChange={(e) => setTitle(e.target.value)}/>
            <input type="text" placeholder="body" onChange={(e) => setBody(e.target.value)}/>
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e) => handleFileChange(e)} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=>newPost()}
            >
                Submit Post
            </button>
        </div>
    )
}

export default CreatePost