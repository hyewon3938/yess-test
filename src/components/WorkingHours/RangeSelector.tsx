import React from "react";
import styled from "styled-components";

import TimeSelect from "./TimeSelect";

const RangeSelector = () => {
  return (
    <Wrap>
      <TimeSelect />
      <span>-</span>
      <TimeSelect />
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
