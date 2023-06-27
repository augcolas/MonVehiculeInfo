import {Slot, useSegments} from "expo-router";
import {AuthProvider} from "../../context/AuthContext";
import Navbar from "../../components/navbar";

export default function Layout() {
    const segments = useSegments()[0];
    return (
        <>
            <Slot />
            <Navbar route={segments}></Navbar>
        </>
    )
}
