import React from "react";
import { useState } from "react";
import TripList from "./components/TripList.jsx";

const Header = ({testProp, id}) => {
  return (
    <header>
      <h1>Header</h1>
    </header>
  )
}

const App = () => {
  const [showTrips, setShowTrips] = useState(true);

  return (
    <>
      <Header testProp="test" id={0}/>
      <button onClick={() => setShowTrips(false)}>Hide trips</button>
      {
        showTrips && <TripList />
      }
      
      <p>Hello, earthside humans!</p>
    </>
  )
};

export default App;