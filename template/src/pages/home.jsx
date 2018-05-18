import React from 'react';
import DevTools from 'mobx-react-devtools';
import Count from '../components/count';
import Info from '../components/info';

const Home = () => {
  return (
    <div>
      <img src={require('../logo.svg')} alt="logo" />
      <Count />
      <div style={{ border: '1px solid #ccc', margin: '20px 0' }} />
      <Info />
    </div>
  );
};

export default Home;
