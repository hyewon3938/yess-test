import React from "react";
import styled from "styled-components";

import RangeSelector from "./RangeSelector";
import { deleteIcon, addIcon } from "../../images/icon";

interface HourData {
  title: string;
}

interface SettingHourItemProps {
  data: HourData;
}

const SettingHourItem: React.FC<SettingHourItemProps> = ({ data }) => {
  return (
    <Wrap>
      <Title>{data.title}</Title>
      <RangeSelector />
      <IconButton>{deleteIcon}</IconButton>
      <IconButton>{addIcon}</IconButton>
    </Wrap>
  );
};

export default SettingHourItem;

const Wrap = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 30px 0;
  border-bottom: solid 1px #e7e7e7;
`;

const Title = styled.h3`
  width: 150px;
  font-size: 18px;
`;

const IconButton = styled.button`
  margin: 0 0 0 24px;
  > svg {
    width: 22px;
  }
`;
