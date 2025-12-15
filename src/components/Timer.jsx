import { useEffect } from "react";

export default function Timer({ time, onFinish }) {
    useEffect(() => {
        if (time === 0) {
            onFinish();
            return;
        }
        const timer = setInterval(() => {
            onFinish(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [time, onFinish]);

    return (
        <div className="text-sm text-gray-600">
            ⏱ {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
        </div>
    );
}
