import { useEffect, useState } from 'react';

import type { AppProps } from 'next/app';

import { AxiosError } from 'axios';

import { apiHealth } from '@/services/common';

const App = ({ Component, pageProps }: AppProps) => {
  const [isHealth, setIsHealth] = useState<boolean>(true);
  const [isNetworkError, setIsNetworkError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 觸發 API 健康狀況 的 API
        const response = await apiHealth();
        // 更新狀態
        setIsHealth(response.data.status);
        setIsNetworkError(false);
      } catch (error) {
        // 更新狀態
        setIsHealth(false);

        /**
         * 網路錯誤格式 (包括 網路斷線、CORS 沒通過等無法連線到 API 的狀況)
         * {
         *   "name": "AxiosError",
         *   "code": "ERR_NETWORK",
         *   "message": "Network Error",
         *   // 其他參數...
         * }
         */
        if (error instanceof AxiosError && error.code === 'ERR_NETWORK') {
          setIsNetworkError(true);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <>API 服務狀態：{isHealth ? '正常' : '異常'}</>
      <br />
      {isNetworkError && '網站維運暫停提供服務'}
    </>
  );
};

export default App;
