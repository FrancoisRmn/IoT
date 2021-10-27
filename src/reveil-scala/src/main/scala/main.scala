import com.github.hyjay.mqtt.core._
import com.github.hyjay.mqtt.netty.NettyMqttClient

import scala.concurrent.Await
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration.DurationInt

object Main {
	def main(args: Array[String]): Unit = {
		MQTTConnection()
		System.exit(0)
	}

	private def MQTTConnection(): Unit = {
		val client  = new NettyMqttClient("192.168.0.125", 1883, tls = false)

		val TOPIC = "test/message"

		val result = for {
			_ <- client.connect(CONNECT("CLIENT_ID"))
			_ = client.send(SUBSCRIBE(Seq((TOPIC, 0))))
			suback <- client.pull()
			pub <- client.pull()
		} yield pub

		val receivedResult = Await.result(result, 15.seconds)

		convertToInt(receivedResult)

		client.send(DISCONNECT())
	}

	private def convertToInt(receivedResult: Packet): Unit = {
		// PUBLISH(test/message,WrappedArray(56, 32, 49, 49, 32, 49, 50, 32, 56, 32, 49, 49, 32, 49, 50, 32),-1,false,0,false)

		//Utilisation d'une regex pour garder que les données
		val dataPattern = "((\\d{2}, )+)".r

		//On ne garde que les chiffres sous la forme :
		// 56, 32, 49, 49, 32, 49, 50, 32, 56, 32, 49, 49, 32, 49, 50,
		val dataAscii = (dataPattern findAllIn receivedResult.toString).mkString(",")

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

		val numberPattern = "(\\d)".r
		val numbersClean = (numberPattern findAllIn numbers.toString).mkString(",")

		val data = numbersClean.split(",")

		println(data.mkString(","))
	}
}
