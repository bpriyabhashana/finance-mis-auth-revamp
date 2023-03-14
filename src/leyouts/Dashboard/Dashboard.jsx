import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NotificationSystem from "react-notification-system";

// import Header from "components/Header/Header";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";

import { style } from "../../variables/Variables.jsx";

import dashboardRoutes from "../../routes/dashboard.jsx";

// import { Alert } from "reactstrap";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNotificationClick = this.handleNotificationClick.bind(this);
    this.MessageShow = this.MessageShow.bind(this);
    this.state = {
      _notificationSystem: null,
    };
  }
  handleNotificationClick(position, color, Message, icon) {
    var level = color;

    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className={icon} />,
      message: <div>{Message}</div>,
      level: level,
      position: position,
      autoDismiss: 5,
    });
  }
  componentDidMount() {
    this.MessageShow("User");
  }
  MessageShow(message) {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    var _notificationSystem = this.refs.notificationSystem;

    var level = "info";

    _notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-user-female" />,
      message: (
        <div>
          {message} Welcome to <b>WSO2 Certification Portal Dashboard</b>.
        </div>
      ),
      level: level,
      position: "tr",
      autoDismiss: 5,
    });
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  render() {
    return (
      <div className="wrapper">
        <NotificationSystem ref="notificationSystem" style={style} />
        <Sidebar {...this.props} />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header {...this.props} />
          <Switch>
            {dashboardRoutes.map((prop, key) => {
              if (prop.name === "Notifications")
                return (
                  <Route
                    path={prop.path}
                    key={key}
                    render={(routeProps) => (
                      <prop.component
                        {...routeProps}
                        handleClick={this.handleNotificationClick}
                      />
                    )}
                  />
                );
              if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key} />;
              return (
                <Route
                  path={prop.path}
                  render={(routeProps) => (
                    <prop.component
                      {...routeProps}
                      handleClick={this.handleNotificationClick}
                    />
                  )}
                  key={key}
                />
              );
            })}
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Dashboard;
