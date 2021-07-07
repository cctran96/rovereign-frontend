import { useEffect } from "react"

export const useKeyDown = fn => {
    useEffect(() => {
        window.addEventListener("keydown", fn)
        return () => window.removeEventListener("keydown", fn)
    }, [fn])
}

export const useKeyUp = fn => {
    useEffect(() => {
        window.addEventListener("keyup", fn)
        return () => window.removeEventListener("keyup", fn)
    }, [fn])
}