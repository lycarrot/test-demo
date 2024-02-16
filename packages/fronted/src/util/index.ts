export function formatNumberWithCommas(value:number) {
  if(!value)return
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
