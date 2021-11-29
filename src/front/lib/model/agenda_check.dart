class AgendaCheck {
  final String? url;

  AgendaCheck({required this.url});

  factory AgendaCheck.fromJson(Map<String, dynamic> json) {
    return AgendaCheck(url: json["url"]);
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['url'] = url;
    return data;
  }
}
