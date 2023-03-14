import React, { Component } from "react";
import { Grid } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Grid fluid>
          <nav className="pull-left">
            <ul>
              <li>
                <a href="#pablo">legal</a>
              </li>
              <li>
                <a href="#pablo">Privacy</a>
              </li>
            </ul>
          </nav>
          <p className="copyright pull-right">
            &copy; {new Date().getFullYear()}{" "}
            <a href="http://www.wso2.com">WSO2</a>, Certification Portal
          </p>
        </Grid>
      </footer>
    );
  }
}

export default Footer;
