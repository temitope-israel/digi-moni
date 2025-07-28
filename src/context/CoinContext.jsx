import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

//  create context provider function

const CoinContextProvider = (props) => {
    // Add some state variable where we store api data
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    })

    // create function to fetch data from api
    const fetchAllCoin = async ()=> {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-6LppiW7kNUKPXgZp3pXH2jgN'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json()) // converting response to JSON
            .then(response => setAllCoin(response)) // printing to console
            .catch(err => console.error(err));
    }

useEffect(()=>{
    fetchAllCoin(); // calling fetchAllCoin function when component mounts
 }, [currency]) // [] ensures this effect runs only once when component mounts

    const contextValue = {
        allCoin, currency, setCurrency
    }

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;