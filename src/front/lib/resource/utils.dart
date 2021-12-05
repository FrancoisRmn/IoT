import 'package:front/model/direction_check.dart';
import 'package:front/model/weather_condition.dart';

class Utils {
  static String formatSeconds(int second) {
    int hours = (second / 3600).floor();
    second %= 3600;
    int minutes = (second / 60).floor();
    if (minutes < 10) {
      return hours.toString() + ":0" + minutes.toString();
    } else {
      return hours.toString() + ":" + minutes.toString();
    }
  }

  static RoutingProfile? selectRouting(String mode) {
    switch (mode) {
      case "driving":
        return RoutingProfile.driving;
      case "walking":
        return RoutingProfile.walking;
      case "bicycling":
        return RoutingProfile.bicycling;
      case "transit":
        return RoutingProfile.transit;
      default:
        return null;
    }
  }

  static String? selectRoutingToString(RoutingProfile routingProfile) {
    switch (routingProfile) {
      case RoutingProfile.driving:
        return "driving";
      case RoutingProfile.walking:
        return "walking";
      case RoutingProfile.bicycling:
        return "bicycling";
      case RoutingProfile.transit:
        return "transit";
      default:
        return null;
    }
  }

  static WeatherConditionType? selectWeatherCondition(String condition) {
    switch (condition) {
      case "Rain":
        return WeatherConditionType.rain;
      case "Snow":
        return WeatherConditionType.snow;
      case "Thunderstorm":
        return WeatherConditionType.thunderstorm;
      case "Drizzle":
        return WeatherConditionType.drizzle;
      case "Clear":
        return WeatherConditionType.clear;
      default:
        return null;
    }
  }

  static String? selectWeatherConditionToString(WeatherConditionType conditionType) {
    switch (conditionType) {
      case WeatherConditionType.rain:
        return "Rain";
      case WeatherConditionType.snow:
        return "Snow";
      case WeatherConditionType.thunderstorm:
        return "Thunderstorm";
      case WeatherConditionType.drizzle:
        return "Drizzle";
      case WeatherConditionType.clear:
        return "Clear";
      default:
        return null;
    }
  }
}
