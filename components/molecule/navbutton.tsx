import { Button } from "@atom/button";
import { Row } from "@atom/row";
import { TDefaultProps } from "@comptypes/type";

interface NavProps
  extends React.ObjectHTMLAttributes<HTMLDivElement>,
    Omit<TDefaultProps, "className"> {
  text: string;
  onClick?: () => void;
  active?: boolean;
}
export default function Navbutton({
  children,
  text,
  active,
  onClick,
  className,
}: NavProps) {
  return (
    <Row
      className={`cursor-pointer min-w-[85px] text-[#000000] bg-transparent rounded-[18px] border border-slate-200 py-[7px] pl-[11px] pr-[15px] ml-[10px]
    ${active ? "text-blue-500 bg-white" : "bg-white"} ${className}`}
      onClick={onClick}
    >
      <Button as="span" className="text-[1rem] leading-[21px] select-none">
        {text}
      </Button>
      {children}
    </Row>
  );
}
