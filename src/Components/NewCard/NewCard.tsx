import React, {useContext, useState} from "react";
import "./NewCard.scss";
import Button from "../Button/Button";
import axios from 'axios'
import AppContext from "../../Contexts/AppContext";
import {IPhoto} from "../../Assets/types";

const NewCard = ({handleAddingNewCard}: { handleAddingNewCard?: () => void }) => {
    const {currentAlbum, dispatch} = useContext(AppContext)
    const [newPhoto, setNewPhoto] = useState<IPhoto>({
        albumId: currentAlbum,
        id: undefined,
        thumbnailUrl: "",
        title: "",
        url: ""
    })
    const handleSubmit = () => {
        axios.post(`https://jsonplaceholder.typicode.com/photos`, newPhoto).then((res) => {
                dispatch({type: 'ADD_PHOTO', payload: {newPhoto: res.data}})
                if (typeof handleAddingNewCard === 'function') {
                    handleAddingNewCard()
                }
            }
        ).catch(e => console.log(e))
    }
    return <div className="album-photo-card">
        <h2>Add new photo</h2>
        <div className="card-photo-details">
            <div className="album-photo-title">
                <input value={newPhoto.title} placeholder="Photo title..."
                       onChange={(e) => setNewPhoto({...newPhoto, title: e.target.value})}/>
            </div>
            <div className="album-photo-thumbnail">
                <input type="file" onChange={(e) => setNewPhoto({
                    ...newPhoto,
                    thumbnailUrl: 'https://via.placeholder.com/150/9e59da' //fake
                })}/>
            </div>
            <Button onClick={handleSubmit} label="Add Photo"/>
        </div>
    </div>
}

export default NewCard