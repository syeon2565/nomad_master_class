import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
// useParams는 URL에서 관심있어 하는 정보를 잡아낼 수 있게 해준다
interface RouteParams {
  [coinId: string]: string;
}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: cetner;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.div`
  text-align: center;
  dispaly: block;
`;

const Coin = () => {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const { coinId } = useParams<RouteParams>();
  // url 주소에 data를 포함하였을 경우 useParams() hook을 통해 data를 확보할 수 있다!
  // const { coinId } = useParams<{ coinId: string }>();
  // 비구조화할당 coinId 의 객체를 열면 'coinId: 파라미터' 이므로 coinId로 변수명 통일
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();

      setInfo(infoData);
      setPriceInfo(priceData);
    })();
  }, []);
  return (
    <div>
      <Header>
        <Title>{pathname.slice(1)}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <span>{priceInfo?.quotes.USD.ath_date}</span>
      )}
      {/* typescript에서는 타입을 다 지정해주어야한다. 즉 interface로 info와 price의 데이터값의 타입을 명시 해주어야함! */}
    </div>
  );
};

export default Coin;
