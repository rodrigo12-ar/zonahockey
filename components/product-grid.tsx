import { ProductBase } from "@/types";
import { ProductCard } from "@/components/product-card";

type ProductGridProps = {
  products: (ProductBase & { category: string })[];
};

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
