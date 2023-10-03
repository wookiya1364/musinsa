import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./Header.tsx";
import Navigaion from "./Nav.tsx";
import { Column } from "@atom/column.tsx";
import App from "./App.tsx";

export default function Main() {
  // 검색 필터
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // 필터 변경 호출 함수
  const handleFilterChange = (newFilters: string[]) => {
    setActiveFilters(newFilters);
  };

  return (
    <React.Fragment>
      <Column className="sticky top-0 z-[1] bg-white">
        <Header></Header>
        <Navigaion
          onFilterChange={handleFilterChange}
          activeFilters={activeFilters}
        />
        <Column className="w-full bg-slate-200 h-[10px]" />
      </Column>
      <App activeFilters={activeFilters} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
