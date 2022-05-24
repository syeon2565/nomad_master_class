import React from "react";
import { useParams } from "react-router";
// useParams는 URL에서 관심있어 하는 정보를 잡아낼 수 있게 해준다
interface RouteParams {
  [coinId: string]: string;
}

const Coin = () => {
  const { coinId } = useParams<RouteParams>();
  // const { coinId } = useParams<{ coinId: string }>();
  // 비구조화할당 coinId 의 객체를 열면 'coinId: 파라미터' 이므로 coinId로 변수명 통일
  return <div>Coin: {coinId}</div>;
};

export default Coin;
