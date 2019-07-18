import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Tinymce from './Tinymce';
// import Slate from './Slate';

class App extends React.Component {
  
// <Link to='/tinymce'>Tinymce Editor</Link><br/>
  render() {
    return (
      <BrowserRouter>
     
      <Link to='/tinymce'>Tinymce Editor</Link><br/>
        <switch>
          <Route exact path='/tinymce' component={Tinymce} />
        </switch>
      </BrowserRouter>
    );
  }
}

export default App;