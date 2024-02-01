import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import useFetch from "../hooks/useFetch";
import './TripList.scss';

const TripList = () => {
  const [url, setUrl] = useState('http://localhost:3000/trips');
  const { data: trips, pending, error } = useFetch(url);

  console.log("TripList renders");

  return (
    <>
      <div className="trip-list">
        <h1>TripList</h1>
        {
          error && <div>{error}</div>
        }
        {
          pending && <div>Loading trips...</div>
        }
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
    </>
  )
};

export default TripList;