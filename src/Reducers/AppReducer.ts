import {IAction, IPhoto} from "../Assets/types"


export default function AppReducer(state: any, action: IAction) {
    const actionPayload = action.payload;
    switch (action.type) {
        case "SET_PHOTOS":
            return {
                ...state,
                photos: actionPayload.photos
            };
        case "DELETE_PHOTO":
            const currentIndex = state.photos.findIndex((photo: IPhoto) => photo.id === actionPayload.photoId)
            return {
                ...state,
                photos: [...state.photos.slice(0, currentIndex), ...state.photos.slice(currentIndex + 1)]
            };
        case "UPDATE_PHOTO":
            const updatedPhotoIndex = state.photos.findIndex((photo: IPhoto) => photo.id === actionPayload.photoId)
            return {
                ...state,
                photos: [...state.photos.slice(0, updatedPhotoIndex), actionPayload.updatedPhoto, ...state.photos.slice(updatedPhotoIndex + 1)]
            };
        case "ADD_PHOTO":
            return {
                ...state,
                photos: [...state.photos, actionPayload.newPhoto]
            };
        case "SET_CURRENT_ALBUM":
            return {
                ...state,
                currentAlbum: actionPayload.currentAlbum

            }


        default:
            return state;
    }
}