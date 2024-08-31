import styled from "styled-components";
import CatImages from "./CatImages";

function CatViewer() {
  return (
    <Wrap>
      <ContentWrap>
        <CatImages />
      </ContentWrap>
    </Wrap>
  );
}

export default CatViewer;

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const ContentWrap = styled.div`
  width: 1200px;
  height: 100%;
  overflow-y: scroll;
`;
