import i18next from "i18next";

import { DailyStats } from "../redux/slices/profile/types";

import { humaniseDate } from "./string";

export const getChartData = (data: DailyStats[]) => {
  const labels = data.map((item) => item.date);
  const values = data.map((item) => item.counter);

  const chartData = {
    labels: labels.map((label) => humaniseDate(label)),
    datasets: [
      {
        label: i18next.t("statsLabel"),
        data: values,
        backgroundColor: "#f97316",
        borderColor: "#f97316",
        borderWidth: 1,
      },
    ],
  };

  return chartData;
};

export const chartOptions = {
  responsive: true,
  scales: {
    x: {
      grid: {
        color: "#545454", // Цвет горизонтальной сетки
      },
    },
    y: {
      grid: {
        color: "#545454", // Цвет вертикальной сетки
      },
    },
  },
};
