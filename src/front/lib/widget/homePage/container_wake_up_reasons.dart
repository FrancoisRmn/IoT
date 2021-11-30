import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:front/model/wake_up_response.dart';
import 'package:front/widget/homePage/container_wake_up_detail.dart';
import 'package:front/widget/homePage/decoration_wake_up_container.dart';
import 'package:front/widget/homePage/wake_up_reason.dart';

class WakeUpReasons extends StatefulWidget {
  final WakeUpResponse wakeUpResponse;
  WakeUpReasons({Key? key, required this.wakeUpResponse}) : super(key: key);

  @override
  _WakeUpReasonsState createState() => _WakeUpReasonsState();
}

class _WakeUpReasonsState extends State<WakeUpReasons> {
  final textDescription = ValueNotifier("");

  Future<dynamic> _readJson() async {
    final String response =
        await rootBundle.loadString('lib/data/reasonsList.json');
    return await json.decode(response);
  }

  Widget createTable() {
    textDescription.value = widget.wakeUpResponse.reason;
    return FutureBuilder(
        future: _readJson(),
        builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            if (snapshot.hasError) {
              return Text(snapshot.error.toString());
            } else if (snapshot.hasData) {
              List<dynamic> listReasons = snapshot.data;
              List<WakeUpReason> listWakeUpReason = listReasons
                  .map((element) =>
                      element["category"] == widget.wakeUpResponse.category
                          ? WakeUpReason(
                              element["name"]!,
                              widget.wakeUpResponse.reason,
                              textDescription,
                              true)
                          : WakeUpReason(
                              element["name"]!, null, textDescription, false))
                  .toList();
              List<Widget> secondTableRow = List<Widget>.from(listWakeUpReason);
              int middleList = (listWakeUpReason.length / 2).round();
              listWakeUpReason.removeRange(middleList, listWakeUpReason.length);
              secondTableRow.removeRange(0, middleList);
              if (listWakeUpReason.length != secondTableRow.length) {
                secondTableRow.add(Container());
              }
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
