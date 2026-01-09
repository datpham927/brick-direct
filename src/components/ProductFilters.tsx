import { motion } from "framer-motion";
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
import { factories, sizes, priceRanges } from "@/data/mockData";

interface ProductFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  selectedFactory: string;
  setSelectedFactory: (factory: string) => void;
  selectedPriceRange: string;
  setSelectedPriceRange: (range: string) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

const ProductFilters = ({
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
    <div className="space-y-5 md:space-y-6">
      {/* Size filter */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Kích thước
        </label>
        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger className="h-10 md:h-11 rounded-xl">
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

      {/* Factory filter */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Nhà máy
        </label>
        <Select value={selectedFactory} onValueChange={setSelectedFactory}>
          <SelectTrigger className="h-10 md:h-11 rounded-xl">
            <SelectValue placeholder="Tất cả nhà máy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả nhà máy</SelectItem>
            {factories.map((factory) => (
              <SelectItem key={factory.id} value={factory.id}>
                {factory.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price range filter */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Khoảng giá
        </label>
        <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
          <SelectTrigger className="h-10 md:h-11 rounded-xl">
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

      {/* Clear filters */}
      {activeFiltersCount > 0 && (
        <Button variant="outline" onClick={onClearFilters} className="w-full h-10 md:h-11 rounded-xl">
          <X className="h-4 w-4 mr-2" />
          Xóa bộ lọc ({activeFiltersCount})
        </Button>
      )}
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Search and mobile filter button */}
      <div className="flex gap-2 md:gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm gạch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 md:h-12 rounded-xl text-sm md:text-base"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Mobile filter button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden relative h-10 md:h-12 w-10 md:w-12 rounded-xl p-0">
              <SlidersHorizontal className="h-4 md:h-5 w-4 md:w-5" />
              {activeFiltersCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs gradient-hero border-0">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px] sm:w-[350px]">
            <SheetHeader>
              <SheetTitle className="text-lg font-bold">Bộ lọc sản phẩm</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop filters */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-3 md:gap-4">
        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger className="h-11 rounded-xl">
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
          <SelectTrigger className="h-11 rounded-xl">
            <SelectValue placeholder="Nhà máy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả nhà máy</SelectItem>
            {factories.map((factory) => (
              <SelectItem key={factory.id} value={factory.id}>
                {factory.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
          <SelectTrigger className="h-11 rounded-xl">
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
          <Button variant="outline" onClick={onClearFilters} className="h-11 rounded-xl">
            <X className="h-4 w-4 mr-2" />
            Xóa bộ lọc ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Active filter badges */}
      {activeFiltersCount > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2"
        >
          {searchQuery && (
            <Badge variant="secondary" className="gap-1 px-3 py-1.5 rounded-lg text-xs md:text-sm">
              Tìm: "{searchQuery}"
              <button onClick={() => setSearchQuery("")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedSize !== "all" && (
            <Badge variant="secondary" className="gap-1 px-3 py-1.5 rounded-lg text-xs md:text-sm">
              {selectedSize}
              <button onClick={() => setSelectedSize("all")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedFactory !== "all" && (
            <Badge variant="secondary" className="gap-1 px-3 py-1.5 rounded-lg text-xs md:text-sm">
              {factories.find((f) => f.id === selectedFactory)?.name}
              <button onClick={() => setSelectedFactory("all")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedPriceRange !== "all" && (
            <Badge variant="secondary" className="gap-1 px-3 py-1.5 rounded-lg text-xs md:text-sm">
              {priceRanges[parseInt(selectedPriceRange)]?.label}
              <button onClick={() => setSelectedPriceRange("all")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProductFilters;
