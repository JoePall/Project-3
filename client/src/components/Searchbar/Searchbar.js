import React, { useState, useEffect } from "react";
import Search from "./Search"
import ConvertAirline from "./ConvertAirline";
import CalculateDuration from "./CalculateDuration";
// const axios = require("axios");
import "./style.css"


const SearchBar = () => {

    const [fromairport, setfromairport] = useState('');
    const [toairport, settoairport] = useState('');
    const [returnto, setreturnto] = useState('');
    const [dateto, setdateto] = useState('');
    const [searchresults, setsearchresults] = useState(null)

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            if (fromairport && toairport && dateto && returnto) {
                console.log(fromairport)
                console.log(toairport)
                console.log(returnto)
                console.log(dateto)
                Search(returnto, dateto, fromairport, toairport, setsearchresults);
            }
        }, 750);
        return () => {
            clearTimeout(timeoutID);
        };
    }, [fromairport, toairport, dateto, returnto]);

        // if ({searchresults} !== 'null') console.log({searchresults})

        return (
            <div className="ui segment searchbar">
                <form className="ui form">
                    <div className="field">
                        <label>From Airport </label>
                        <input 
                            value={fromairport} 
                            onChange={(e) => setfromairport(e.target.value)} 
                            className="input"
                        />
                        <br />
                        <br />
                        <label>To Airport </label>
                        <input 
                            value={toairport} 
                            onChange={(e) => settoairport(e.target.value)} 
                            className="input"
                        />
                        <br />
                        <br />
                        <label>Departure Date </label>
                        <input 
                            value={dateto} 
                            onChange={(e) => setdateto(e.target.value)} 
                            className="input"
                        />
                        <br />
                        <br />
                        <label>Return Date </label>
                        <input 
                            value={returnto} 
                            onChange={(e) => setreturnto(e.target.value)} 
                            className="input"
                        />

                    </div>
                </form>
                <ul>
                    {
                        searchresults &&
                        searchresults.map( result => {
                            // console.log("result.airline[0] = ", result.airlines[0]);
                            let airlinename = ConvertAirline(result.airlines[0]);
                            // console.log("airlinename = ", airlinename);
                            let ddh = CalculateDuration(result.duration.departure);
                            let rdh = CalculateDuration(result.duration.return);
                            let flightnumbers = "";
                            for (let i = 0; i < result.route.length; i++) {
                                // console.log("flightnumbers = ", flightnumbers);
                                flightnumbers = flightnumbers + result.route[i].operating_flight_no + "/" ;
                                // console.log("flightnumbers = ", flightnumbers);
                            }
                            
                            if (ddh === -1 || rdh === -1) {
                                // console.log("in if statement");
                                // console.log("ddh = ", ddh);
                                // console.log("rdh = ", rdh);
                                // console.log("toooo long");
                                return
                            } else {
                                return <li key={result.id}>
                                {flightnumbers} - 
                                {airlinename} -  
                                {result.flyFrom} -  
                                {result.flyTo} -  
                                ${result.price} -  
                                {ddh} -  
                                {rdh}
                                </li>
                            }
                        })
                    }
                </ul>
            </div>  
        );
    };

export default SearchBar;