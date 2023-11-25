import React from 'react';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Header />
      < Container>
      <main className='py-3'>
          <h1>Welcome to Eco</h1>
      </main>
      </Container>
      <Footer />  
    </>
  );
};

export default App;
