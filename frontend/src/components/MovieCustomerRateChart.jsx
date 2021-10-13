import React from "react";
import styled from "styled-components";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
} from "recharts";

export default function MovieCustomerRateChart({ data }) {
  return (
    <ChartComponent>
      <ComposedChart
        width={800}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 50,
          bottom: 20,
          left: 50,
        }}
        style={{ backgroundColor: "white" }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis
          dataKey="name"
          label={{ value: "year", position: "insideBottomRight", offset: 0 }}
          scale="band"
        />
        <YAxis
          label={{ value: "movie", angle: -90, position: "insideLeft" }}
          yAxisId={0}
        />
        <YAxis
          label={{ value: "money", angle: -90, position: "insideLeft" }}
          orientation="right"
          yAxisId={1}
        />
        <YAxis
          label={{ value: "people", angle: -90, position: "insideLeft" }}
          orientation="right"
          yAxisId={2}
        />
        <Tooltip position={{ y: 200 }} />
        <CartesianGrid stroke="#f5f5f5" />
        <Legend />
        <Area
          type="monotone"
          dataKey="money"
          fill="#8884d8"
          stroke="#8884d8"
          yAxisId={0}
        />
        <Bar dataKey="people" barSize={40} fill="#413ea0" yAxisId={1} />
        <Line type="monotone" dataKey="movie" stroke="#ff7300" yAxisId={2} />
      </ComposedChart>
    </ChartComponent>
  );
}

const ChartComponent = styled.div`
  font-family: sans-serif;
  text-align: center;
`;
