import formatToCurrency from "@/helper/formatNumber";
import Image from "next/image";
import Link from "next/link";

const ProductListItem: React.FC<{
  name: string;
  desc: string;
  price: string;
  id: string;
  image: string;
}> = ({ name, desc, price, id, image }) => {
  return (
    <Link
      href={`/category/${id.toString()}`}
      className="space-y-1 cursor-pointer "
    >
      <div className="h-40 bg-slate-400 relative">
        <Image src={image} className="object-cover" fill alt="" />
      </div>
      <h2 className="font-bold text-sm">{name}</h2>
      <p className="text-xs truncate">{desc}</p>
      <p className="font-bold">{formatToCurrency(parseInt(price))}</p>
      <p></p>
    </Link>
  );
};

export default ProductListItem;
