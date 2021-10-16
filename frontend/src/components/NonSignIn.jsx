import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "fullpage.js/vendors/scrolloverflow"; // Optional. When using scrollOverflow:true
import ReactFullpage from "@fullpage/react-fullpage";
import styled from "styled-components";
import { SectionsContainer } from "react-fullpage";
import NonSigninNavigation from "./NonSigninNavigation";
import OttServiceRateChart from "./OttServiceRateChart";
import OttServiceRateData from "./OttServiceRateData";
import MovieCustomerRateChart from "./MovieCustomerRateChart";
import MovieCustomerRateData from "./MovieCustomerRateData";
import NetflixOriginalMovieChart from "./NetfilxOriginalMovieChart";
import NetflixOriginalMovieData from "./NetfilxOriginalMovieData";

const NonSignIn = () => {
  const windowSize = useWindowSize();

  return (
    <div>
      <NonSigninNavigationContainer
        style={{
          position: "absolute",
          top: "0",
          zIndex: "15",
        }}
      >
        <NonSigninNavigation />
      </NonSigninNavigationContainer>
      <SectionsContainer>
        <ReactFullpage
          scrollOverflow={true}
          loopBottom={true}
          // sectionsColor={["orange", "purple", "green", "black"]}
          render={({ state, fullpageApi }) => {
            return (
              <FullPage>
                <div className="section one">
                  <div
                    style={{
                      backgroundColor: "#ffffff8d",
                      boxShadow:
                        "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
                      height: `${windowSize.height - 150}px`,
                      transform: "translateY(-70px)",
                      borderRadius: "25px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Title style={{ fontSize: "60px" }}>
                      아직 POTCHA 회원이 아니신가요?
                    </Title>
                    <div style={{ height: "50px" }} />
                    <Link to="/signup">
                      <Button>회원가입</Button>
                    </Link>
                  </div>
                </div>
                <div className="section two">
                  <div className="slide one">
                    <div className="temp">
                      <div
                        className="sectionTwo slideOne backGround"
                        style={{
                          backgroundColor: "#ffffff8d",
                          boxShadow:
                            "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
                          width: "1290px",
                          height: `${windowSize.height - 150}px`,
                          transform: "translateY(-70px) translateX(5px)",
                          borderRadius: "25px",
                          display: "grid",
                          gridTemplateColumns: "1fr 1.5fr",
                          alignItems: "center",
                        }}
                      >
                        <div
                          className="sectionTwo slideOne Title"
                          style={{ paddingLeft: "60px" }}
                        >
                          <Title style={{ marginBottom: "20px" }}>
                            코로나 확진자 증가에 따라
                          </Title>
                          <Title>전국 영화관 관람객 감소</Title>
                        </div>
                        <div
                          className="movieCustomerRateChart"
                          style={{
                            // marginTop: "100px",
                            backgroundColor: "#ffffff8d",
                            boxShadow:
                              "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
                            borderRadius: "25px",
                            marginRight: "95px",
                          }}
                        >
                          <MovieCustomerRateChart
                            data={MovieCustomerRateData}
                            height={windowSize.height}
                            style={{ maxHeight: "800px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide two">
                    <div className="temp">
                      <div
                        className="sectionTwo slideTwo backGround"
                        style={{
                          backgroundColor: "#ffffff8d",
                          boxShadow:
                            "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
                          width: "1290px",
                          height: `${windowSize.height - 150}px`,
                          transform: "translateY(-70px) translateX(5px)",
                          borderRadius: "25px",
                          display: "grid",
                          gridTemplateColumns: "1fr 1.5fr",
                          alignItems: "center",
                        }}
                      >
                        <div className="sectionTwo slideTwo Title ">
                          <Title style={{ marginBottom: "20px" }}>
                            점점 늘어나는
                          </Title>
                          <Title>OTT 서비스 이용자&#128526;</Title>
                        </div>
                        <div
                          className="ottServiceRateChart"
                          style={{
                            height: `${
                              windowSize.height < 800
                                ? windowSize.height - 200
                                : 600
                            }px`,
                            width: "680px",
                            backgroundColor: "#ffffff8d",
                            boxShadow:
                              "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
                            borderRadius: "25px",
                          }}
                        >
                          <OttServiceRateChart data={OttServiceRateData} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide three">
                    <div className="temp">
                      <div
                        className="sectionTwo slideTwo backGround"
                        style={{
                          backgroundColor: "#ffffff8d",
                          boxShadow:
                            "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
                          width: "1290px",
                          height: `${windowSize.height - 150}px`,
                          transform: "translateY(-70px) translateX(5px)",
                          borderRadius: "25px",
                          display: "grid",
                          gridTemplateColumns: "1fr 1.5fr",
                          alignItems: "center",
                        }}
                      >
                        <div className="sectionTwo slideTwo Title">
                          <Title style={{ marginBottom: "20px" }}>
                            코로나 이전과 이후
                          </Title>
                          <Title style={{ marginBottom: "20px" }}>
                            영화 상영 방식에 있어,
                          </Title>
                          <Title style={{ marginBottom: "20px" }}>
                            넷플릭스로 상영하는
                          </Title>
                          <Title>영화의 수 변화&#128200;</Title>
                        </div>
                        <div
                          className="ottServiceRateChart"
                          style={{
                            height: `${
                              windowSize.height < 800
                                ? windowSize.height - 200
                                : 600
                            }px`,
                            width: "680px",
                            backgroundColor: "#ffffff8d",
                            boxShadow:
                              "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
                            borderRadius: "25px",
                          }}
                        >
                          <NetflixOriginalMovieChart
                            data={NetflixOriginalMovieData}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="section three">
                  <div className="slide one">
                    <div className="temp">
                      <div
                        className="sectionThree slideOne backGround"
                        style={{
                          backgroundColor: "#ffffff8d",
                          boxShadow:
                            "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
                          width: "1290px",
                          height: `${windowSize.height - 150}px`,
                          transform: "translateY(-70px) translateX(5px)",
                          borderRadius: "25px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <div className="sectionThree slideOne Title">
                          <Title style={{ marginBottom: "40px" , fontSize:"50px"}}>
                            따라서 우리는 이런 서비스를 제공합니다!&#127839;
                          </Title>
                          <Title style={{ marginBottom: "20px" }}>
                            하나! OTT 서비스의 콘텐츠의 흥행 예측!&#128521;
                          </Title>
                          <Title>
                            둘! 당신의 취향을 분석해 추천작을 알려주는 찐감자
                            콘텐츠&#129364;
                          </Title>
                        </div>
                      </div>
                    </div>
                  </div>
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

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

const NonSigninNavigationContainer = styled.div`
  /* position: sticky;
  top: 0;
  z-index: 30;
   */
`;

const FullPage = styled.div`
  font-family: "NotoSansKR";
  font-weight: 700;
  .fp-controlArrow {
    margin: auto 30px;
    transform: translateY(-80px);
    &.fp-prev {
      border-color: transparent black transparent transparent;
      border-width: 25px 30px 25px 0;
    }
    &.fp-next {
      border-color: transparent transparent transparent black;
      border-width: 25px 0 25px 30px;
    }
  }
`;

const Title = styled.h3`
  font-size: 35px;
  text-align: center;
  /* color: #fff; */
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
