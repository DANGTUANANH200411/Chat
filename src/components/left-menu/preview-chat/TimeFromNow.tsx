import React, { useEffect, useState } from "react";
import { timeFromNow } from "../../../utils/dateHelper";

interface Props {
    date: string;
}
function TimeFromNow (props: Props) {
    const [count, setCount] = useState<number>(0)
    useEffect(() => {
        //Implementing the setInterval method
        const interval = setInterval(() => {
            setCount(count + 1);
        }, 1000);
 
        //Clearing the interval
        return () => clearInterval(interval);
    }, [count]);
    return <>{timeFromNow(props.date)}</>
}
export default React.memo(TimeFromNow)