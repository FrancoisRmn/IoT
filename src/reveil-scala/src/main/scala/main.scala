object Main {
	def main(args: Array[String]) = {
		println("test")
	}
}

val connectionSettings = MqttConnectionSettings(
	"tcp://192.168.0.125:1883",
	"/test/message", // (2)
	new MemoryPersistence // (3)
)