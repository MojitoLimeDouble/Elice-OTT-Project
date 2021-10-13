import React from "react";
import { Link } from "react-router-dom";
import "fullpage.js/vendors/scrolloverflow"; // Optional. When using scrollOverflow:true
import ReactFullpage from "@fullpage/react-fullpage";
import styled from "styled-components";
import { SectionsContainer, Header } from "react-fullpage";
import NonSigninNavigation from "./NonSigninNavigation";
import OttServiceRateChart from "./OttServiceRateChart";
import OttServiceRateData from "./OttServiceRateData";
import MovieCustomerRateChart from "./MovieCustomerRateChart";
import MovieCustomerRateData from "./MovieCustomerRateData";
import NetflixOriginalMovieChart from "./NetfilxOriginalMovieChart";
import NetflixOriginalMovieData from "./NetfilxOriginalMovieData";

const NonSignIn = () => {
  return (
    <div>
      <Header>
        <NonSigninNavigationContainer>
          <NonSigninNavigation />
        </NonSigninNavigationContainer>
      </Header>
      <SectionsContainer>
        <ReactFullpage
          scrollOverflow={true}
          loopBottom={true}
          sectionsColor={["orange", "purple", "green", "black"]}
          render={({ state, fullpageApi }) => {
            return (
              <FullPage>
                <div className="section">
                  <Title>아직 POTCHA 회원이 아니신가요?</Title>
                  <Link to="/signup">
                    <Button>회원가입</Button>
                  </Link>
                </div>
                <div className="section">
                  <div className="slide">
                    <div>
                      <Title>
                        코로나 확진자 증가에 따라 전국 영화관 관람객 감소
                      </Title>
                      <div>
                        <MovieCustomerRateChart data={MovieCustomerRateData} />
                      </div>
                    </div>
                  </div>
                  <div className="slide">
                    <Title>점점 늘어나는 OTT 서비스 이용자!&#128526;</Title>
                    <div
                      style={{
                        height: "400px",
                        width: "1000px",
                        backgroundColor: "white",
                      }}
                    >
                      <OttServiceRateChart data={OttServiceRateData} />
                    </div>
                  </div>
                  <div className="slide">
                    <Title>
                      코로나 이전과 이후 영화 상영 방식에 있어, OTT 서비스인
                      넷플릭스로 상영하는 영화의 수 변화&#128200;
                    </Title>
                    <div
                      style={{
                        height: "800px",
                        width: "800px",
                        backgroundColor: "white",
                      }}
                    >
                      <NetflixOriginalMovieChart
                        data={NetflixOriginalMovieData}
                      />
                    </div>
                  </div>
                </div>
                <div className="section">
                  <div className="slide">
                    <div>
                      <Title>
                        따라서 우리는 이런 서비스를 제공합니다!&#127839;
                      </Title>
                    </div>
                  </div>
                  <div className="slide">
                    <Title>
                      하나! OTT 서비스의 콘텐츠의 흥행 예측!&#128521;
                    </Title>
                  </div>
                  <div className="slide">
                    <Title>
                      둘! 당신의 취향을 분석해 추천작을 알려주는 찐감자
                      콘텐츠&#129364;
                    </Title>
                  </div>
                </div>
                <div className="section">
                  <Title>회원 가입 다시 권유</Title>
                  <Link to="/signup">
                    <Button>회원가입</Button>
                  </Link>
                </div>
              </FullPage>
            );
          }}
        />
      </SectionsContainer>
    </div>
  );
};

export default NonSignIn;

const NonSigninNavigationContainer = styled.div`
  background-color: white;
`;

const FullPage = styled.div`
  font-family: arial, helvetica;
`;

const Title = styled.h3`
  font-size: 5em;
  text-align: center;
  color: #fff;
  font-weight: 700;
`;

const Button = styled.button`
  padding: 0.93em 1.87em;
  background: #35495e;
  border-radius: 5px;
  border-color: transparent;
  display: block;
  color: #fff;
  margin: 0 auto;
  cursor: pointer;
  font-size: 0.85em;
`;
