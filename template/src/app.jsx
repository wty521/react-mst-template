import React from 'react';
import DevTools from 'mobx-react-devtools';
import { Link } from 'react-router-dom';
import Routes from './routes';

const App = () => {
  let devTools;
  if (process.env.NODE_ENV !== 'production') {
    devTools = <DevTools position={{ top: 0, left: 0 }} />;
  }
  return (
    <div>
      <ul style={{ width: 400, margin: '20px auto', display: 'flex', justifyContent: 'space-between' }}>
        <li><Link to="/">count</Link></li>
        <li><Link to="/auto">autoRun</Link></li>
        <li><Link to="/list">list</Link></li>
        <li><Link to="/school">school</Link></li>
        <li><Link to="/gather">gather</Link></li>
      </ul>
      <Routes />
      {devTools}
    </div>
  );
};

export default App;
