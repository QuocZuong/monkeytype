import { useCallback, useEffect, useRef, useState } from "react";

const useCountdownTimer = (seconds: number) => {
    const [time, setTime] = useState(seconds);
    const intervalRef = useRef<number | NodeJS.Timeout | null>(null);

    const startCountdown = useCallback(() => {
        intervalRef.current = setInterval(() => {
            setTime((preTime) => preTime - 1);
        }, 1000);
    }, [setTime]);

    const resetCountdown = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        setTime(seconds);
    }, [seconds]);

    // when count down reaches 0, clear the interval
    useEffect(() => {
        if (!time && intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, [time, intervalRef]);

    return { time, startCountdown, resetCountdown };
};

export default useCountdownTimer;
