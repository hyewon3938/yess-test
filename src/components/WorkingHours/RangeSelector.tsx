import React from "react";
import styled from "styled-components";

import TimeSelect from "./TimeSelect";

import { WorkingHourState, RangeData } from "./workingHours.types";

interface RangeSelectorProps {
  dataKey: keyof WorkingHourState["weeklyData"];
  rangeData: RangeData;
  rangeIndex: number;
}

const RangeSelector: React.FC<RangeSelectorProps> = ({
  dataKey,
  rangeData,
  rangeIndex,
}) => {
  return (
    <Wrap>
      <TimeSelect
        dataKey={dataKey}
        rangeIndex={rangeIndex}
        rangeType={"start"}
        value={rangeData.start}
      />
      <span>-</span>
      <TimeSelect
        dataKey={dataKey}
        rangeIndex={rangeIndex}
        rangeType={"end"}
        value={rangeData.end}
      />
    </Wrap>
  );
};

export default RangeSelector;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  > span {
    font-size: 18px;
    margin: 0 16px;
  }
`;
