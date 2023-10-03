import { Column } from "@atom/column";
import { Label } from "@atom/label";
import { Row } from "@atom/row";
import { TContainerRender, TDefaultProps, TItemImage } from "@comptypes/type";
import React, { useCallback, useState } from "react";

export interface ItemProps extends React.ObjectHTMLAttributes<HTMLDivElement> {
  as?: TContainerRender;
}

const Itemlist = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ children, as, className, ...props }, ref) => {
    const render = as || "article";
    return (
      <Column
        {...props}
        as={render}
        className={className}
        ref={ref}
        // role="Itemlist"
        // aria-orientation="horizontal"
        // aria-label="Itemlist"
      >
        {children}
      </Column>
    );
  }
);

const SkeletonImage = ({ isSoldOut }: { isSoldOut: boolean }) => {
  return (
    <>
      {isSoldOut ? (
        <Row className="w-[45vw] max-w-[500px] h-[45vw] max-h-[500px] overflow-hidden">
          <Row className="w-full h-full img-skeleton">
            <Label className="flex w-[45%] justify-center absolute text-[20px] leading-[22px] text-[#777777]">
              SOLD OUT
            </Label>
          </Row>
        </Row>
      ) : (
        <Row className="w-[45vw] max-w-[500px] h-[45vw] max-h-[500px] overflow-hidden">
          <Row className="w-full h-full img-skeleton"></Row>
        </Row>
      )}
    </>
  );
};

const ImageLoader = ({ className, item }: TItemImage) => {
  const [isLoading, setIsLoading] = useState(true);
  const handleErrorImage = useCallback(
    (el: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const img = el.target as HTMLImageElement;
      return (img.src =
        "https://image.msscdn.net/musinsaUI/homework/data/img.jpg");
    },
    []
  );

  return (
    <>
      {isLoading ? <SkeletonImage isSoldOut={item.isSoldOut} /> : null}
      {item.isSoldOut ? (
        <Row className="justify-center">
          {isLoading ? null : (
            <Label className="absolute text-[20px] leading-[22px] text-[#777777]">
              SOLD OUT
            </Label>
          )}

          <img
            className={`opacity-30 ${className}`}
            src={item.imageUrl}
            alt={item.goodsName}
            onError={handleErrorImage}
            onLoad={() => {
              setIsLoading(false);
            }}
          />
        </Row>
      ) : (
        <img
          className={className}
          src={item.imageUrl}
          alt={item.goodsName}
          onError={handleErrorImage}
          onLoad={() => {
            setIsLoading(false);
          }}
        />
      )}
    </>
  );
};

const ItemImage = ({ children, className, item }: TItemImage) => {
  if (!item) {
    return null;
  }

  return (
    <Column>
      <Column
        className="w-full overflow-hidden cursor-pointer h-[50vw] max-w-[500px] max-h-[500px]"
        onClick={() => window.open(item.linkUrl)}
      >
        <ImageLoader item={item} className={className} />
      </Column>
      {item.isExclusive ? (
        <Row className="w-full relative top-[-10px] left-[10px] items-start">
          <Label
            as="span"
            className="rounded-[2px] py-[4px] px-[6px] text-white text-[12px] leading-[18px] font-normal bg-[#18A286]"
          >
            단독
          </Label>
        </Row>
      ) : (
        // invisible 넣어야 단독상품이 아니여도 공간을 차지해서 같은 위치에 나타낼 수 있음.
        <Row className="w-full relative top-[-10px] left-[10px] items-start invisible">
          <Label
            as="span"
            className="rounded-[2px] py-[4px] px-[6px] text-white text-[12px] leading-[18px] font-normal bg-[#18A286]"
          >
            단독
          </Label>
        </Row>
      )}
      {children}
    </Column>
  );
};

const ItemBrandName = ({
  children,
  onClick,
}: Omit<TDefaultProps, "className">) => {
  return (
    <Label
      className="cursor-pointer font-normal text-[0.9rem] leading-[16px] text-[#000000]"
      onClick={onClick}
    >
      {children}
    </Label>
  );
};
const ItemGoodsName = ({
  children,
  onClick,
}: Omit<TDefaultProps, "className">) => {
  return (
    <Label
      className="cursor-pointer h-[4vh] max-text-line font-bold text-[1rem] leading-[18px] text-[#000000]"
      onClick={onClick}
    >
      {children}
    </Label>
  );
};

const ItemPriceContainer = ({
  item,
}: Omit<TItemImage, "className" | "children">) => {
  return (
    <Column className="w-full items-start">
      <Row className="w-full justify-between">
        <Label className="font-bold text-[1.1rem] leading-[24px]">
          {item.price}원
        </Label>
        {item.isSale ? (
          <Label className="font-medium text-[0.8rem] leading-[24px] text-[#ff0000]">
            {item.saleRate}%
          </Label>
        ) : null}
      </Row>
      {item.isSale ? (
        <Label className="line-through font-medium text-[0.8rem] leading-[11.55px] text-[#AAAAAA]">
          {item.normalPrice}원
        </Label>
      ) : (
        <Label className="line-through font-medium h-[0.8rem] leading-[11.55px] text-[#AAAAAA]" />
      )}
    </Column>
  );
};

const ItemDescript = ({ children, className }: TDefaultProps) => {
  return <Column className={className}>{children}</Column>;
};

Itemlist.displayName = "Itemlist";

export {
  Itemlist,
  ItemImage,
  ItemDescript,
  ItemBrandName,
  ItemGoodsName,
  ItemPriceContainer,
  SkeletonImage,
};
