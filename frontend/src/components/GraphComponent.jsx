import { ResponsivePie } from "@nivo/pie";

const MyResponsivePie = ({ data }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    cornerRadius={5}
    activeOuterRadiusOffset={8}
    colors={["#ebc8f6", "#edc3d8", "#d1c9e9", "#dce4f2", "#feddc8"]}
    borderWidth={1}
    borderColor={{ from: "color", modifiers: [["darker", "0.2"]] }}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsOffset={9}
    arcLinkLabelsDiagonalLength={17}
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    enableArcLabels={false}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ from: "color", modifiers: [["darker", "2"]] }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    theme={{
      labels: {
        text: {
          fontFamily: "NotoSansKR",
          fontWeight: "bold",
          fontSize: "13",
          // TODO: 일정 길이 이상의 글자가 잘려 보이는 것 수정
        },
      },
    }}
  />
);

export default MyResponsivePie;
