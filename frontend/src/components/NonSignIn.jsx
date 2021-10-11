import React from "react";
import { Link } from "react-router-dom";
import "./NonSignIn.scss";
import "fullpage.js/vendors/scrolloverflow"; // Optional. When using scrollOverflow:true
import ReactFullpage from "@fullpage/react-fullpage";
import styled from "styled-components";
import { SectionsContainer, Header } from "react-fullpage";
import NonSigninNavigation from "./NonSigninNavigation";

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
                      <Title>POTCHA 소개 1</Title>
                    </div>
                  </div>
                  <div className="slide">
                    <Title>POTCHA 소개 2</Title>
                  </div>
                  <div className="slide">
                    <Title>POTCHA 소개 3</Title>
                  </div>
                </div>
                <div className="section">
                  <div className="slide">
                    <div>
                      <Title>POTCHA 소개 1</Title>
                    </div>
                  </div>
                  <div className="slide">
                    <Title>POTCHA 소개 2</Title>
                  </div>
                  <div className="slide">
                    <Title>POTCHA 소개 3</Title>
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
