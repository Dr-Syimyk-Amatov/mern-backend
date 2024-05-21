import { SortOrder } from "../enums";

export interface SortParams<T extends string> {
  sortOrder: SortOrder;
  sortKey: T;
}
