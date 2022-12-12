import { decreaseAsync, increaseAsync } from "../modules/counter";
import Counter from "../components/Counter";
import { connect } from "react-redux";

const CounterContainer = ({ number, increaseAsync, decreaseAsync }) => {
  return (
    <Counter
      number={number}
      onIncrease={increaseAsync}
      onDecrease={decreaseAsync}
    />
  );
};

//redux로부터 state를 받아오고, redux store에 action dispatch -> redux store와 연동된 컴포넌트
export default connect((state) => ({ number: state.counter }), {
  increaseAsync,
  decreaseAsync,
})(CounterContainer);
