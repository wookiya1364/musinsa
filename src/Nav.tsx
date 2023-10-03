import { Column } from "@atom/column";
import { Label } from "@atom/label";
import { Row } from "@atom/row";
import { TMSSGoods } from "@comptypes/type";
import Navbutton from "@molecule/navbutton";
import Search from "@molecule/search";
import React, { useCallback, useRef } from "react";
import { useState } from "react";

interface NavProps {
  onFilterChange: (filters: string[]) => void;
  activeFilters: string[];
}

// 검색키워드에 맞는 상품 리스트
const SearchFilter = React.forwardRef<HTMLDivElement, { data: TMSSGoods[], activeFilters: string[], onFilterChange: (filters: string[]) => void; }>(
  ({ data, activeFilters, onFilterChange }, ref) => {
    return (
      <Column ref={ref} className="overflow-auto">
        {data?.map((item: TMSSGoods, idx: number) => (
          <Column key={idx} 
          className="w-full border-b-[1px] border-slate-200 items-start cursor-pointer"
            onClick={() => {
            const newFilter = [
              ...new Set([...activeFilters, item.goodsName]),
            ];
            onFilterChange(newFilter);
          }}>{item.goodsName}</Column>
        ))}
      </Column>
    );
  }
);

// 검색적용 필터 리스트
const SearchedContainer = ({ activeFilters, onFilterChange }: NavProps) => {
  return (
    <Row className="w-full justify-between mt-[7px] px-[10px]">
      <Row className="flex-wrap">
        {activeFilters.map((item: string, idx: number) => {
          if (item === "검색") return null;
          return (
            <Row
              key={idx}
              onClick={() => {
                const newFilters = [...activeFilters];
                newFilters.splice(idx, 1);
                onFilterChange(newFilters);
              }}
            >
              <Row
                className={`cursor-pointer bg-transparent rounded-[7px] border border-slate-200 py-[2px] px-[10px] ml-[10px]
    text-white bg-blue-500`}
              >
                <Label className="text-[13px]">{item}</Label>
                <Label className="ml-[7px]">X</Label>
              </Row>
            </Row>
          );
        })}
      </Row>
      {activeFilters.length === 0 ? null : (
        <Row className="cursor-pointer" onClick={() => onFilterChange([])}>
          <svg
            width={20}
            height={20}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
          >
            <path d="M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-.7-8.9-4.9-10.3l-56.7-19.5a8 8 0 0 0-10.1 4.8c-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4A344.77 344.77 0 0 1 655.9 829c-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27A341.5 341.5 0 0 1 279 755.2a342.16 342.16 0 0 1-73.7-109.4c-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27a341.5 341.5 0 0 1 109.3 73.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 0 0 3 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c-.1-6.6-7.8-10.3-13-6.2z" />
          </svg>
        </Row>
      )}
    </Row>
  );
};

export default function Navigation({
  onFilterChange,
  activeFilters,
}: NavProps) {
  const searchRef = useRef<HTMLInputElement>(null);
  const searchedFilterRef = useRef<HTMLDivElement>(null);
  const [filteredData, setFilteredData] = useState<TMSSGoods[]>([]);
  const visibleSearchedFilter = useCallback(() => {
    searchedFilterRef.current?.classList.remove("hidden");
    searchedFilterRef.current?.classList.add("block");
  }, []);
  const invisibleSearchedFilter = useCallback(() => {
    searchedFilterRef.current?.classList.remove("block");
    searchedFilterRef.current?.classList.add("hidden");
  }, []);

  const handleButtonClick = (filter: string) => {
    // 클릭된 버튼 활성화 여부 확인
    const isFilterActive = activeFilters.includes(filter);
    let newFilters: string[] = [];

    if (isFilterActive) {
      // 클릭된 버튼이 이미 활성화되어 있다면 해당 필터를 제거
      newFilters = activeFilters.filter((f) => f !== filter);
      invisibleSearchedFilter();
    } else {
      // 클릭된 버튼이 활성화되어 있지 않다면 해당 필터를 추가
      newFilters = [...activeFilters, filter];
    }

    // 필터적용
    onFilterChange(newFilters);
  };

  const isSearch = activeFilters.findIndex((filter) => filter === "검색");

  return (
    <Column className="w-full py-[5px] overflow-auto">
      <Row
        as="nav"
        role="navigation"
        className="w-full text-[2rem] h-auto justify-start"
      >
        <Navbutton
          text="검색"
          className="min-w-[90px]"
          onClick={() => {
            handleButtonClick("검색");
            setTimeout(() => {
              searchRef.current?.focus();
            }, 0)
          }}
          active={activeFilters.includes("검색")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            viewBox="0 0 50 50"
            className="pl-[10px]"
          >
            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
          </svg>
        </Navbutton>
        <Navbutton
          text="세일상품"
          onClick={() => handleButtonClick("세일상품")}
          active={activeFilters.includes("세일상품")}
        />
        <Navbutton
          text="단독상품"
          onClick={() => handleButtonClick("단독상품")}
          active={activeFilters.includes("단독상품")}
        />
        <Navbutton
          text="품절포함"
          onClick={() => handleButtonClick("품절포함")}
          active={activeFilters.includes("품절포함")}
        />
      </Row>
      {isSearch === -1 ? null : (
        <Row className="w-full bg-slate-200 p-[5px] mt-[5px]">
          <Search
            ref={searchRef}
            text="상품명 검색"
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
              const { value } = e.currentTarget;
              const data = JSON.parse(localStorage.getItem("origindata") || "");
              const filter = data?.filter((item: TMSSGoods) => {
                if (value.trim() === "") return false;
                return item.goodsName.includes(value);
              });
              setFilteredData(filter);
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              visibleSearchedFilter();
              if (e.key === "Enter") {
                invisibleSearchedFilter();
                const newFilter = [
                  ...new Set([...activeFilters, e.currentTarget.value]),
                ];
                onFilterChange(newFilter);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              viewBox="0 0 70 70"
              className="mt-[5px]"
            >
              <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
            </svg>
          </Search>
        </Row>
      )}
      <SearchFilter ref={searchedFilterRef} data={filteredData} activeFilters={activeFilters} onFilterChange={onFilterChange}/>
      <SearchedContainer
        activeFilters={activeFilters}
        onFilterChange={onFilterChange}
      />
    </Column>
  );
}
