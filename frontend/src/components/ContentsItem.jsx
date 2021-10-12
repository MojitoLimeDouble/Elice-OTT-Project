import styled from "styled-components";

const ContentsItem = ({ youtube }) => { // tmdb 추가해야함
    // const { }
    const { title, url, thumbnail } = youtube; // 에러

    return (
        <div>
            {/* <MainPosterBlock>
                <div className="mainPoster">
                    <img src={tmdb} />
                </div>
            </MainPosterBlock> */}
            <ThumbnailBlock>
                {thumbnails && (
                    <div className="thumbnail">
                        <a href={url} target="_blank" rel="noreferrer noopener">
                            <img src={thumbnail} alt="thumbnail" />
                        </a>
                    </div>
                )}
                <div className="title">
                    <a href={url} target="_blank" rel="noreferrer noopener">
                        <p>{title}</p>
                    </a>
                </div>
            </ThumbnailBlock>
        </div>
    );
};

export default ContentsItem;

const MainPosterBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: space-around;
  .mainPoster {
      width: 600px;
      height: 900px;
      flex-direction: column;
      justify-content: left;
      object-fit: cover;
  }
`

const ThumbnailBlock = styled.div`
  display: flex;
  .thumbnail {
    margin-right: 1rem;
    img {
      display: flex;
      width: 360px;
      height: 202px;
      margin-right: 2rem;
      object-fit: cover;
    }
  }
  .title {
    margin: 0.5rem;
    p {
      color: #fff;
      font-size: 14px;
      font-style: arial, sans-serif;
      font-weight: bold;
    }
  }
`;