import React from "react";
import styled from "styled-components";

import TimeSelectorInput from "./TimeSelectorInput";

import { WorkingHourState, RangeData } from "./workingHours.types";

interface RangeInputProps {
  dataKey: keyof WorkingHourState["weeklyData"];
  rangeData: RangeData;
  rangeIndex: number;
}

const RangeInput: React.FC<RangeInputProps> = ({
  dataKey,
  rangeData,
  rangeIndex,
}) => {
  return (
    <Wrap>
      <TimeSelectorInput
        dataKey={dataKey}
        rangeIndex={rangeIndex}
        rangeType={"start"}
        value={rangeData.start}
      />
      <span>-</span>
      <TimeSelectorInput
        dataKey={dataKey}
        rangeIndex={rangeIndex}
        rangeType={"end"}
        value={rangeData.end}
      />
    </Wrap>
  );
};

export default RangeInput;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  > span {
    font-size: 18px;
    margin: 0 16px;
  }
`;
