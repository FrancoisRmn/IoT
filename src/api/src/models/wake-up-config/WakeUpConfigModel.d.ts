import { RoutingProfile } from "../direction/RoutingProfile";

export interface Check{}

export interface WakeUpConfig {
  localTimeZone?: string;
  preferHomeWorking?: boolean;
  officeWorkingConfig?: OfficeWorkingConfig;
  homeWorkingConfig?: HomeWorkingConfig;
}
export interface OfficeWorkingConfig extends WorkingConfig {
  weatherCheck?: WeatherCheck;
  airPollutionCheck?: AirPollutionCheck;
  directionCheck?: DirectionCheck;
}
export interface HomeWorkingConfig extends WorkingConfig {
  agendaCheck?: AgendaCheck;
}
export interface WorkingConfig {
  shouldStartAt?: number;
  delay?: number;
  preparationDuration?: number;
  address?: string;
  position?: Position
}
export interface Position{
  lat?: number,
  lon?: number
}
export interface WeatherCheck extends Check {
  minTemp?: number;
  maxTemp?: number;
  weatherConditionsCheck?: WeatherCondition[];
}
export interface WeatherCondition {
  type?: string;
  maxIntensity?: number;
}
export interface AirPollutionCheck extends Check {
  minAqi?: number;
}
export interface DirectionCheck extends Check {
  noWakeUpBefore: number
  mode: RoutingProfile
}
export interface AgendaCheck extends Check {
  url?: string;
}
