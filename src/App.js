import React from 'react';
import GameBoard from './components/GameBoard';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
      <div className="container text-center my-5">
        <div class="row justify-content-center">
        <div className='col-8'>
          <header className="text-center mb-4">
              <h1 className="display-4">Number Sums</h1>
              <p className="lead">Challenge your math skills with this exciting puzzle game!</p>
          </header>
          
          <GameBoard />
          </div>
          </div>
      </div>
  );
};

export default App;