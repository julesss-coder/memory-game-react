import React from "react";
import TripList from "./components/TripList.jsx";

const Header = ({testProp, id}) => {
  return (
    <header>
      <h1>Header</h1>
    </header>
  )
}

const App = () => {
  return (
    <>
      <Header testProp="test" id={0}/>
      <TripList />
      <p>Hello, earthside humans!</p>
    </>
  )
};

export default App;