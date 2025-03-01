export interface Pageable<T> {
    data:T[];
    pageNo:number;
    totalItems:number;
}
