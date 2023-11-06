import { useCallback, useEffect, useRef, useState } from "react";

const useCountdownTimer = () => {
    const [time, setTime] = useState(0);
    const [previousTime, setPreviousTime] = useState(0); // state variable for previous time
    const intervalRef = useRef<number | NodeJS.Timeout | null>(null);

    const startCountdown = useCallback(() => {
        intervalRef.current = setInterval(() => {
            setTime((preTime) => preTime + 1);
        }, 1000);
    }, [setTime]);

    const resetCountdown = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setPreviousTime(time);
        setTime(0);
    }, [time]);

    // when count down reaches 0, clear the interval
    useEffect(() => {
        if (!time && intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, [time, intervalRef]);

    return { time, previousTime, startCountdown, resetCountdown };
};

export default useCountdownTimer;
