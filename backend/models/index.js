import { WaterQualityData } from "./at200.js";
import { WaterQualityDataSecond } from "./at500.js";
import { BatteryData } from "./vulink.js";
import User from "./user.js";

WaterQualityData.sync();
WaterQualityDataSecond.sync();
BatteryData.sync();
User.sync();

export { WaterQualityData, WaterQualityDataSecond, BatteryData };
