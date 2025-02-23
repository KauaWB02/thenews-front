import { StatusTypeEnum } from "../../../utils/enums/status-type.enum";
import { StreakTypeEnum } from "../../../utils/enums/streak-type.enum";
import { MenuInterface } from "./menu.interface";

export interface UserInterface {
  id: number;
  email: string;
  status: StatusTypeEnum;
  streak: StreakTypeEnum;
  streakDays: number;
  lastAccess: Date;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmChannel: string | null;
  menus: Array<MenuInterface>;
  permissionsKeys: Array<string>;
}
