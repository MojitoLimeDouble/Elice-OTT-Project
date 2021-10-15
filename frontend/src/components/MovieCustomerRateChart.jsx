import React from "react";
import styled from "styled-components";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function MovieCustomerRateChart({ data }) {
  return (
    <ChartComponent>
      <ComposedChart
        width={800}
        height={600}
        data={data}
        margin={{
          top: 20,
          right: 50,
          bottom: 50,
          left: 50,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis
          dataKey="name"
          label={{ value: "year", position: "insideBottomRight", offset: 10 }}
          scale="band"
        />
        <Tooltip position={{ y: 200 }} />
        <CartesianGrid stroke="#f5f5f5" />
        <Legend/>
        <Bar
          dataKey="개봉 영화 [단위: 편]"
          barSize={40}
          fill="#413ea0"
        />
        <Line
          type="monotone"
          dataKey="영화 관람객 [단위: 십만명]"
          stroke="#ff7300"
        />
        <Line
          type="monotone"
          dataKey="확진자 수 [단위: 백명]"
          stroke="#ff0000"
        />
      </ComposedChart>
    </ChartComponent>
  );
}

const ChartComponent = styled.div`
  font-family: sans-serif;
  text-align: center;
`;
