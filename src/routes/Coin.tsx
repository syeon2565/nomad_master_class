import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
// useParams는 URL에서 관심있어 하는 정보를 잡아낼 수 있게 해준다
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import Price from './Price';
import Chart from './Chart';
import { fetchCoinInfo, fetchCoinTickers } from './api';

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
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  a {
    display: block;
  }
`;
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
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

function Coin() {
  const { pathname } = useLocation();
  const { coinId } = useParams<RouteParams>();
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(['info', coinId], () => fetchCoinInfo(coinId!));
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(['tickers', coinId], () =>
    fetchCoinTickers(coinId!)
  );
  // url 주소에 data를 포함하였을 경우 useParams() hook을 통해 data를 확보할 수 있다!
  // const { coinId } = useParams<{ coinId: string }>();
  // 비구조화할당 coinId 의 객체를 열면 'coinId: 파라미터' 이므로 coinId로 변수명 통일
  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<InfoData>();
  // const [priceInfo, setPriceInfo] = useState<PriceData>();
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
  //     const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();

  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, [coinId]);
  const loading = infoLoading || tickersLoading;
  return (
    <div>
      <Header>
        <Title>{pathname.slice(1)}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{infoData?.open_source ? 'Yes' : 'No'}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          {/* <Tabs>
            <Tab>
              <Link to="/chart">Chart</Link>
            </Tab>
            <Tab>
              <Link to="/price">Price</Link>
            </Tab>
          </Tabs>
          <Routes>
            <Route path="/coinId" element={<Coin />}>
              <Route path="/price" element={<Price />} />
              <Route path="/chart" element={<Chart />} />
            </Route>
          </Routes> */}
        </>
      )}
      {/* typescript에서는 타입을 다 지정해주어야한다. 즉 interface로 info와 price의 데이터값의 타입을 명시 해주어야함! */}
    </div>
  );
}

export default Coin;
