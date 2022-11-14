import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrement,
  increment,
  incrementAsyncExecutor,
} from 'src/store/counter';

export default function Counter() {
  const [selectValue, setSelectValue] = useState(1);

  const { counter, pending } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(incrementAsyncExecutor(selectValue));
    // dispatch(a(selectValue));
  };

  return (
    <>
      <div className="flex column items-center ml-40 mt-20">
        <h2>{counter}</h2>
        <div className="flex items-center mt-20">
          <button onClick={() => dispatch(increment())}>+</button>
          <button onClick={() => dispatch(decrement())}>-</button>
        </div>
      </div>
      <div className="ml-40 mt-20">
        <select
          style={{ width: 100 }}
          value={selectValue}
          onChange={(e) => setSelectValue(Number(e.target.value))}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </select>
        <button onClick={onSubmit}>Submit</button>
        {pending && <div>Pending...</div>}
      </div>
    </>
  );
}
