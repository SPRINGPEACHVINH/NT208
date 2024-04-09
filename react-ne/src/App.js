import "./App.css";

import React from "react";
import ReactDOM from "react-dom/client";

function test() {
  return 6 + 9;
}
function App() {
  // const myElement = <h1>I Love JSX!</h1>;
  // const myElement = React.createElement('h1', {}, 'I do not use JSX!');

  // const myElement = (
  //   <ul>
  //     <li>Vinh</li>
  //     <li>Tùng</li>
  //     <li>Tiến</li>
  //     <li>Tuấn</li>
  //   </ul>
  // );

  // const x = 5;
  // let text = "Goodbye";
  // if (x < 10) {
  //   text = "Hello";
  // }
  // const myElement = <h1>{text}</h1>;

  // const x = 5;
  // const myElement = <h1>{x < 10 ? "Hello" : "Goodbye"}</h1>;

  // const myElement = (
  //   <div>
  //     <p>Bùi Lê Nguyên Hải where?</p>

  //     <p>Trôn VN.</p>
  //   </div>
  // );

  // const myElement = <input type="text" />;

  const myElement = <h1 className="myclass">Hello From Group 2</h1>;

  // const myElement = <h1>React is {test()} times better with JSX</h1>;

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(myElement);
}
export default App;
