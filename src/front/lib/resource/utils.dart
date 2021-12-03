class Utils {
  static String formatSeconds(int second) {
    int hours = (second / 3600).floor();
    second %= 3600;
    int minutes = (second / 60).floor();
    return hours.toString() + ":" + minutes.toString();
  }
}
