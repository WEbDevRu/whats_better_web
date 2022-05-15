export const isExponentTwo = (num:number) => !(num & (num - 1)) && num != 0;
