import { Map } from "./components/Map"
import io from "socket.io-client"
import { useEffect } from "react"
import { socket } from "./helpers/initIO"
import { useDispatch } from "react-redux"
import { setEventKind, setPinEvents } from "./redux/slices/markerPinsSlice"

function App() {
	const dispatch = useDispatch()
	useEffect(() => {
		socket.on("out_coordinates_events", (payload) => {
			console.log(payload)
			dispatch(setPinEvents(payload))
		})
	}, [])

	return (
		<div className="w-screen h-screen relative">
			<div className="absolute top-0 right-0 flex z-[1000] p-8">
				<div
					className="bg-white mr-4 px-4 py-2 rounded border-gray-300 border shadow"
					onClick={() => dispatch(setEventKind("fire"))}
				>
					Pin 1
				</div>
				<div
					className="bg-white px-4 py-2 rounded border-gray-300 border shadow"
					onClick={() => dispatch(setEventKind("water"))}
				>
					Pin 2
				</div>
			</div>
			<Map />
		</div>
	)
}

export default App
