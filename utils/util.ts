import { TMSSGoods } from "@comptypes/type";

/**
 * asyncPipe 함수, async 함수를 체이닝하고 결과를 출력한다.
 * @param fns
 * @returns
 */
const asyncPipe = <T, U extends T>(
  ...functions: ((arg: T) => Promise<U>)[]
) => {
  return async (result: U) => {
    for (const func of functions) {
      result = await func(result);
    }
    return result as U;
  };
};

/**
 * pipe 함수, 함수를 체이닝하고 결과를 출력한다.
 * @param fns
 * @returns
 */
const pipe = <T, U extends T>(...functions: ((arg: T) => U)[]) => {
  return (result: U) => {
    for (const func of functions) {
      result = func(result);
    }
    return result as U;
  };
};

const commaFunc = (item: number | string) => {
  return `${item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};
const priceFilter = (item: TMSSGoods[]): TMSSGoods[] => {
  return item.map((item) => {
    item.price = `${commaFunc(item.price)}`;
    item.normalPrice = `${commaFunc(item.normalPrice)}`;
    item.saleRate = `${commaFunc(item.saleRate)}`;
    return item;
  });
};

export { pipe, commaFunc, priceFilter, asyncPipe };