import sbt._

object Dependencies {

	val AkkaVersion = "2.6.14"

	val dependencies = List (
		//"com.github.hyjay" %% "scala-mqtt-client" % "0.1.0",
		//"com.softwaremill.sttp.client3" %% "core" % "3.3.16",
		"com.lightbend.akka" %% "akka-stream-alpakka-mqtt" % "3.0.3",
		"com.typesafe.akka" %% "akka-stream" % AkkaVersion
	)
}