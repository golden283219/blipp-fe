export const validateTableId = (
  tableId: number,
  availableTableIds: number[]
) => {
  if (!tableId) {
    return { errMsg: 'TableIdInputError', isValid: false };
  }
  if (!availableTableIds.includes(tableId)) {
    return {
      errMsg: 'TableIdDoesNotExist',
      isValid: false,
    };
  }
  return { errMsg: '', isValid: true };
};
