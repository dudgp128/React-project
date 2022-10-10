import { useCallback, useMemo, useState, useRef } from "react";

function getAverage(numbers) {
  console.log("계산중");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  console.log("sum : ", sum);
  return sum / numbers.length;
}
const Average = () => {
  const [number, setNum] = useState(0);
  const [list, setList] = useState([]);

  const InputEL = useRef(null);

  const onChange = useCallback((e) => {
    setNum(e.target.value);
  }, []);

  const onInsert = useCallback(() => {
    const newList = list.concat(parseInt(number));
    setList(newList);
    setNum("");
    InputEL.current.focus();
  }, [number, list]);

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <>
      <input onChange={onChange} ref={InputEL} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((e, i) => (
          <li key={i}>{e}</li>
        ))}
      </ul>
      <p>평균값 : {avg}</p>
    </>
  );
};

export default Average;
