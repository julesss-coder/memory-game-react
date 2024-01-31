import React, { useEffect } from "react";
import { useState, useCallback } from "react"; 
import useFetch from "../hooks/useFetch";
import './TripList.scss';

const TripList = () => {
  // const [trips, setTrips] = useState([]);
  const [url, setUrl] = useState('http://localhost:3000/trips');
  const { data: trips } = useFetch(url);


  // const fetchTrips = useCallback(async () => {
  //   const response = await fetch(url);
  //   const currentTrips = await response.json();
  //   setTrips(currentTrips);
  // }, [url]);

  // useEffect(() => {
  //   console.log("useEffect fetching data");
  //   fetchTrips();
  // }, [fetchTrips]);

  // console.log("trips: ", trips);
  console.log("TripList renders");

  return (
    <div className="trip-list">
      <h1>TripList</h1>
      <ul>
        {
          trips && trips.map(trip => (
            <li key={trip.id}>
              <h3>{trip.title}</h3>
              <p>{trip.price}</p>
            </li>
          ))
        }
      </ul>
      <div className="filters">
        <button onClick={() => setUrl('http://localhost:3000/trips?location=europe')}>European Trips</button>
        <button onClick={() => setUrl('http://localhost:3000/trips')}>All Trips</button>
      </div>
    </div>
  )
};

export default TripList;