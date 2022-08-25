/**
 * the function format a number to the US format with coma every three figures
 * @Params number (eg: 1930)
 * @return string: the number formatted (1,930)
 **/
export function formateNumber(number) {
  return new Intl.NumberFormat("en-US").format(number);
}
