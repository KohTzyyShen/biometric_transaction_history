//src/layouts/AppBar/AppBarConfig.ts

/*
用法：

引用prop设置，应该说改成config类型
interface Props {
  config: AppBarConfig;
}
*/

import { IconMap } from "../../styles";

export interface AppBarConfig {
  iconBoolean: boolean;
  iconName?: keyof typeof IconMap;
  leftTextBoolean: boolean;
  leftText?: string;
  rightTextBoolean: boolean;
  rightText?: string;
}