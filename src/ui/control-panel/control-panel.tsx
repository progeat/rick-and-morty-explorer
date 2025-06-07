import type { FC } from 'react';
import { SORT_DIRECTION } from '../../core/enums';
import styled from './control-panel.module.css';

type ControlPanelProps = {
  currentSortParam: SORT_DIRECTION;
  handleSortChange: (value: SORT_DIRECTION) => void;
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
          handleSortChange(event.target.value as SORT_DIRECTION)
        }
      >
        <option value={SORT_DIRECTION.ASC}>ascending</option>
        <option value={SORT_DIRECTION.DESC}>descending</option>
      </select>
    </div>
  );
};
