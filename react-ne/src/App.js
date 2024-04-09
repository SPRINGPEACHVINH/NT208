import './App.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

function test() {
  return 6+9
}
function App() {
    const myElement = <h1>React is {test()} times better with JSX</h1>;

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(myElement);
}

export default App;

