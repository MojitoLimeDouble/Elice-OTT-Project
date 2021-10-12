import styled, { css } from "styled-components";

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid #e1e2e4;
  width: 100%;
  margin-bottom: 16px;
`;

const EactTab = styled.p`
  font-size: 14px;
  line-height: 22px;
  color: #151618;
  padding: 8px;
  cursor: pointer;
  + p {
    margin-left: 16px;
  }
  transition: all 0.5s ease-out;
  ${(props) =>
    props.active &&
    css`
      color: #ffffff;
      font-weight: bold;
      background: rgba(230, 230, 230, 0.0001);
      box-shadow: inset 0px -4px 0px #ffffff;
    `}
`;

const tabs = ["MOVIE", "TV"];

const Tab = ({ currTab, onClick }) => {
  return (
    <Container>
      {tabs.map((tab, i) => {
        return (
          <EactTab
            key={`${tab}-${i}`}
            active={currTab === tab}
            onClick={() => onClick(tab)}
          >
            {tab}
          </EactTab>
        );
      })}
    </Container>
  );
};

export default Tab;
