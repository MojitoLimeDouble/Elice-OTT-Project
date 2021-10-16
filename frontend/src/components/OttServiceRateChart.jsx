import { ResponsiveBar } from "@nivo/bar";

const OttServiceRateChart = ({ data }) => (
  <ResponsiveBar
    data={data}
    keys={["Youtube", "Netflix", "Facebook", "NaverTv", "AfricaTv"]}
    indexBy="country"
    margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    layout="horizontal"
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={[
      "rgb(255, 0, 0)",
      "rgb(228, 30, 27)",
      "rgb(72, 103, 130)",
      "rgb(3, 225, 100)",
      "rgb(14, 68, 152)",
    ]}
    defs={[
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "#rgba(136, 19, 17, 0.5)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    theme={{
      labels: {
        text: {
          fontFamily: "NotoSansKR",
          fontSize: "13",
        },
      },
      // 글자 크기 변경
      axis: {
        ticks: {
          text: {
            fontSize: "13",
            fontFamily: "NotoSansKR",
          },
        },
      },
      legends: {
        text: {
          fontSize: "13",
          fontFamily: "NotoSansKR",
        },
      },
    }}
    fill={[
      {
        match: {
          id: "Netflix",
        },
        id: "lines",
      },
    ]}
    borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "RATIO",
      legendPosition: "middle",
      legendOffset: 40,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "YEAR",
      legendPosition: "middle",
      legendOffset: -50,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
    legends={[
      {
        dataFrom: "keys",
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: "left-to-right",
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: "hover",
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={function (e) {
      return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
    }}
  />
);

export default OttServiceRateChart;
