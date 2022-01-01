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

export const options = {
  responsive: true,
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
    },
    title: {
      display: true,
      text: "",
    },
  },
};

export function CoinChart({ coinData }) {
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
        backgroundColor: "rgba(66, 165, 245), 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
