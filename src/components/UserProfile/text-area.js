import React, { useState } from "react";
import { DefaultProfile } from "../../images/DefaultProfile";

const TextArea=(props) => {
    const [baseImage, setBaseImage] = useState(DefaultProfile);

    const validateImage = (file) => {
        // console.log(file.name.endsWith(".jpg"));
        if(file.size > 1024*1024) {
            return("File size exeeded!\nPlease provide a file of size under 1mb.");
        }
        if (!(file.name.endsWith(".jpg") || file.name.endsWith(".jpeg") || file.name.endsWith(".png") || file.name.endsWith(".gif"))) {
            return("Invalid File type!\nOnly .jpg, .jpeg, .png & .gif file types are allowed.");
        }
        return("Pass");
    }

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const str = validateImage(file);
        if(str === "Pass") {
            try {
                const base64 = await convertBase64(file);
                setBaseImage(base64);
                props.changeAnswer(props.question[1], baseImage);
            }
            catch (error) {
                console.log(error);
                setBaseImage(DefaultProfile);
                props.changeAnswer(props.question[1], baseImage);
            }
        }
        else {
            alert(str);
        }
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onprogress = (event) => {
                let progress = ((event.loaded / event.total) * 100);
                console.log(progress);
            }

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
    else if(props.question[1] === "fb") {
    return (
        <div className="form-group">
            <h1 className="form-name">
                {props.question[0]}
                {/* <div class="tooltip">

                    <span class="tooltiptext">Tooltip text</span>
                </div> */}
            </h1>
            Go to <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">facebook</a>
            <input type="text"
                className="form-control"
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