export interface IAccountItem {
  id?: number;
  count: string;
  isIncome: number;
  type: string;
  remark?: string;
  icon: string;
  realCreateTime: string;
}

export type accountType = "income" | "expend";
export enum accountTypeEnum {
  expend,
  income,
}
