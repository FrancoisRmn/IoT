import 'package:front/model/direction_check.dart';

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
}
