import React from 'react';
import {FormDateInput} from 'molecules/FormDateInput';
import {Row} from 'atoms/Row';
import {Box} from 'atoms/Box';

export const EditFeedsDateInput = () => {
  return (
    <Row justifyContent="space-between">
      <Box width="48%">
        <FormDateInput
          name="startDate"
          placeholder="placeholder.dueDate"
          minimumDate={'today'}
          rightIconColor="#4d9ac5"
          color="black"
          fontSize={17}
        />
      </Box>

      <Box width="48%">
        <FormDateInput
          name="endDate"
          placeholder="placeholder.dueDate"
          minimumDate={'today'}
          rightIconColor="#4d9ac5"
          color="black"
          fontSize={17}
        />
      </Box>
    </Row>
  );
};
