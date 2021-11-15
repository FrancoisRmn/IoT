import akka.actor.ActorSystem
import akka.stream._
import akka.Done
import akka.stream.alpakka.mqtt.{MqttConnectionSettings, MqttMessage, MqttQoS, MqttSubscriptions}
import akka.stream.alpakka.mqtt.scaladsl.MqttSource
import akka.stream.scaladsl.{Keep, Sink, Source}
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence

import scala.concurrent.duration.{Duration, SECONDS}
import scala.concurrent.{Await, Future}


object Main {
	def main(args: Array[String]): Unit = {
		MQTTConnection()
		System.exit(0)

	}

	private def MQTTConnection(): Unit = {
		val connectionSettings = MqttConnectionSettings(
			"tcp://192.168.0.125:1883", // (1)
			"test-scala-client", // (2)
			new MemoryPersistence // (3)
		)


		val mqttSource: Source[MqttMessage, Future[Done]] =
			MqttSource.atMostOnce(
				connectionSettings.withClientId(clientId = "scala"),
				MqttSubscriptions("test/message", MqttQoS.AtLeastOnce),
				bufferSize = 16
			)

		implicit val system: ActorSystem = ActorSystem("reveil")
		implicit val materializer: ActorMaterializer = ActorMaterializer()

		val (_, result) = mqttSource
			.take(1)
			.toMat(Sink.seq)(Keep.both)
			.run()

		Await.ready(result, Duration(30, SECONDS))

		val index = convertToInt(result.toString)

		println(index)
		//todo websocket pour renvoyer index
	}

	private def convertToInt(receivedResult: String): Int = {
		// PUBLISH(test/message,WrappedArray(56, 32, 49, 49, 32, 49, 50, 32, 56, 32, 49, 49, 32, 49, 50, 32),-1,false,0,false)

		//Utilisation d'une regex pour garder que les données
		val dataPattern = "((\\d{2}, )+)".r

		//On ne garde que les chiffres sous la forme :
		// 56, 32, 49, 49, 32, 49, 50, 32, 56, 32, 49, 49, 32, 49, 50,
		val dataAscii = (dataPattern findAllIn receivedResult).mkString(",")

		//On supprime la dernière virgule
		val cleanDataAscii = dataAscii.slice(0, dataAscii.length - 2).replaceAll("\\s", "")

		val asciiCar = cleanDataAscii.split(",")

		val numbers = for {
			i <- List.range(0, asciiCar.length)
			data = asciiCar(i) match {
				case "32" => " "
				case "48" => "0"
				case "49" => "1"
				case "50" => "2"
				case "51" => "3"
				case "52" => "4"
				case "53" => "5"
				case "54" => "6"
				case "55" => "7"
				case "56" => "8"
				case "57" => "9"
			}
		} yield data

		val values = numbers.mkString("").split(" ").toList

		if (values(4).toInt < 15 && values(5).toInt < 25)
			1
		else if (values(4).toInt < 30 && values(5).toInt < 50)
			2
		else if (values(4).toInt < 55 && values(5).toInt < 90)
			3
		else if (values(4).toInt < 110 && values(5).toInt < 180)
			4
		else 5
	}
}
