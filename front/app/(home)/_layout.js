import {Slot, useSegments} from "expo-router";
import Navbar from "../../components/navbar";
import {Provider} from "../../context/Auth";

export default function Layout() {
    const segments = useSegments()[1];
    return (
        <>
            <Slot />
            <Navbar route={segments}></Navbar>
        </>
    )
}
