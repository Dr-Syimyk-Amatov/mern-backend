import { SortOrder, SortOrderMap } from "../enums";

export const getSortOrderValue = (order: SortOrder): 1 | -1 => {
  return SortOrderMap[order];
};
