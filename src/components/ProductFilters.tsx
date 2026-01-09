import { Search, X, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NhaMayPublic } from "@/types";
/* ===== GIỮ NGUYÊN SIZE & PRICE RANGE ===== */
const sizes = ["30x60cm", "60x60cm", "80x80cm"];
const priceRanges = [
  { label: "Dưới 150.000đ", min: 0, max: 150000 },
  { label: "150.000đ - 250.000đ", min: 150000, max: 250000 },
  { label: "Trên 250.000đ", min: 250000, max: 1000000 },
];

interface ProductFiltersProps {
  factories: NhaMayPublic[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  selectedFactory: string;
  setSelectedFactory: (factoryId: string) => void;
  selectedPriceRange: string;
  setSelectedPriceRange: (range: string) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

const ProductFilters = ({
  factories,
  searchQuery,
  setSearchQuery,
  selectedSize,
  setSelectedSize,
  selectedFactory,
  setSelectedFactory,
  selectedPriceRange,
  setSelectedPriceRange,
  onClearFilters,
  activeFiltersCount,
}: ProductFiltersProps) => {
  const FilterContent = () => (
    <div className="space-y-6">
      {/* ===== SIZE ===== */}
      <div>
        <label className="text-sm font-medium mb-2 block">Kích thước</label>
        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger>
            <SelectValue placeholder="Tất cả kích thước" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả kích thước</SelectItem>
            {sizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ===== FACTORY ===== */}
      <div>
        <label className="text-sm font-medium mb-2 block">Nhà máy</label>
        <Select value={selectedFactory} onValueChange={setSelectedFactory}>
          <SelectTrigger>
            <SelectValue placeholder="Tất cả nhà máy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả nhà máy</SelectItem>
            {factories.map((factory) => (
              <SelectItem key={factory._id} value={factory._id}>
                {factory.tenNhaMay}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ===== PRICE ===== */}
      <div>
        <label className="text-sm font-medium mb-2 block">Khoảng giá</label>
        <Select
          value={selectedPriceRange}
          onValueChange={setSelectedPriceRange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tất cả mức giá" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả mức giá</SelectItem>
            {priceRanges.map((range, index) => (
              <SelectItem key={index} value={index.toString()}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ===== CLEAR ===== */}
      {activeFiltersCount > 0 && (
        <Button variant="outline" onClick={onClearFilters} className="w-full">
          <X className="h-4 w-4 mr-2" />
          Xóa bộ lọc ({activeFiltersCount})
        </Button>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* ===== SEARCH ===== */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm gạch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* ===== MOBILE FILTER ===== */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden relative">
              <SlidersHorizontal className="h-4 w-4" />
              {activeFiltersCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Bộ lọc sản phẩm</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* ===== DESKTOP FILTER ===== */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-4">
        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger>
            <SelectValue placeholder="Kích thước" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả kích thước</SelectItem>
            {sizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedFactory} onValueChange={setSelectedFactory}>
          <SelectTrigger>
            <SelectValue placeholder="Nhà máy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả nhà máy</SelectItem>
            {factories.map((factory) => (
              <SelectItem key={factory._id} value={factory._id}>
                {factory.tenNhaMay}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedPriceRange}
          onValueChange={setSelectedPriceRange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Khoảng giá" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả mức giá</SelectItem>
            {priceRanges.map((range, index) => (
              <SelectItem key={index} value={index.toString()}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {activeFiltersCount > 0 && (
          <Button variant="outline" onClick={onClearFilters}>
            <X className="h-4 w-4 mr-2" />
            Xóa bộ lọc ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* ===== ACTIVE FILTER BADGES ===== */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Tìm: "{searchQuery}"
              <button onClick={() => setSearchQuery("")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {selectedSize !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {selectedSize}
              <button onClick={() => setSelectedSize("all")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {selectedFactory !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {factories.find((f) => f._id === selectedFactory)?.tenNhaMay}
              <button onClick={() => setSelectedFactory("all")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {selectedPriceRange !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {priceRanges[parseInt(selectedPriceRange)]?.label}
              <button onClick={() => setSelectedPriceRange("all")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
