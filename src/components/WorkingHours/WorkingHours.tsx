import styled from "styled-components";
import SettingHours from "./SettingHours";

function WorkingHours() {
  return (
    <Wrap>
      <ContentWrap>
        <TitleWrap>
          <h1>Working hour</h1>
        </TitleWrap>
        <SettingHours />
      </ContentWrap>
    </Wrap>
  );
}

export default WorkingHours;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #fcfcff;
  overflow-y: scroll;
`;

const ContentWrap = styled.div`
  display: flex;
  width: 1200px;
  height: fit-content;
  padding: 20px 0;
`;

const TitleWrap = styled.div`
  width: 300px;
  height: 100%;
  padding: 30px;

  > h1 {
    font-size: 18px;
    font-weight: 500;
  }
`;
