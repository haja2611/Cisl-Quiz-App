import { useState } from "react";
import { Bar, Pie, Doughnut, Chart as ChartJS } from "react-chartjs-2";
import { Chart as ChartJSCore, registerables } from "chart.js";

ChartJSCore.register(...registerables);

const chartTypes = {
  Bar: Bar,
  Pie: Pie,
  Doughnut: Doughnut,
};

function QuestionCharts({ report }) {
  const [chartType, setChartType] = useState("Bar");

  return (
    <div>
      <div style={{ marginBottom: "15px" }}>
        <label>Select Chart Type: </label>
        <select
          onChange={(e) => setChartType(e.target.value)}
          value={chartType}
        >
          {Object.keys(chartTypes).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {report.map((q, index) => {
        const labels = q.options;
        const data = labels.map((opt) => q.responses[opt] || 0);
        const backgroundColors = labels.map((opt) =>
          opt === q.correctAnswer ? "green" : "gray"
        );

        const ChartComponent = chartTypes[chartType];

        return (
          <div
            key={index}
            style={{
              // marginBottom: "200px",
              maxWidth: "100%",
              maxHeight: "400px",
              margin: "6% auto",
            }}
          >
            <h4>{q.question}</h4>
            <ChartComponent
              data={{
                labels,
                datasets: [
                  {
                    label: "Responses",
                    data,
                    backgroundColor: backgroundColors,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend:
                    chartType === "Bar"
                      ? { display: false }
                      : { position: "bottom" },
                },
              }}
              // style={{ height: "300px", width: "100%" }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default QuestionCharts;
