import React from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
// useParams는 URL에서 관심있어 하는 정보를 잡아낼 수 있게 해준다
interface RouteParams {
  [coinId: string]: string;
}

const Coin = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  const { coinId } = useParams<RouteParams>();
  // const { coinId } = useParams<{ coinId: string }>();
  // 비구조화할당 coinId 의 객체를 열면 'coinId: 파라미터' 이므로 coinId로 변수명 통일
  return <div>Coin: {pathname.slice(1)}</div>;
};

export default Coin;
