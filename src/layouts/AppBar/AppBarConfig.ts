//src/layouts/AppBar/AppBarConfig.ts

import { IconMap } from "../../styles";

export interface AppBarConfig {
  iconBoolean: boolean;
  iconName?: keyof typeof IconMap;
  leftTextBoolean: boolean;
  leftText?: string;
  rightTextBoolean: boolean;
  rightText?: string;
}