import React, { Component } from 'react';
import Link from './Link';

class Header extends Component {
    render() {
        return (
            <div>
                <header className="App-header">
                {
                 //   <img src={logo} className="App-logo" alt="logo" />
                }    
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
        </p>
                    <Link />
                </header>
            </div>
        );
    }
}


export default Header;