# **POTCHA란?**

집에서 아무것도 하지않고 소파에 누워 TV를 보며 뒹굴뒹굴 하나는 사람을 칭하는 "Couch Potato"에서 착안하여, 게으른 감자가 아닌, 능동적으로 컨텐츠를 발굴하고 찾아 합리적으로 소비하는 **감자🥔**가 사용하는 **OTT service**입니다.

- **POTCHAR**: POTCHA 서비스를 사용하는 사용자를 의미합니다.

## 1. 프로젝트 소개

- 사용하려는 데이터(제안된 데이터 중 하나 또는 선택한 다른 데이터 세트)를 명시, 이에 대한 설명

  - TMDB, 썸트렌드, 2020방송매체 이용형태 조사(방송통신위원회)
  - [총 관객수 및 매출액 (연도별) - 소개 페이지에 있는 '코로나 확진자 증가에 따라 전국 영화관 관람객 감소'에 사용된 자료](https://www.kobis.or.kr/kobis/business/stat/them/findYearlyTotalList.do)
  - [개봉일람 (연도별) - 발표 자료에 있는 코로나 이전/이후 선호 장르 변화 부분에 사용된 자료](https://www.kobis.or.kr/kobis/business/stat/offc/searchOfficHitTotList.do?searchMode=year#none)

- 기술 스택 (python, d3, pandas, jupyter, javascript, MySQL 등)

  - 데이터 분석: Numpy, Pandas, Matplotlib, Seaborn
  - 백엔드: Python, Flask, MySQL
  - 프론트엔드: JavaScript, React, React-Redux

- 사용된 라이브러리

  - 데이터 분석: Numpy, Pandas, Matplotlib, Seaborn
  - 백엔드: datetime, flask_migrate, flask_cors, flask_jwt_extended, flask_sqlalchemy, flask_bcrypt, werkzeug
  - 프론트엔드: chakra-ui, react-fullpage, nivo, axios, react-custom-scrollbars, react-icons, react-js-banner, react-redux, react-router-dom, react-slicks, react-wordcloud, recharts, styled-components

- 웹서비스에 대한 자세한 개요

  - COVID-19가 장기간 지속됨에 따라 드라마부터 다큐, 영화 등 다양한 컨텐츠를 감상할 수 있는 **NETFLIX**, **WATCHA**, **Tving** 등 OTT 서비스의 사용량이 증가되고 있습니다. 기존의 OTT 서비스에서는 사람들이 선호하는 컨텐츠를 추천하거나 사용자별 맞춤 작품에 초점을 맞추어 서비스를 제공하고 있습니다.

  - 이와 다르게 **Dobbie팀**은 MZ 세대와 같이 유행에 민감하고 트렌드를 이끌어 가길 원하는 사람들의 니즈에 초점을 맞추었습니다. 영화와 TV 프로그램에 대한 다양한 데이터들을 수집하고 분석하여 흥행할 작품들을 다른 OTT 서비스 보다 먼저 선별하여 사용자에게 컨텐츠를 추천을 합니다(흥행 예측 서비스).

  - **COVID-19 대유행** 전 후의 미디어 시장에서 흥행 장르의 변화를 주목하여, 흥행 예측할 작품과 더불어 COVID-19 대유행 전에 해당 작품과 유사한 장르 또는 성격을 지닌 컨텐츠를 소개하며, 미디어 시장의 선 순환을 발생할 수 있겠다는 의도로 해당 프로젝트를 기획하였습니다.

## 2. 프로젝트 목표

- 자체 개발한 트렌드 분석 알고리즘을 통해 앞으로 유행할 컨텐츠를 사용자에게 추천합니다.
- 트렌드 분석 결과를 바탕으로 COVID-19 이전 작품들 중 빛나지 못했지만 흥행 요소를 갖춘 컨텐츠들을 사용자에게 소개합니다.
- 사용자가 찜한 컨텐츠를 분석하여 선호하는 장르 또는 컨텐츠에 대한 키워드를 시각화하고, 사용자들이 본인의 취향 및 선호하는 키워드를 파악할 수 있도록 도와줍니다.
- 사용자가 선호하는 장르 및 키워드를 바탕으로, 사용자 취향에 알맞는 컨텐츠를 추천합니다.

## 3. 프로젝트 기능 설명

- 주요 기능
  - 컨텐츠 흥행 예측
    - 현재 유행하는 컨텐츠들의 트렌드를 분석하여 점수화하는 자체 알고리즘을 CODIV-19 이후 작품들에 적용하여 앞으로 흥행할 것이라 예상되는 작품들을 **POTCHAR**에게 소개합니다.
  - CODIV-19 이전 유사 컨텐츠 추천
    - CODIV-19 이전 작품들에 자체 알고리즘을 적용하여 흥행 예측 작품과 유사하지만 빛을 보지 못했던 작품들을 **POTCHAR**에게 추천합니다.
  - 찐 감자 분석
    - 사용자가 찐(좋아요를 누른) 컨텐츠를 분석하여 선호하는 장르, 키워드, 국가, 배우, 감독, 긍정어, 부정어를 시각화하여 보여줌으로써 사용자의 취향 파악을 돕습니다.
  - 사용자 맞춤 추천 컨텐츠
    - **POTCHAR**의 \*\*\*\*찐 감자들과 비슷한 컨텐츠를 사용자에게 추천합니다.
- 서비 기능
  - 친구 추가
    - 친구 추가를 통해 내가 알고 있는 또 다른 **POTCHAR**의 취향을 확인할 수 있습니다.
  - 정렬 및 필터링 기능
    - 정렬과 필터링 기능을 사용하여 원하는 기준으로 컨텐츠를 확인할 수 있습니다.
  - 관련 Youtube 영상 소개
    - 컨텐츠와 관련된 Youtube 영상을 소개함으로써 **POTCHAR**가 컨텐츠를 선택할 때 도움이 될 수 있도록 합니다.
- 프로젝트만의 차별점, 기대 효과
  - 기존 OTT 서비스에서 대중이 선호하는 컨텐츠를 추천하는 것과 다르게, **POTCHA**에서는 유행에 민감한 **POTCHAR**들을 위해 현재 흥행하는 컨텐츠들을 분석하여 앞으로 흥행할 작품들을 예측하는 데 초점을 두었습니다.
  - 이와 더불어 과거 흥행하지 못했지만 트렌드의 변화에 따라 현재는 흥행 요소를 갖춘 컨텐츠를 **POTCHAR**에게 소개함으로써 미디어 시장의 확대 및 과거 유행하지 못했던 컨텐츠들에 대한 부흥을 기대할 수 있습니다.

## 4. 프로젝트 구성도

[와이어프레임] <br />
<a href="https://whimsical.com/dobbie-s-potcha-GSDWcDcg6yi7Kbgi3Tf8c1" target="_blank"><img src="https://user-images.githubusercontent.com/82889580/138548592-03093c62-dd31-4007-a47a-89852d776b1d.png" alt="drawing" width="400"/></a> <br />
[스토리보드] <br />
<a href="https://docs.google.com/presentation/d/1T_NNQGZCDs3byeRSfUB7Q-UJRsbi0QB156TCL4aG6Lc/edit#slide=id.p" target="_blank"><img src="https://user-images.githubusercontent.com/82889580/138548575-37bc8698-a8f2-439a-b6b9-6aeaa7034327.png" alt="storyboard" width="400" /></a><br />

## 5. 프로젝트 팀원 역할 분담

| 이름        | 역할                                        |
| ----------- | ------------------------------------------- |
| 김효곤      | Product Owner / 백엔드 / 데이터 분석 / 기획 |
| 김민지(1반) | Developer / 백엔드 / 데이터 분석 / 기획     |
| 남은열      | Developer / 프론트엔드 / 기획 / 배포        |
| 이민영      | Developer / 프론트엔드 / 데이터 분석 / 기획 |

**멤버별 responsibility**

1. 팀장

- 기획 단계: 구체적인 설계와 지표에 따른 프로젝트 제안서 작성
- 개발 단계: 팀원간의 일정 등 조율 + 프론트 or 백엔드 개발
- 수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정, 발표 준비

2. 프론트엔드

- 기획 단계: 와이어프레임 작성, 사용자 친화적 UI/UX 디자인 설계, 컴포넌트 및 폴더 구조 디자인
- 개발 단계: 와이어프레임을 기반으로 기능 및 디자인 구현, 데이터 처리 및 시각화 담당, UI 디자인 완성
- 수정 단계: 피드백 반영해서 UI/UX 디자인 수정 및 반영, 발표 준비

3.  백엔드 & 데이터 담당

- 기획 단계: 기획 데이터 분석을 통해 해결하고자 하는 문제를 정의
- 개발 단계: 웹 서버 사용자가 직접 백엔드에 저장할수 있는 기능 구현, 데이터 베이스 구축 및 API 활용, 데이터 분석 개념 총동원하기
- 수정 단계: 코치님 피드백 반영해서 분석/ 시각화 방식 수정

## 6. 버전

- ver. 1.6.1
