class Position {
  double? lat;
  double? lon;

  Position({required this.lat, required this.lon});

  factory Position.fromJson(Map<String, dynamic> json) {
    return Position(lat: json['lat'], lon: json['lon']);
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    if (lat != null) {
      data['lat'] = lat;
    }
    if (lon != null) {
      data['lon'] = lon;
    }
    return data;
  }
}
