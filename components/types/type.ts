type TDefaultProps = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

type TContainerRender =
  | "div"
  | "section"
  | "main"
  | "article"
  | "header"
  | "footer"
  | "aside"
  | "nav";

type TMSSGoods = {
  goodsNo: number;
  goodsName: string;
  price: number | string;
  brandName: string;
  imageUrl: string;
  linkUrl: string;
  brandLinkUrl: string;
  normalPrice: number | string;
  isSale: true;
  saleRate: number | string;
  isSoldOut: boolean;
  isExclusive: boolean;
};

type TMSSList = {
  list: TMSSGoods[];
};
type TMSSData = {
  data: TMSSList;
};

type TItemImage = TDefaultProps & {
  item: TMSSGoods;
};

export type { TMSSGoods, TMSSList, TMSSData, TItemImage, TDefaultProps, TContainerRender };