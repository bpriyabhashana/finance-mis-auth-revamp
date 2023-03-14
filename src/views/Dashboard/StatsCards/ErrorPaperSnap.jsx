import React, { Component } from "react";
import { StatsCard } from "../../../components/StatsCard/StatsCard.jsx";
import config from "../../../variables/Constants";
import axios from "axios";
class PaperSnapError extends Component {
  state = { usage: 0, loading: true, time: null, error: false };

  dataFetch = () => {
    let axiosConfig = {
      headers: {
        Accept: "application/json",
      },
    };
    this.setState({
      loading: true,
      time: Date(Date.now()),
    });

    axios
      .get(
        config.HOST_CONFIG.BACK_END_API_MAPPER_URL +
          config.BASE_PATH.ANALYSE_SERVICE_BASE_PATH +
          "getSnapErrorCount",
        axiosConfig
      )
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            loading: false,
            error: false,
            time: Date(Date.now()),
            usage: res.data[0].Count,
          });
        } else {
          this.setState({
            loading: false,
            error: true,
            time: Date(Date.now()),
          });
        }
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error: true,
          time: Date(Date.now()),
        });
      });
  };

  componentDidMount() {
    this.dataFetch();
  }

  render() {
    return (
      <StatsCard
        loading={this.state.loading}
        error={this.state.error}
        bigIcon={<i className="pe-7s-graph1 text-danger" />}
        statsText="Paper Snap Error "
        statsValue={this.state.usage + " Errors"}
        statsIcon={<i className="fa fa-refresh" />}
        statsIconText="date"
      />
    );
  }
}

export default PaperSnapError;
