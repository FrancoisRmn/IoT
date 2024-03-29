import 'package:flutter/material.dart';
import 'package:front/data/api.dart';
import 'package:front/pages/configuration_page.dart';
import 'package:front/resource/constants.dart';
import 'package:front/resource/globals.dart';

class Appbar extends StatefulWidget implements PreferredSizeWidget {
  final bool hasConfigurationAction;
  final Function()? notifyParent;
  const Appbar({
    Key? key,
    required this.hasConfigurationAction,
    required this.notifyParent
  }) : super(key: key);

  @override
  _AppbarState createState() => _AppbarState();

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}

class _AppbarState extends State<Appbar> {
  @override
  Widget build(BuildContext context) {
    return AppBar(
        centerTitle: true,
        backgroundColor: Theme.of(context).primaryColor,
        title: const Text("WAKUP",
            textScaleFactor: 1.2,
            style: TextStyle(
                fontFamily: 'Roboto-Black', fontWeight: FontWeight.bold)),
        actions: widget.hasConfigurationAction
            ? <Widget>[
                IconButton(
                  icon: const Icon(
                    Icons.settings,
                    color: Colors.white,
                  ),
                  onPressed: () {
                    Navigator.of(context).push(PageRouteBuilder(
                        opaque: false,
                        transitionDuration:
                            const Duration(milliseconds: DURATION_ANIMATION),
                        pageBuilder: (BuildContext context, animation,
                            secondaryAnimation) {
                          return const ConfigurationPage();
                        },
                        transitionsBuilder: (context,
                            Animation<double> animation,
                            secondaryAnimation,
                            Widget child) {
                          return FadeTransition(
                              opacity: animation,
                              child: SlideTransition(
                                position: Tween<Offset>(
                                        begin: Offset(0.0, 1.0),
                                        end: Offset(0.0, 0.0))
                                    .animate(animation),
                                child: child,
                              ));
                        })).then((_) => widget.notifyParent!());
                  },
                ),
              ]
            : <Widget>[
                IconButton(
                  icon: const Icon(
                    Icons.save,
                    color: Colors.white,
                  ),
                  onPressed: () {
                    postWakeUpConfiguration(config!);
                    Navigator.of(context).pop();
                  },
                ),
              ]);
  }
}
