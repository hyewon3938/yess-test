import React, { useEffect } from "react";
import styled from "styled-components";
import { useTypedSelector, useTypedDispatch } from "../../hooks/redux";
import SettingHourItem from "./SettingHourItem";
import {
  setweeklyData,
  setIsEdited,
} from "../../store/slices/workingHourSlice";

interface ButtonProps {
  $isColored?: boolean;
}

const SettingHours: React.FC<ButtonProps> = () => {
  const { weeklyData, isEdited } = useTypedSelector(
    (state) => state.workingHours
  );
  const dispatch = useTypedDispatch();

  useEffect(() => {
    checkLocalData();
  }, []);

  const checkLocalData = () => {
    // 저장된 데이터가 있는 경우 저장 데이터 적용
    const localData = localStorage.getItem("LOCAL_WEEKLY_DATA");

    if (!localData) {
      localStorage.setItem("LOCAL_WEEKLY_DATA", JSON.stringify(weeklyData));
    } else {
      dispatch(setweeklyData(JSON.parse(localData)));
    }
  };

  const onClickUpdate = () => {
    localStorage.setItem("LOCAL_WEEKLY_DATA", JSON.stringify(weeklyData));
    dispatch(setIsEdited(false));
  };

  return (
    <Wrap>
      <TitleWrap>
        <h2>Set your weekly hours</h2>
      </TitleWrap>
      <HourListWrap>
        {(Object.keys(weeklyData) as Array<keyof typeof weeklyData>).map(
          (key) => (
            <SettingHourItem
              key={`seeting-hour-${key}`}
              data={weeklyData[key]}
            />
          )
        )}
      </HourListWrap>
      {isEdited && (
        <ButtonWrap>
          <div>
            <Button>Cancel</Button>
            <Button $isColored={true} onClick={onClickUpdate}>
              Update
            </Button>
          </div>
        </ButtonWrap>
      )}
    </Wrap>
  );
};

export default SettingHours;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 16px 84px 16px;
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
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-top: solid 1px #e7e7e7;
  > div {
    width: 1200px;
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    padding: 16px;
  }
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
