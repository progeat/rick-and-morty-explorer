import type { FC } from 'react';
import { SortDirection } from '@/shared/const';
import { Box, NativeSelect } from '@mantine/core';

type ControlPanelProps = {
  currentSortParam: SortDirection;
  handleSortChange: (value: SortDirection) => void;
};

export const ControlPanel: FC<ControlPanelProps> = ({
  currentSortParam,
  handleSortChange,
}) => {
  return (
    <Box p="md" mx="auto">
      <NativeSelect
        styles={{ root: { margin: '0 auto', width: '30%' } }}
        value={currentSortParam}
        label="Sort: "
        data={Object.values(SortDirection)}
        onChange={(event) =>
          handleSortChange(event.target.value as SortDirection)
        }
      />
    </Box>
  );
};
