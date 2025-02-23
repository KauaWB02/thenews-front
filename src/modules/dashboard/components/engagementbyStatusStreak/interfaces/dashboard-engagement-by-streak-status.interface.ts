import { StreakTypeEnum } from "../../../../../utils/enums/streak-type.enum";

export interface DashboardEngagementByStreakStatusInterface{
  streak: StreakTypeEnum;
  totalOpenings: number;
}