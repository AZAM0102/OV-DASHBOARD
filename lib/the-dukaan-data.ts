export type TheDukaanProduct = {
  id: string;
  account: "THE DUKAAN";
  brand: string;
  parentSku: string;
  alternateSkus: string[];
  openingStock: number | null;
};

// Imported from THE DUKAAN DATA(4).xlsx.
// SKU strings are preserved exactly as supplied by the source sheet.
// The source file does not contain stock quantities, so openingStock is null.
export const theDukaanProducts: TheDukaanProduct[] = [
  { id: "td-killer-orange", account: "THE DUKAAN", brand: "KILLER", parentSku: "KILLER-M1-ORANGE ", alternateSkus: ["KLL-ORG-01", "KILL-ORG-O1", "KIL-M1-OR"], openingStock: null },
  { id: "td-killer-red", account: "THE DUKAAN", brand: "KILLER", parentSku: "KILLER-M1-RED", alternateSkus: ["KILL-RED-O1", "KLL-RED-01", "KIL-M1-RD"], openingStock: null },
  { id: "td-killer-green", account: "THE DUKAAN", brand: "KILLER", parentSku: "KILLER-M1-GREEN", alternateSkus: ["KLL-GREEN-01", "KIL-M1-GR", "KILL-GRN-O1"], openingStock: null },
  { id: "td-wrogn-m1-sky", account: "THE DUKAAN", brand: "WROGN", parentSku: "WG-M1-SKY BLUE ", alternateSkus: ["M1-SKY-BLUE-WROGN-0011", "WG-M1-SBL", "M1-0012-WG-SKY-BLUE", "M1-SKY-BLUE-WROGN-001", "WG-M1-SBL-1", "M1-00001-WG-SBL"], openingStock: null },
  { id: "td-wrogn-m1-navy", account: "THE DUKAAN", brand: "WROGN", parentSku: "WG-M1-NAVY BLUE ", alternateSkus: ["WG-M1-NBL", "WG-M1-NBL-1", "M1-0012-WG-NBL", "M1-BLUE-WROGN-003", "M1-BLUE-WROGN-001", "M1-00001-WG-NBL"], openingStock: null },
  { id: "td-wrogn-m1-black", account: "THE DUKAAN", brand: "WROGN", parentSku: "WG-M1-BLACK", alternateSkus: ["WG-M1-BK", "M1-BK-GY-WROGN-003", "WG-M1-BK-1", "M1-BLK-WROGN-001", "M1-0012-WG-BLK", "M1-00001-WG-BLK"], openingStock: null },
  { id: "td-wrogn-m3-sky", account: "THE DUKAAN", brand: "WROGN", parentSku: "WG-M3-SKY BLUE ", alternateSkus: ["M3-00001-WG-SBL-GY", "M3-0021-WG-SKY-BL", "M3-SKY-BLUE-WROGN-003", "WG-M3-SBL"], openingStock: null },
  { id: "td-wrogn-m3-navy", account: "THE DUKAAN", brand: "WROGN", parentSku: "WG-M3-NAVY BLUE", alternateSkus: ["M3-NBL-WROGN-003", "M3-00001-WG-NAVY-BLUE", "M3-0021-WG-NAVY-BLUE", "WG-M3-NBL-1", "WG-M3-NBL"], openingStock: null },
  { id: "td-wrogn-m3-black", account: "THE DUKAAN", brand: "WROGN", parentSku: "WG-M3-BLACK", alternateSkus: ["M3-BLK-WROGN-003", "M3-0021-WG-BLACK", "M3-00001-WG-BK-GY", "WG-M3-BK"], openingStock: null },
  { id: "td-wrogn-m2-sky", account: "THE DUKAAN", brand: "WROGN", parentSku: "WG-M2-SKY BLUE ", alternateSkus: ["WRN-M2-SBL", "WR-M2-SBL-1"], openingStock: null },
  { id: "td-wrogn-m2-black", account: "THE DUKAAN", brand: "WROGN", parentSku: "WG-M2-BLACK", alternateSkus: ["WRN-M2-BK", "WG-M2-BK"], openingStock: null },
  { id: "td-duffel-bag", account: "THE DUKAAN", brand: "duffel_bag", parentSku: "duffel_bag", alternateSkus: ["WR-DFL-M1-BK", "WR-DFL-M1-SBL", "WR-DFL-M1-BL"], openingStock: null },
  { id: "td-miss-chief", account: "THE DUKAAN", brand: "Miss & Chief Kids", parentSku: "", alternateSkus: ["SPIDERMAN-BLUE", "KID-NURSERY-FOOTBALL-BLUE", "KID-NURSERY-UNICORN-PINK", "KID-NURSERY-MARVEL-GREY", "KID-NURSERY-SPIDERMAN-NAVY-BL", "KID-NURSERY-ANIME-BOY-BLK", "MCQUEEN-PURPLE"], openingStock: null },
];
