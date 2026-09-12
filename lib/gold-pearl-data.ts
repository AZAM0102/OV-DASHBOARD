export type GoldPearlProduct = {
  id: string;
  account: "GOLD PEARL";
  brand: string;
  parentSku: string;
  alternateSkus: string[];
  openingStock: number | null;
};

// Imported from GOLD PEARL DATA(3).xlsx.
// Yellow-highlighted cells in the source sheet are treated as parent SKUs.
// Following non-empty cells in the same source column are their alternate SKUs.
// SKU strings are preserved exactly as supplied by the source sheet.
// The source file does not contain numeric stock quantities, so openingStock is null.
export const goldPearlProducts: GoldPearlProduct[] = [
  { id: "gp-01", account: "GOLD PEARL", brand: "Not supplied", parentSku: 'Wrong duffle-80L', alternateSkus: ['Wrong duffle-80L-blue', 'Wrong duffle-80L-grey', 'Wrong duffle-80L-multi', 'Wrong duffle-80L-BLACK', 'Wrogn-80L-red-M1'], openingStock: null },
  { id: "gp-02", account: "GOLD PEARL", brand: "Not supplied", parentSku: 'Wrong duffle-55L', alternateSkus: ['WR-M1-DFL-NBL', 'WR-M1-DFL-GY', 'WR-M1-DFL-BK', 'WR-M1-DFL-SBL', 'WR-M1-DFL-RD'], openingStock: null },
  { id: "gp-03", account: "GOLD PEARL", brand: "Not supplied", parentSku: 'Wrong TREKKING', alternateSkus: ['WR-TRK-01-SKYBLUE', 'WR-TRK-01-BLK', 'WR-TRK-01-MAROON'], openingStock: null },
  { id: "gp-04", account: "GOLD PEARL", brand: "Not supplied", parentSku: 'Wrong TREKKING BLUE', alternateSkus: ['RED-BLUE-LBG', 'WR-TRK-01-BLUE', 'NBL-ABL-LBG'], openingStock: null },
  { id: "gp-05", account: "GOLD PEARL", brand: "Not supplied", parentSku: 'Wrong TREKKING RED', alternateSkus: ['BK-RED-LBG', 'WR-TRK-01-RED'], openingStock: null },
  { id: "gp-06", account: "GOLD PEARL", brand: "Not supplied", parentSku: '7.1-Khamba 1', alternateSkus: ['7.1-Khamba-Blue', '7.1-Khamba-Purple', '7.1-KHAMBA-BROWN111'], openingStock: null },
  { id: "gp-07", account: "GOLD PEARL", brand: "Not supplied", parentSku: '7.1-Khamba-SKY BLUE', alternateSkus: ['7.1-Khamba-Skyblue', '7-Khamba-Skyblue', '7.1-Khamba-Skyblue11', '7-khamba-xtrapocket-sky'], openingStock: null },
  { id: "gp-08", account: "GOLD PEARL", brand: "Not supplied", parentSku: '7.1-Khamba-Red-1', alternateSkus: ['7.1-Khamba-Maroon', '7.1-Khamba-Maroon-11', '7-Khamba-Maroon'], openingStock: null },
  { id: "gp-09", account: "GOLD PEARL", brand: "Not supplied", parentSku: 'WHITE-PATTI', alternateSkus: ['ww-Purple', 'ww-Skyblue'], openingStock: null },
  { id: "gp-10", account: "GOLD PEARL", brand: "Not supplied", parentSku: '7.1-Khamba', alternateSkus: ['Barfi-Brown', 'Barfi-Purple111', 'Barfi-Blue111'], openingStock: null },
  { id: "gp-11", account: "GOLD PEARL", brand: "Not supplied", parentSku: '7.1-Khamba-RED', alternateSkus: ['Barfi-Orange111', 'Barfi-Maroon111', 'Barfi-Maroon', 'Barfi-Orange'], openingStock: null },
  { id: "gp-12", account: "GOLD PEARL", brand: "Not supplied", parentSku: 'WHITE-PATTI-GREEN', alternateSkus: ['ww-Blue', 'GR-DFL-01111', 'WHPTI-01', 'GR-DFL', 'WHPTI-04', 'DGL-WHGR', 'GR-DFL111', 'GR-DFL-01', 'WHPTI-06', 'WHPTI-02', 'WHPTI-03', 'WHPTI-05'], openingStock: null },
  { id: "gp-13", account: "GOLD PEARL", brand: "Not supplied", parentSku: 'D.DOT', alternateSkus: ['D.DOT-BROWN111', 'D.DOT-BROWN'], openingStock: null },
];
