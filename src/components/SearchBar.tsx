import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { search } from "./api/api-end-points";

interface Product {
  id: number;
  product_name: string;
}

interface SearchBarWithPopupProps {
  onSelectProduct?: () => void;
}

const SearchBarWithPopup: React.FC<SearchBarWithPopupProps> = ({
  onSelectProduct,
}) => {
  const [query, setQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      if (query.trim()) {
        try {
          const response = await fetch(`${search}?q=${query}`);
          const data = await response.json();

          if (Array.isArray(data)) {
            setFilteredProducts(data);
            setShowDropdown(true);
          } else {
            console.warn("Unexpected response format:", data);
            setFilteredProducts([]);
          }
        } catch (error) {
          console.error("Error fetching search results:", error);
          setFilteredProducts([]);
        }
      } else {
        setFilteredProducts([]);
        setShowDropdown(false);
      }
    };

    const debounce = setTimeout(fetchProducts, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative w-[400px] max-lg:ml-[50px] ml-[110px] max-md:ml-0 max-md:w-full"
      ref={dropdownRef}
    >
      <Search className="absolute  ml-2 mt-[-2px] w-5 h-5 top-6 max-md:top-7 transform -translate-y-1/2 text-[#7B48A5]" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        className="bg-transparent pl-8 pr-2 w-full h-[40px] placeholder:text-gray-500 placeholder:font-semibold max-md:h-[45px] rounded-md border-2 border-[#7B48A5]  outline-none ring-2 ring-[#d3b6e9] text-gray"
        onFocus={() => query && setShowDropdown(true)}
      />

      {showDropdown && (
        <div className="absolute z-50 mt-1 bg-white shadow-2xl max-md:shadow-none rounded-xl w-full max-h-[250px] max-md:max-h-[400px] overflow-hidden">
          <div className="overflow-y-auto max-h-[250px] max-md:max-h-[400px] rounded-xl pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="px-4 py-2 hover:bg-[#f5e8ff] cursor-pointer text-sm text-gray-700"
                  onClick={() => {
                    navigate(`/product/${product.id}`);
                    setShowDropdown(false);
                    setQuery("");
                    onSelectProduct?.();
                  }}
                >
                  {product.product_name}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500 text-sm">
                No products found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBarWithPopup;
