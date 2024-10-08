import React from 'react';
import Sidebar from './components/Sidebar';
import Main from './components/Main';

const App = () => {
  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <Main />
    </div>
  )
}

export default App