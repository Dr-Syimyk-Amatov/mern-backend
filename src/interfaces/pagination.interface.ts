export interface Pagination<T> {
  data: T[];
  pageSize: number;
  pageIndex: number;
  lastPageIndex: number;
  totalCount: number;
}

export interface PaginationParams {
  pageSize: number;
  pageIndex: number;
}
