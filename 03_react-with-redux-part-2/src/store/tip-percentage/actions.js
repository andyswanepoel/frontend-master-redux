export const TIP_PERCENTAGE_UPDATED = "TIP_PERCENTAGE_UPDATED";

export const updateTip = tipPercentage => ({
  type: TIP_PERCENTAGE_UPDATED,
  payload: parseInt(tipPercentage, 10)
});
