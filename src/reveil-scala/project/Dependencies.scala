import sbt._

object Dependencies {

	val AkkaVersion = "2.6.17"

	val dependencies = Seq (
		"com.lightbend.akka" %% "akka-stream-alpakka-mqtt" % "3.0.3",
		"com.typesafe.akka" %% "akka-stream" % AkkaVersion,
		"com.lihaoyi" %% "cask" % "0.8.0"
	)
}