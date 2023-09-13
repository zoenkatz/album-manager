import React, {DetailedHTMLProps, InputHTMLAttributes, useContext, useState} from "react";
import {IPhoto} from "../../Assets/types";
import "./Card.scss";
import Button from "../Button/Button";
import axios from 'axios'
import binIcon from "../../Assets/Images/bin.svg"
import editIcon from "../../Assets/Images/edit.svg"
import AppContext from "../../Contexts/AppContext";

const Card = ({photo, onClick}: { photo?: IPhoto, onClick?: () => void }) => {
    const {dispatch} = useContext(AppContext)
    const {title, thumbnailUrl, id} = photo || {title: '', thumbnailUrl: ''}
    const [isEditMode, setIsEditMode] = useState(false);
    const [photoTitle, setPhotoTitle] = useState(title)
    const handleDelete = () => {
        axios.delete(`https://jsonplaceholder.typicode.com/photos/${id}`).then(() => {
                dispatch({type: 'DELETE_PHOTO', payload: {photoId: id}})
            }
        ).catch(e => console.log(e))
    }
    const handleEdit = () => {
        axios.put(`https://jsonplaceholder.typicode.com/photos/${id}`, {...photo, title: photoTitle}).then((res) => {
                dispatch({type: 'UPDATE_PHOTO', payload: {photoId: id, updatedPhoto: res.data}})
                setIsEditMode(false)
            }
        ).catch(e => console.log(e))
    }

    const handleKeyDown = (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleEdit()
        }
    }
    return <div className="album-photo-card">
        <div className="card-photo-buttons">
            <Button onClick={handleDelete} icon={binIcon}/>
        </div>
        <div className="card-photo-details">
            {isEditMode ? <div className="album-photo-title">
                <input value={photoTitle}
                       onChange={(e) => setPhotoTitle(e.target.value)} onKeyDown={handleKeyDown}/>
                <Button onClick={handleEdit} label="Submit"/>
            </div> : <div className="album-photo-title">
                <div>{title}</div>
                <Button onClick={() => setIsEditMode(true)} icon={editIcon}/>

            </div>}
            <div className="album-photo-thumbnail" onClick={onClick}>
                <img src={thumbnailUrl} alt="photo-thumbnail" height={150} width={150}/>
            </div>
        </div>
    </div>
}

export default Card