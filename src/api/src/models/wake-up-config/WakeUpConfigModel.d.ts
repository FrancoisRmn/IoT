export interface WakeUpConfig {
  localTimeZone?: string;
  noWakeUpBefore?: number;
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
export interface WeatherCheck {
  minTemp?: number;
  maxTemp?: number;
  weatherConditionsCheck?: WeatherCondition[];
}
export interface WeatherCondition {
  type?: string;
  maxIntensity?: number;
}
export interface AirPollutionCheck {
  minAqi?: number;
}
export interface DirectionCheck {
  car?: boolean;
  bus?: boolean;
  train?: boolean;
  bike?: boolean;
  walk?: boolean;
}
export interface AgendaCheck {
  url?: string;
}
