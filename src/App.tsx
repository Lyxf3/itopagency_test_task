import React, {useEffect, useState} from 'react';
import {interval, Subject, takeUntil, timer} from "rxjs"
import './App.css';

function App() {
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);


    useEffect(() => {
        const unsubscribe$ = new Subject();
        interval(1000)
            .pipe(takeUntil(unsubscribe$))
            .subscribe(() => {
                if (timerOn) {
                    setTime(prev => prev + 1000);
                }
            });
        return () => {
            unsubscribe$.next(() => {});
            unsubscribe$.complete();
        };
    }, [timerOn]);
    const startStopTimer = () => {
        setTimerOn(prev => !prev)
    }

    const waitTimer = () => {
        setTimerOn(false)
    }

    const resetTimer = () => {
        setTime(0)
        setTimerOn(false)
    }

    const hour = "hour"
    const minute = "minute"
    const second = "second"
    const timeFormater = (format:string) => {
        let value!:number
        switch (format) {
            case hour:
                value = Math.floor(time / 3600000) % 24
                break
            case minute:
                value = Math.floor(time / 60000) % 60
                break
            case second:
                value = Math.floor(time / 1000) % 60
                break
        }
        return `0${value}`.slice(-2)
        }
    return (
        <div className="app">
            <h2>Stopwatch</h2>
            <div className="display">
            <span>{timeFormater(hour)}:</span>
            <span>{timeFormater(minute)}:</span>
            <span>{timeFormater(second)}</span>
            </div>

            <div className="buttons">
                <button onClick={startStopTimer}>{timerOn ? "Stop" : "Start"}</button>
                <button onDoubleClick={waitTimer}>Wait</button>
                <button onClick={resetTimer} >Reset</button>
            </div>
        </div>
    );
}

export default App;
