// import { createContext, useContext, useState } from "react";

// const GlobalContext = createContext();

// const GlobalContextProvider = ({children}) => {
//     const [notesData, setNotesData] = useState([])

//     const notesFromDatabase = data => {
//         console.log("context", data)
//     }

//     let defaultValue = {
//         note: notesData
//     }
//     return(
//         <GlobalContext.Provider value={defaultValue} >
//             {children}
//         </GlobalContext.Provider>
//     )
// }