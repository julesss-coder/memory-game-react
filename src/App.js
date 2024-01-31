import React from "react";

const Header = ({testProp, id}) => {
  console.log(testProp, id)
  return (
    <header>
      <h1>Header</h1>
    </header>
  )
}

const App = () => {

  const element = <h1 className="headline">headline</h1>;
  console.log(element);
  console.log("Header: ", <Header testProp="test" id={0}/>);

  return (
    <>
      <Header testProp="test" id={0}/>
      <p>Hello, earthside humans!</p>
    </>
  )
};

export default App;