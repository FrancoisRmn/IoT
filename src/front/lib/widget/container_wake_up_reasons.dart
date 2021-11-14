import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:front/widget/container_wake_up_detail.dart';
import 'package:front/widget/decoration_wake_up_container.dart';
import 'package:front/widget/wake_up_reason.dart';

class WakeUpReasons extends StatefulWidget {
  WakeUpReasons({Key? key}) : super(key: key);

  @override
  _WakeUpReasonsState createState() => _WakeUpReasonsState();
}

class _WakeUpReasonsState extends State<WakeUpReasons> {
  final textDescription = ValueNotifier("");
  final selectedReason = "Traffic";

  Future<dynamic> _readJson() async {
    final String response =
        await rootBundle.loadString('lib/data/reasonsList.json');
    return await json.decode(response);
  }

  Widget createTable() {
    return FutureBuilder(
        future: _readJson(),
        builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            if (snapshot.hasError) {
              return Text(snapshot.error.toString());
            } else if (snapshot.hasData) {
              List<dynamic> listReasons = snapshot.data;
              List<WakeUpReason> listWakeUpReason = listReasons
                  .map((element) => WakeUpReason(
                      element["name"]!,
                      element["description"],
                      textDescription,
                      element["name"] == selectedReason))
                  .toList();
              List<WakeUpReason> secondTableRow =
                  List<WakeUpReason>.from(listWakeUpReason);
              int middleList = (listWakeUpReason.length / 2).round();
              listWakeUpReason.removeRange(middleList, listWakeUpReason.length);
              secondTableRow.removeRange(0, middleList);
              return ValueListenableBuilder<String>(
                  valueListenable: textDescription,
                  builder: (context, value, child) {
                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Container(
                            decoration:
                                WakeUpContainerDecoration().create(context),
                            child: Table(
                              children: [
                                TableRow(children: listWakeUpReason),
                                TableRow(children: secondTableRow)
                              ],
                            )),
                        WakeUpDetail(textDescription)
                      ],
                    );
                  });
            } else {
              return const Text('No data');
            }
          } else {
            return const CircularProgressIndicator();
          }
        });
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.fromLTRB(8, 0, 8, 8), child: createTable());
  }
}
