import React from 'react';
import Menu from './Menu';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col">
            {/* <p>
                <small>
                  &copy; {new Date().getFullYear()}. All rights reserved.
                </small>
              </p> */}
            <Menu isFooter />
          </div>
        </div>
      </div>
    </footer>
  );
}
