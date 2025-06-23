import type { FC } from 'react';
import { SortDirection } from '@/shared/const';
import styled from './control-panel.module.css';

type ControlPanelProps = {
  currentSortParam: SortDirection;
  handleSortChange: (value: SortDirection) => void;
};

export const ControlPanel: FC<ControlPanelProps> = ({
  currentSortParam,
  handleSortChange,
}) => {
  return (
    <div className={styled['control-panel']}>
      <label>Sort: </label>
      <select
        value={currentSortParam}
        onChange={(event) =>
          handleSortChange(event.target.value as SortDirection)
        }
      >
        <option value={SortDirection.ASC}>ascending</option>
        <option value={SortDirection.DESC}>descending</option>
      </select>
    </div>
  );
};
