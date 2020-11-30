import React, { useState } from "react";
import { DefaultProfile } from "../../images/DefaultProfile";

const TextArea=(props) => {
    const [baseImage, setBaseImage] = useState(DefaultProfile);

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        // console.log(file);
        const base64 = await convertBase64(file);
        // console.log(base64);
        setBaseImage(base64);
        props.changeAnswer(props.question[1], baseImage);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleEditImage = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
    }

    if(props.question[1] === "img") {
    return (
        <div className="form-group">
            <h1 className="form-name">{props.question[0]}</h1>
            <input
                type="file"
                id="imageInput" 
                hidden="hidden"
                onChange={(e) => {
                    uploadImage(e);
                }}
            />
            <div className="form-file-input">
                <button className="form-file-btn" onClick={handleEditImage} >Upload Image</button>
                <img src={baseImage} alt="No file chosen"/>
            </div>
        </div>
    )
    }
    else if (props.question[1] === "bio"){
    return (
        <div className="form-group">
            <h1 className="form-name">{props.question[0]}</h1>
            <textarea type="text"
                className="form-control form-text-area"
                placeholder="For example, how would your best friend describe you?"
                onChange={e => props.changeAnswer(props.question[1], e.target.value)}
            />
        </div>
    )
    }

    else {
    return (
        <div className="form-group">
            <h1 className="form-name">{props.question[0]}</h1>
            <input type="text" 
                className="form-control"
                onChange={e=>props.changeAnswer(props.question[1],e.target.value)}
            />
        </div>
    )
    }
}
export default TextArea