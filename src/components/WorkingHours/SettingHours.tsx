import React from "react";

import styled from "styled-components";
import SettingHourItem from "./SettingHourItem";

interface ButtonProps {
  $isColored?: boolean;
}

const SettingHours: React.FC<ButtonProps> = () => {
  const weeklyData = [
    { id: "SUN", title: "Sunday" },
    { id: "MON", title: "Monday" },
    { id: "TUE", title: "Tuesday" },
    { id: "WED", title: "Wednesday" },
    { id: "THU", title: "Thursday" },
    { id: "FRI", title: "Friday" },
    { id: "SAT", title: "Saturday" },
  ];

  return (
    <Wrap>
      <TitleWrap>
        <h2>Set your weekly hours</h2>
      </TitleWrap>
      <HourListWrap>
        {weeklyData.map((item) => (
          <SettingHourItem key={`seeting-hour-${item.id}`} data={item} />
        ))}
      </HourListWrap>
      <ButtonWrap>
        <Button>Cancel</Button>
        <Button $isColored={true}>Update</Button>
      </ButtonWrap>
    </Wrap>
  );
};

export default SettingHours;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 0;
`;

const TitleWrap = styled.div`
  width: 100%;
  border-bottom: solid 1px #e7e7e7;
  padding: 0 0 16px 0;
  > h2 {
    font-size: 18px;
    font-weight: 700;
  }
`;

const HourListWrap = styled.ul`
  width: 100%;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  width: 100%;
  padding: 16px 0 0 0;
`;

const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  height: 38px;
  background-color: ${({ $isColored }) =>
    $isColored ? "#283bf9" : "transparent"};
  color: ${({ $isColored }) => ($isColored ? "#fff" : "#1f1f1f")};
  border-radius: 4px;
`;
