import { Row } from "@atom/row";
import React from "react";

interface NavProps
  extends React.ObjectHTMLAttributes<HTMLInputElement> {
  text: string;
  children: React.ReactNode;
  onClick?: () => void;
  onKeyUp?: (e:any) => void;
  onKeyDown?: (e:any) => void;
}

const Search = React.forwardRef<HTMLInputElement, NavProps>(
    ({ children, text, onClick, onKeyUp, onKeyDown }: NavProps, ref) => {
  return (
    <Row
      className={`cursor-pointer w-full bg-white text-[#000000] border border-slate-200 py-[5px] px-[15px]
    `}
      onClick={onClick}
    >
      {children}
      <input
        ref={ref}
        className="w-full text-[1rem] leading-[21px] bg-transparent"
        placeholder={text}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
      ></input>
    </Row>
  );
});

export default Search