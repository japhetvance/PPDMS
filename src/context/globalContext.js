import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = "http://localhost:5001/api/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [weekTotal, setweekTotal] = useState([])
    const [weekSold, setweekSold] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes

    const weekEggs = () => {
        let weekEggs = 0;
        weekTotal.forEach((eggs) =>{
            weekEggs = weekEggs + weekTotal.eggs
        })

        return weekEggs;
    }


    return (
        <GlobalContext.Provider value={{
            weekEggs,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}