export enum SortOrder {
  Asc = "asc",
  Desc = "desc",
}

export const SortOrderMap: Record<SortOrder, 1 | -1> = {
  [SortOrder.Asc]: 1,
  [SortOrder.Desc]: -1,
};
