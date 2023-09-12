import React, {useContext, useReducer} from 'react';
import './App.css';
import AppContext from './Contexts/AppContext';
import Dashboard from "./Screens/Dashboard/Dashboard";
import AppReducer from "./Reducers/AppReducer";

function App() {
    const initialState = useContext(AppContext);
    const [state, dispatch] = useReducer(AppReducer, initialState, undefined);
    return (
        <AppContext.Provider value={{...state, dispatch}}>
            <div className="App">
                <Dashboard/>
            </div>
        </AppContext.Provider>
    );
}

export default App;
