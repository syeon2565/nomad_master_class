import { useState } from "react";
import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 1px solid ${(props) => props.borderColor};
`;
interface CircleProps {
  bgColor: string;
  borderColor?: string;
}

function Circle({ bgColor, borderColor }: CircleProps) {
  // bgColor의 타입은 CircleProps의 Object이다!
  //타입스크립트의 초기값을 가지고 counter이 number 타입이라고 추측!
  const [value, setValue] = useState<number | string>(0);
  setValue("hello");
  setValue(2);
  return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor} />;
}
//위와 같은 코드임!
// function Circle({ props }: CircleProps) {
//   return <Container bgColor={props.bgColor} />;
// }

export default Circle;
