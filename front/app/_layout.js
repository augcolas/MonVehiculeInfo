import {Slot, useSegments} from "expo-router";
import Navbar from "../components/navbar";
import {Provider} from "../context/Auth";

export default function Layout() {
    return (
        <Provider>
            <Slot />
        </Provider>
    )
}
