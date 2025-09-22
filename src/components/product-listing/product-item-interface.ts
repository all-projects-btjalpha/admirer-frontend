export default interface productItemProps {
  name: string;
  price: string;
  description: string;
  originalPrice: string;
  discount: string;
  imageUrl?: string;
  compactView?: boolean;
  id: number;
  subcategory: Number | undefined;
  wishlist?: number;
}