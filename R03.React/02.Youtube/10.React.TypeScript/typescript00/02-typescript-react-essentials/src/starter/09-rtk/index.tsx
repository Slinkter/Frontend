import { useAppSelector, useAppDispathch } from "../../hooks";
import {
    increment,
    decrement,
    reset,
    setStatus,
} from "../../final/09-rtk/counterSlice";

function Component() {
    const { count, status } = useAppSelector((state) => state.counter);
    const dispatch = useAppDispathch();

    return (
        <div>
            <h2>Count: {count}</h2>
            <h2>Status: {status}</h2>

            <div className="btn-container">
                <button onClick={() => dispatch(increment())} className="btn">
                    Increment
                </button>
                <button onClick={() => dispatch(decrement())} className="btn">
                    Decrement
                </button>
                <button onClick={() => dispatch(reset())} className="btn">
                    Reset
                </button>
            </div>
            <div className="btn-container">
                <button
                    onClick={() => dispatch(setStatus("active"))}
                    className="btn"
                >
                    Set Status to Active
                </button>
                <button
                    className="btn"
                    onClick={() => dispatch(setStatus("inactive"))}
                >
                    Set Status to Inactive
                </button>
            </div>
        </div>
    );
}
export default Component;
