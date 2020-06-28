import React, { useState, useMemo } from "react";
const UseMemoPage = () => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");
  const expensive = useMemo(() => {
    console.log("compute new");
    let sum = 0;
    for (let i = 0; i < count; i++) sum += i;
    return sum;
  }, [count, value]); //优化项数组
  return (
    <div>
      <h3>UseMemoPage</h3>
      <p>{count}</p>
      <p>{expensive}</p>
      <button onClick={() => setCount(count + 1)}>click</button>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
};

export default UseMemoPage;
