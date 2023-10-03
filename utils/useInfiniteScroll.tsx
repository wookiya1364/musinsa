import { TMSSGoods } from "@comptypes/type";
import { useEffect, useState } from "react";

const useInfiniteScroll = () => {
  const [data, setData] = useState<TMSSGoods[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [page, setPage] = useState<number>(0);

  const fetchData = async (pageNumber: number, hasError: boolean) => {
    try {
      //에러가 아니면 요청 가능
      if (!hasError) {
        setLoading(true);
        const response = await fetch(
          `https://static.msscdn.net/musinsaUI/homework/data/goods${pageNumber}.json`
        );

        // 404 에러 처리
        if (response.status === 404) {
          setHasError(true);
          throw new Error("더이상 보여드릴 상품이 없어요.");
        }

        const result = await response.json();
        const newData = result?.data?.list || [];
        if (newData.length === 0) {
          setHasMore(false);
        } else {
          setData((prevData) => [...prevData, ...newData]);
          setPage(pageNumber + 1);
        }
      }
    } catch (error) {
      setErrorMsg(`${error}`.replace("Error: ", ""));
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  // 초기 로딩 시 한 번만 데이터 로드
  useEffect(() => {
    fetchData(0, hasError);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 무한 스크롤 데이터 추가 로드
  const fetchMoreData = () => {
    fetchData(page, hasError);
  };

  return { data, loading, hasMore, hasError, errorMsg, fetchMoreData, setHasError };
};

export default useInfiniteScroll;
