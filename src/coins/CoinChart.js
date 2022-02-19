import React from "react";
import moment from "moment";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function CoinChart({ coinData, maintainAspectRatio = true }) {
  const options = {
    responsive: true,
    maintainAspectRatio: maintainAspectRatio,

    scales: {
      x: {
        ticks: {
          maxTicksLimit: 12,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: false,
        text: "",
      },
    },
  };

  const labels = coinData.map((point) =>
    moment(point[0]).local().format("MM/DD/YY h:mm A")
  );

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: coinData.map((point) => point[1]),
        borderColor: "rgb(66, 165, 245)",
        backgroundColor: "rgba(66, 165, 245), 0.9)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
