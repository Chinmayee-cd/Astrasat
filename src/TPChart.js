import { useEffect, useRef, useState } from "react";
import { FullScreenTP, SummaryTP } from "./FullScreenTP.js";
import * as d3 from "d3";
import data from "./cansat.csv";
import "./App.css";

const TPChart = (props) => {
  const [fullScreenModalState, setFullScreenModalState] = useState(false);
  const refreshMe = props.refreshMe;

  const chartRef = useRef(null);

  if (fullScreenModalState) {
    document.getElementById("myModal").style("display", "block");
    document.getElementById("modalBackground").style("display", "block");
  }

  useEffect(() => {
    d3.csv(data, (d) => ({
      time: parseInt(d.time_stamping),
      temp: parseFloat(d.temp),
      pressure: parseInt(d.pressure),
    })).then((dataset) => {
      if (!refreshMe) {
        return;
      }
      const slicedData = dataset.slice(-15);

      const width = 240;
      const height = 150;

      d3.select(chartRef.current).select("svg").remove();

      const svg = d3
        .select(chartRef.current)
        .append("svg")
        .attr("width", width + 10)
        .attr("height", height + 100)
        .attr("borderRadius", "2")
        .append("g")
        .attr("transform", `translate(41,30)`)
        .attr("marginRight", "10px");

      const xScale = d3
        .scaleLinear()
        .domain(d3.extent(slicedData, (d) => d.time))
        .range([0, width]);
      var temp_max = d3.max(slicedData, (d) => d.temp);
      var pressure_max = d3.max(slicedData, (d) => d.pressure);
      if (temp_max > pressure_max) {
        var max_parameter = "temp";
      } else {
        var max_parameter = "pressure";
      }

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(dataset, (d) => d[max_parameter])])
        .range([height, 0]);

      const line = d3
        .line()
        .x((d) => xScale(d.time))
        .y((d) => yScale(d.temp));
      const line2 = d3
        .line()
        .x((d) => xScale(d.time))
        .y((d) => yScale(d.pressure));

      svg
        .append("path")
        .datum(slicedData)
        .attr("class", "line")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "steelblue")
        .style("stroke-width", "2");
      svg
        .append("path")
        .datum(slicedData)
        .attr("class", "line")
        .attr("d", line2)
        .style("fill", "none")
        .style("stroke", "red")
        .style("stroke-width", "2");
      svg
        .append("circle")
        .attr("cx", 60)
        .attr("cy", -13)
        .attr("r", 4)
        .style("fill", "red");
      svg
        .append("circle")
        .attr("cx", 122)
        .attr("cy", -13)
        .attr("r", 4)
        .style("fill", "steelblue");
      svg
        .append("text")
        .attr("x", 65)
        .attr("y", -8)
        .text("Pressure")
        .style("font-size", "13px")
        .attr("alignment-baseline", "middle");
      svg
        .append("text")
        .attr("x", 125)
        .attr("y", -8)
        .text("Temperature")
        .style("font-size", "13px")
        .attr("alignment-baseline", "middle");

      svg
        .append("text")
        .attr("x", 95)
        .attr("y", 180)
        .style("text-anchor", "middle")
        .style("fill", "black")
        .text("Time");

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

      svg.append("g").call(d3.axisLeft(yScale));
    });
  }, [refreshMe]);
  return (
    <>
      <button id="myBtn" className="modal-button" onClick={launchSummaryMode}>
        <i
          class="fa fa-arrows-alt"
          style={{
            marginTop: "-205px",
            position: "absolute",
            color: "white",
            marginLeft: "220px",
          }}
        ></i>
      </button>
      <button
        id="myBtn"
        className="modal-button"
        onClick={launchFullScreenMode}
      >
        <i
          class="fa fa-play"
          style={{ marginTop: "-205px", position: "absolute", color: "white" }}
        ></i>
      </button>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div ref={chartRef}></div>
      <FullScreenTP toggle={fullScreenModalState} slice={false} />
      <SummaryTP toggle={fullScreenModalState} slice={false} />
    </>
  );

  function launchFullScreenMode() {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
    modal.style.zIndex = 9999;
    const modalback = document.getElementById("modalBackground");
    modalback.style.display = "block";
    modal.style.zIndex = 1;
  }
  function launchSummaryMode() {
    const modal = document.getElementById("myModalFull");
    modal.style.display = "block";
    modal.style.zIndex = 9999;
    const modalback = document.getElementById("modalBackgroundFull");
    modalback.style.display = "block";
    modal.style.zIndex = 1;
  }
};

export { TPChart };
