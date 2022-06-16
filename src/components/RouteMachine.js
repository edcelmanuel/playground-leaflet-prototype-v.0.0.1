import L from "leaflet"
import { createControlComponent } from "@react-leaflet/core"
import "leaflet-routing-machine"
import { useSelector } from "react-redux"

const createRoutineMachineLayer = ({ pin1, pin2 }) => {
	// const pin1 = useSelector((state) => state.markerPins.pin1)
	// const pin2 = useSelector((state) => state.markerPins.pin2)

	const instance = L.Routing.control({
		waypoints: [L.latLng(pin1), L.latLng(pin2)],
		lineOptions: {
			styles: [
				{ color: "black", opacity: 0.15, weight: 9 },
				{ color: "white", opacity: 1, weight: 6 },
				{ color: "blue", opacity: 1, weight: 2 },
			],
		},
		show: false,
		addWaypoints: false,
		routeWhileDragging: true,
		draggableWaypoints: true,
		fitSelectedRoutes: true,
		showAlternatives: false,
	})

	return instance
}

const RouteMachine = createControlComponent(createRoutineMachineLayer)

export default RouteMachine
