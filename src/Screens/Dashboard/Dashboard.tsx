import React, {useContext, useEffect, useRef, useState} from "react";
import {IPhoto} from "../../Assets/types";
import Card from "../../Components/Card/Card";
import './Dashboard.scss';
import 'react-responsive-pagination/themes/classic.css';
import ResponsivePagination from 'react-responsive-pagination';
import AppContext from "../../Contexts/AppContext";
import axios from "axios";
import NewCard from "../../Components/NewCard/NewCard";
import Button from "../../Components/Button/Button";
import 'react-responsive-modal/styles.css';
import Modal from "react-responsive-modal";

const Dashboard = () => {
    const {photos, currentAlbum, dispatch} = useContext(AppContext)
    const [isAddNewPhoto, seIsAddNewPhoto] = useState(false)
    const didMount = useRef(false);
    const [open, setOpen] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState<string>('')


    useEffect(() => {
        if (didMount.current) {
            axios(`https://jsonplaceholder.typicode.com/photos?albumId=${currentAlbum}`).then((res) => {
                dispatch({type: 'SET_PHOTOS', payload: {photos: res.data}})
            }).catch(e => console.log(e))
        }

        return () => {
            didMount.current = true;
        };
    }, [currentAlbum])

    const onOpenModal = (photoUrl: string) => {
        setOpen(true);
        setCurrentPhoto(photoUrl)
    }
    const onCloseModal = () => setOpen(false);


    return <div className="album-dashboard">
        {isAddNewPhoto ? <div className="add-new-photo">
            <NewCard handleAddingNewCard={() => seIsAddNewPhoto(false)}/>
        </div> : <Button className="add-new-photo-button" label="+" onClick={() => seIsAddNewPhoto(true)}
                         style={{width: 50, height: 50, border: '1px solid'}}/>}
        <div className="album-dashboard-photos">
            {photos?.map((photo: IPhoto) => {
                return <Card key={photo.id} photo={photo} onClick={() => onOpenModal(photo.url)}/>
            })}

        </div>

        <div className="album-dashboard-numbers">
            <ResponsivePagination
                current={currentAlbum}
                total={100}
                onPageChange={(value) => dispatch({type: 'SET_CURRENT_ALBUM', payload: {currentAlbum: value}})}
            />
        </div>
        <Modal open={open} onClose={onCloseModal} center>
            <img src={currentPhoto} alt="photo-modal"/>
        </Modal>

    </div>
}

export default Dashboard;