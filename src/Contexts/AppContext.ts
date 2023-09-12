import {createContext} from "react";
import {IPhoto} from "../Assets/types";

interface IState {
    photos: IPhoto[];
    currentAlbum: number;
    dispatch: any;
}

const appState: IState = {
    photos: [],
    currentAlbum: 1,
    dispatch: () => {
    },
};

const AppContext = createContext<IState>({
    ...appState,
});

export default AppContext;