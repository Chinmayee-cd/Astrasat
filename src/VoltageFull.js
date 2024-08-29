import React, { Component } from "react";
import * as d3 from "d3";
import data from "./cansat.csv";

class SummaryVoltage extends Component {
  modalRef = null;
  btnRef = null;
  modalState = "";
  action = "";

  constructor(props) {
    super(props);
    this.state = {};
    this.modalState = props.toggle;
    this.modalRef = React.createRef();
    this.action = props.action;
  }

  componentDidMount() {
    document.getElementById("modalBackground").style.display = "none";

    const modal = this.modalRef.current;
    document.getElementById("myModal").style.display = "none";

    d3.csv(data, (d) => ({
      voltage: parseInt(d.voltage),
      temp: parseFloat(d.temp),
    })).then((dataset) => {
      const width = 1100;
      const height = 380;

      d3.select(this.modalRef.current).select("svg").remove();

      const svg = d3
        .select(this.modalRef.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height + 100)
        .append("g")
        .attr("transform", `translate(70,30)`)
        .attr("marginRight", "10px");

      const xScale = d3
        .scaleLinear()
        .domain(d3.extent(dataset, (d) => d.time))
        .range([0, width]);
      var voltage = d3.max(dataset, (d) => d.voltage);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(dataset, (d) => d[voltage])])
        .range([height, 0]);

      const line = d3
        .line()
        .x((d) => xScale(d.time))
        .y((d) => yScale(d.voltage));

      svg
        .append("path")
        .datum(dataset)
        .attr("class", "line")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "steelblue")
        .style("stroke-width", "2");
      svg
        .append("text")
        .attr("x", 760)
        .attr("y", -6)
        .text("Voltage")
        .style("font-size", "20px")
        .attr("alignment-baseline", "middle");

      svg
        .append("text")
        .attr("x", 500)
        .attr("y", 410)
        .style("text-anchor", "middle")
        .style("fill", "black")
        .text("Time")
        .style("font-size", "20px");
      svg
        .append("text")
        .attr("x", 90)
        .attr("y", 40)
        .attr("transform", "rotate(90)")
        .style("text-anchor", "middle")
        .style("fill", "black")
        .text("Voltage");

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

      svg.append("g").call(d3.axisLeft(yScale));
    });
  }

  closeMe() {
    document.getElementById("myModal").style.display = "none";
    document.getElementById("modalBackground").style.display = "none";
  }

  render() {
    const hideComp = {
      display: "none",
    };
    const showComp = {
      display: "block",
    };

    const modal = {
      position: "fixed",
      top: "30px",
      left: "20px",
      width: "90%",
      height: "90%",
      "background-color": "#D3D3D3 ",
      display: "flex",
      zIndex: 9999,
      marginLeft: "50px",
    };
    const modalback = {
      position: "fixed",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      filter: "d3.blur(5px)",
      display: "flex",
      zIndex: 9997,
    };
    return (
      <>
        <div id="modalBackground" style={modalback}>
          <div id="myModal" style={modal}>
            <div class="modalContainer" style={{ padding: "-10px" }}>
              <div
                style={{
                  "text-align": "right",
                  "margin-top": 30,
                }}
              >
                <img
                  src="../pop-up-close-icon.png"
                  alt="Close"
                  style={{
                    width: "30px",
                    height: "30px",
                    marginLeft: "50px",
                    display: "flex",
                    marginTop: "0px",
                  }}
                  onClick={this.closeMe}
                ></img>
              </div>
              <div ref={this.modalRef}></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
class FullScreenVoltage extends Component {
  modalRef = null;
  btnRef = null;
  modalState = "";
  action = "";

  constructor(props) {
    super(props);
    this.state = {};
    this.modalState = props.toggle;
    this.modalRef = React.createRef();
    this.action = props.action;
  }

  componentDidMount() {
    document.getElementById("modalBackgroundFull").style.display = "none";

    const modal = this.modalRef.current;
    document.getElementById("myModalFull").style.display = "none";

    d3.csv(data, (d) => ({
      time: parseInt(d.time_stamping),
      voltage: parseInt(d.voltage),
    })).then((dataset) => {
      const slicedData = dataset.slice(-15);

      const width = 1100;
      const height = 380;

      d3.select(this.modalRef.current).select("svg").remove();

      const svg = d3
        .select(this.modalRef.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height + 100)
        .append("g")
        .attr("transform", `translate(70,30)`)
        .attr("marginRight", "10px");

      const xScale = d3
        .scaleLinear()
        .domain(d3.extent(slicedData, (d) => d.time))
        .range([0, width]);
      var voltage = d3.max(slicedData, (d) => d.voltage);
      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(slicedData, (d) => d[voltage])])
        .range([height, 0]);

      const line = d3
        .line()
        .x((d) => xScale(d.time))
        .y((d) => yScale(d.voltage));

      svg
        .append("path")
        .datum(slicedData)
        .attr("class", "line")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "steelblue")
        .style("stroke-width", "2");
      svg
        .append("circle")
        .attr("cx", 860)
        .attr("cy", -13)
        .attr("r", 8)
        .style("fill", "steelblue");
      svg
        .append("text")
        .attr("x", 760)
        .attr("y", -6)
        .text("Pressure")
        .style("font-size", "20px")
        .attr("alignment-baseline", "middle");
      svg
        .append("text")
        .attr("x", 870)
        .attr("y", -8)
        .text("Temperature")
        .style("font-size", "20px")
        .attr("alignment-baseline", "middle");

      svg
        .append("text")
        .attr("x", 500)
        .attr("y", 410)
        .style("text-anchor", "middle")
        .style("fill", "black")
        .text("Time")
        .style("font-size", "20px");

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

      svg.append("g").call(d3.axisLeft(yScale));
    });
  }

  closeMe() {
    document.getElementById("myModalFull").style.display = "none";
    document.getElementById("modalBackgroundFull").style.display = "none";
  }

  render() {
    const hideComp = {
      display: "none",
    };
    const showComp = {
      display: "block",
    };

    const modal = {
      position: "fixed",
      top: "30px",
      left: "20px",
      width: "90%",
      height: "90%",
      "background-color": "#D3D3D3 ",
      display: "flex",
      zIndex: 9999,
      marginLeft: "50px",
    };
    const modalback = {
      position: "fixed",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      filter: "d3.blur(5px)",
      display: "flex",
      zIndex: 9997,
    };
    return (
      <>
        <div id="modalBackgroundFull" style={modalback}>
          <div id="myModalFull" style={modal}>
            <div class="modalContainer" style={{ padding: "-10px" }}>
              <div
                style={{
                  "text-align": "right",
                  "margin-top": 30,
                }}
              >
                <img
                  src="../pop-up-close-icon.png"
                  alt="Close"
                  style={{
                    width: "30px",
                    height: "30px",
                    marginLeft: "50px",
                    display: "flex",
                    marginTop: "0px",
                  }}
                  onClick={this.closeMe}
                ></img>
              </div>
              <div ref={this.modalRef}></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export { FullScreenTP, SummaryTP };
