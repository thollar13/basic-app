export interface Item {
  id: string;
  name: string;
  price: number;
  priceType: string;
  isHidden: Boolean;
  cloverHiddenValue: Boolean;
  cloverId: string; /// ID for Clover
  mId: string; /// Merchant ID
}
