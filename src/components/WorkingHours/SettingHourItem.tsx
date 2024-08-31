import React from "react";
import styled from "styled-components";

import RangeSelector from "./RangeSelector";
import { deleteIcon, addIcon } from "../../images/icon";
import { WorkingHourData } from "./workingHours.types";
import { useTypedDispatch } from "../../hooks/redux";
import { addRange, deleteRange } from "../../store/slices/workingHourSlice";

interface SettingHourItemProps {
  data: WorkingHourData;
}

const SettingHourItem: React.FC<SettingHourItemProps> = ({ data }) => {
  const dispatch = useTypedDispatch();

  const onClickAdd = () => {
    dispatch(addRange(data?.id));
  };

  const onClickDelete = (index: number) => {
    dispatch(deleteRange({ key: data?.id, rangeIndex: index }));
  };

  return (
    <Wrap>
      <Title>{data.title}</Title>
      <RangeListWrap>
        {data?.range?.length > 0 ? (
          <>
            {data?.range?.map((item, index) => (
              <RangeItemWrap key={`${data.id}-working-hour-range-${index}`}>
                <RangeSelector
                  dataKey={data.id}
                  rangeData={item}
                  rangeIndex={index}
                />
                <IconButton onClick={() => onClickDelete(index)}>
                  {deleteIcon}
                </IconButton>
                {index === data?.range?.length - 1 && (
                  <IconButton onClick={onClickAdd}>{addIcon}</IconButton>
                )}
              </RangeItemWrap>
            ))}
          </>
        ) : (
          <IconButton onClick={onClickAdd}>{addIcon}</IconButton>
        )}
      </RangeListWrap>
    </Wrap>
  );
};

export default SettingHourItem;

const Wrap = styled.li`
  display: flex;
  align-items: stretch;
  width: 100%;
  height: fit-content;
  padding: 24px 0;
  border-bottom: solid 1px #e7e7e7;
`;

const Title = styled.div`
  width: 130px;
  font-size: 18px;
  height: 100%;
  padding: 16px;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  height: 100%;
  > svg {
    width: 22px;
  }
`;

const RangeListWrap = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const RangeItemWrap = styled.li`
  display: flex;
  gap: 16px;
`;
