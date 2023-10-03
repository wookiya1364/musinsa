import { Row } from "@atom/row";
import {
  ItemBrandName,
  ItemDescript,
  ItemGoodsName,
  ItemImage,
  ItemPriceContainer,
  Itemlist,
} from "@molecule/Itemlist";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Column } from "@atom/column";
import { Label } from "@atom/label";
import useInfiniteScroll from "../utils/useInfiniteScroll";
import { TMSSGoods } from "@comptypes/type";
import { pipe, priceFilter } from "@utils/util";
import React from "react";

interface AppProps {
  activeFilters: string[];
}

const App = React.memo(({ activeFilters }: AppProps) => {
  const pageEndRef = useRef<HTMLDivElement>(null);
  const {
    data,
    loading,
    hasMore,
    hasError,
    errorMsg,
    fetchMoreData,
    setHasError,
  } = useInfiniteScroll();

  localStorage.setItem("origindata", JSON.stringify(data));

  const visibleLoader = useCallback(() => {
    // debugger
    pageEndRef.current?.classList.remove("invisible");
    pageEndRef.current?.classList.add("visible");
  }, []);

  const invisibleLoader = useCallback(() => {
    pageEndRef.current?.classList.remove("visible");
    pageEndRef.current?.classList.add("invisible");
  }, []);

  const saleFilter = useCallback(
    (item: TMSSGoods[]): TMSSGoods[] => {
      const isSale = activeFilters.findIndex((filter) => {
        if (filter === "세일상품") return true;
        return false;
      });

      if (isSale === -1) {
        return item;
      }
      return item.filter((item) => {
        if (!item.isSale) return false;
        return true;
      });
    },
    [activeFilters]
  );

  const exclusiveFilter = useCallback(
    (item: TMSSGoods[]): TMSSGoods[] => {
      const isExclusive = activeFilters.findIndex((filter) => {
        if (filter === "단독상품") return true;
        return false;
      });

      if (isExclusive === -1) {
        return item;
      }
      return item.filter((item) => {
        if (!item.isExclusive) return false;
        return true;
      });
    },
    [activeFilters]
  );

  const soldOutFilter = useCallback(
    (item: TMSSGoods[]): TMSSGoods[] => {
      const isSoldOut = activeFilters.findIndex((filter) => {
        if (filter === "품절포함") return true;
        return false;
      });

      //품절포함이 안되어 있으면
      if (isSoldOut === -1) {
        //품절상품은 표시하지 않는다.
        return item.filter((item) => {
          if (item.isSoldOut) return false;
          return true;
        });
      }

      //품절포함이 되어있으면
      return item;
    },
    [activeFilters]
  );

  const searchWordFilter = useCallback(
    (item: TMSSGoods[]): TMSSGoods[] => {
      const isSearchWord = activeFilters.filter((filter) => {
        if (
          filter !== "검색" &&
          filter !== "세일상품" &&
          filter !== "단독상품" &&
          filter !== "품절포함"
        )
          return true;
        return false;
      });
      if (isSearchWord.length === 0) {
        return item;
      }

      return item.filter((goods) => {
        return isSearchWord.some((searchWord) =>
          goods.goodsName.includes(searchWord)
        );
      });
    },
    [activeFilters]
  );

  const observerOptions = useMemo(() => {
    return { threshold: 0.9, rootMargin: "0px 0px 70px 0px" };
  }, []);

  // IntersectionObserver로 페이지 하단 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loading && hasMore) {
            // 페이지 하단에 도달하면 데이터 더 불러오기 & 프로그래스바 감추기
            invisibleLoader();
            fetchMoreData();
          } else {
            //하단이 아니면 프로그래스바 노출 & 에러 false로 바꿔서 HTTP API 요청을 더 할수 있도록 변경
            visibleLoader();
            setHasError(false);
          }
        });
      },
      observerOptions
    );

    if (pageEndRef.current) {
      observer.observe(pageEndRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [
    pageEndRef,
    loading,
    hasMore,
    fetchMoreData,
    observerOptions,
    setHasError,
    visibleLoader,
    invisibleLoader,
  ]);

  // 현재 필터링된 데이터
  const filteredData = pipe(
    searchWordFilter,
    priceFilter,
    saleFilter,
    exclusiveFilter,
    soldOutFilter
  )(data);

  // console.log(filteredData);

  return (
    <Column as="article" className="w-full justify-center overflow-x-hidden">
      <Itemlist
        as="section"
        className="w-full justify-items-center justify-center grid grid-flow-dense gap-y-[30px] gap-x-[15px] grid-cols-2"
      >
        {filteredData?.map((item, idx: number) => (
          <ItemImage
            key={`${item.goodsNo}_${idx}`}
            item={item}
            className="w-[45vw] max-w-[500px]"
          >
            <ItemDescript className="w-full items-start py-[20px] px-[10px] break-all">
              <ItemBrandName onClick={() => window.open(item.brandLinkUrl)}>
                {item.brandName}
              </ItemBrandName>
              <ItemGoodsName onClick={() => window.open(item.linkUrl)}>
                {item.goodsName}
              </ItemGoodsName>
              <ItemPriceContainer item={item} />
            </ItemDescript>
          </ItemImage>
        ))}
      </Itemlist>
      <Row ref={pageEndRef} className="w-full h-[70px] justify-center visible">
        <Label as="span" className="loader text-[1.5rem]" />
      </Row>
      {hasError ? (
        <Row className="w-full justify-center mb-[15px] p-[10px] bg-slate-200">
          <Label as="p">{errorMsg}</Label>
        </Row>
      ) : null}
    </Column>
  );
});

export default App;
