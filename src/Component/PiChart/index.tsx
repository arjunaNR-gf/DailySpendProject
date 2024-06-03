import React, { useEffect, useState } from "react";
import './index.css'
import { TEChart } from "tw-elements-react";
import { data } from "../../Services/api/DailySpendApi";

export default function ChartPie(pieData:any): JSX.Element {

  return (
    <TEChart
      class="piecust-custumwidth"
      type="pie"
      data={{
        labels:pieData.pieData.lables,
        datasets: [
          {
            label: "Traffic",
            data: pieData.pieData.value,
            backgroundColor: [
              "rgba(63, 81, 181, 0.5)",
              "rgba(77, 182, 172, 0.5)",
              "rgba(66, 133, 244, 0.5)",
              "rgba(156, 39, 176, 0.5)",
              "rgba(233, 30, 99, 0.5)",
              "rgba(66, 73, 244, 0.4)",
              "rgba(66, 133, 244, 0.2)",
            ],
          },
        ],
      }}
    />
  );
}