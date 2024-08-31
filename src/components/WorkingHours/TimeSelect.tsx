import React, { useMemo } from "react";
import styled from "styled-components";

const TimeSelect = () => {
  const timeList = useMemo(() => {
    const minutes = ["00", "15", "30", "45"];

    return Array.from({ length: 96 }).map((_, index) => {
      const hour = Math.trunc(index / 4);
      const hourValue = hour > 10 ? `${hour}` : `0${hour}`;
      const minute = minutes[index % 4];
      return {
        value: hourValue + minute,
        title: hourValue + ":" + minute,
        hour: hour,
        minute: minute,
      };
    });
  }, []);

  console.log(timeList);

  return (
    <Wrap>
      <select>
        {timeList.map((item, index) => (
          <option
            key={`time-select-${index}`}
            label={item.title}
            value={item.value}
          >
            {item.title}
          </option>
        ))}
      </select>
    </Wrap>
  );
};

export default TimeSelect;

const Wrap = styled.div`
  width: 180px;
  height: 48px;
  border: solid 1px #e7e7e7;
  border-radius: 8px;
  padding: 0 16px;
  select {
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
    &:focus {
      border: none;
      outline: none;
    }
  }
`;
