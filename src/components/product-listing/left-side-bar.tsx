import React, { useEffect, useRef, useState } from "react";
import { productCategoy_API, catSubcat_API } from "../api/api-end-points";
import { Loader } from "lucide-react";
interface LeftSideBarProps {
  minimum: number;
  maximum: number;
  setDynamicMin: (val: number) => void;
  setDynamicMax: (val: number) => void;
  category?: number; // ✅ optional karo
  setSubCategory: (val: string) => void;
  activeSubCategory?: string;
}

const LeftSideBar: React.FC<LeftSideBarProps> = ({
  minimum,
  maximum,
  setDynamicMin,
  setDynamicMax,
  category,
  setSubCategory,
  activeSubCategory,
}) => {
  // category data definition
  const [selectedCategory, setSelectedCategory] = useState<string>(
    activeSubCategory || ""
  );
  const [categories, setCategories] = useState<Record<string, string[]>>({});
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    price: true,
    categories: true,
  });
  const [loading, setLoading] = useState(false);
  const hasRestored = useRef(false);

  useEffect(() => {
    if (!hasRestored.current && activeSubCategory) {
      setSelectedCategory(activeSubCategory);
      hasRestored.current = true;
    }
  }, [activeSubCategory]);

  useEffect(() => {
    console.log("I am inside leftside bar and category is = ", category);
  }, [category]);
  // price data declaration
  const [sliderMinValue, setSliderMinValue] = useState(minimum);
  const [sliderMaxValue, setSliderMaxValue] = useState(maximum);
  const [minVal, setMinVal] = useState(minimum);
  const [maxVal, setMaxVal] = useState(maximum);
  const [minInput, setMinInput] = useState(minimum);
  const [maxInput, setMaxInput] = useState(maximum);
  const [isDragging, setIsDragging] = useState(false);
  const minGap = 50; // Minimum gap between sliders

  // useEffect(() => {
  //   fetch(catSubcat_API, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       category: { category },
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("The category of the left-side-bar is = ", data);
  //     });
  // }, []);
  useEffect(() => {
    const rawCat = sessionStorage.getItem("categoryId");
    const rawSubcat = sessionStorage.getItem("subcategoryId");

    // Agar tumko catId bhi URL se mil rha hai to woh bhi parse kar sakte ho:
    const urlParams = new URLSearchParams(window.location.search);
    const urlCat = urlParams.get("cat");
    const urlSubcat = urlParams.get("subcat");

    const finalCat = urlCat || rawCat || null;
    const finalSubcat = urlSubcat || rawSubcat || null;

    console.log("👉 FINAL CAT:", finalCat);
    console.log("👉 FINAL SUBCAT:", finalSubcat);

    if (!finalCat) {
      console.log("❌ No valid category id, skipping fetch");
      return;
    }
    window.scrollTo({ top: 0, behavior: "auto" }); // extra add to move top instead of that same product
    setLoading(true);

    fetch(catSubcat_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category: finalCat }),
    })
      .then((response) => response.json())
      .then((data: Record<string, string[]>) => {
        console.log("✅ API DATA:", data);

        setCategories(data);

        const initialExpanded: Record<string, boolean> = {
          price: true,
          categories: true,
        };
        Object.keys(data).forEach((cat) => {
          initialExpanded[cat] = true; // har category expand
        });
        setExpandedSections(initialExpanded);

        const allSubs = Object.values(data).flat();

        if (finalSubcat && allSubs.includes(finalSubcat)) {
          sessionStorage.setItem("activeSubcategory", finalSubcat);
          setSelectedCategory(finalSubcat);
          setSubCategory(finalSubcat);
        } else {
          const savedSub = sessionStorage.getItem("activeSubcategory");
          if (savedSub && allSubs.includes(savedSub)) {
            setSelectedCategory(savedSub);
            setSubCategory(savedSub);
          } else {
            const firstCategory = Object.keys(data)[0];
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // functions related for price range
  useEffect(() => {
    // Log current min and max values
    console.log("Current price range:", { min: minVal, max: maxVal });
    // Execute your custom function here
    setDynamicMax(maxVal);
    setDynamicMin(minVal);
  }, [minVal, maxVal]);
  useEffect(() => {
    setSliderMinValue(minimum);
    setSliderMaxValue(maximum);
    setMinVal(minimum);
    setMaxVal(maximum);
    setMinInput(minimum);
    setMaxInput(maximum);
  }, [minimum, maximum]);
  const slideMin = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: number = parseInt(e.target.value, 10);
    if (value >= sliderMinValue && maxVal - value >= minGap) {
      setMinVal(value);
      setMinInput(value);
    }
  };

  const slideMax = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: number = parseInt(e.target.value, 10);
    if (value <= sliderMaxValue && value - minVal >= minGap) {
      setMaxVal(value);
      setMaxInput(value);
    }
  };

  const setSliderTrack = (): { left: string; right: string } => {
    const minPercent: number =
      ((minVal - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;
    const maxPercent: number =
      ((maxVal - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;

    return {
      left: `${minPercent}%`,
      right: `${100 - maxPercent}%`,
    };
  };

  const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: number =
      e.target.value === "" ? sliderMinValue : parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= sliderMinValue && value <= maxVal - minGap) {
      setMinInput(value);
      setMinVal(value);
    }
  };

  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: number =
      e.target.value === "" ? sliderMaxValue : parseInt(e.target.value, 10);
    if (!isNaN(value) && value <= sliderMaxValue && value >= minVal + minGap) {
      setMaxInput(value);
      setMaxVal(value);
    }
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: "min" | "max"
  ): void => {
    if (e.key === "Enter") {
      const value: number = parseInt((e.target as HTMLInputElement).value, 10);
      if (
        type === "min" &&
        value >= sliderMinValue &&
        value <= maxVal - minGap
      ) {
        setMinVal(value);
      } else if (
        type === "max" &&
        value <= sliderMaxValue &&
        value >= minVal + minGap
      ) {
        setMaxVal(value);
      }
    }
  };

  const startDrag = (): void => setIsDragging(true);
  const stopDrag = (): void => setIsDragging(false);

  const trackStyle = setSliderTrack();

  // functions related to category
  // const handleCategoryChange = (category: string) => {
  //   setSelectedCategory(category);

  //   // Find if this is a main category or subcategory
  //   let isMainCategory = false;
  //   let parentCategory = "";

  //   for (const [cat, subcats] of Object.entries(categories)) {
  //     if (cat === category) {
  //       isMainCategory = true;
  //       break;
  //     }
  //     if (subcats.includes(category)) {
  //       parentCategory = cat;
  //       break;
  //     }
  //   }

  //   if (isMainCategory) {
  //     console.log("Selected category:", {
  //       category: category,
  //       subcategory: null,
  //     });
  //     setSubCategory("");
  //   } else {
  //     console.log("Selected category:", {
  //       category: parentCategory,
  //       subcategory: category,
  //     });
  //     setSubCategory(category);
  //   }
  // };

  const handleCategoryChange = (clicked: string) => {
    // Check if it's a **main category**
    const isMainCategory = Object.keys(categories).includes(clicked);

    if (isMainCategory) {
      // Agar main category pe click hua → subcategory ko empty karo
      setSelectedCategory(clicked);
      setSubCategory(""); //  empty subcat means show all
      sessionStorage.setItem("activeSubcategory", "");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Subcategory pe click
      setSelectedCategory(clicked);
      setSubCategory(clicked);
      sessionStorage.setItem("activeSubcategory", clicked);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setExpandedSections((prev) => ({
      ...prev,
      [clicked]: true, // force expand main category
    }));
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="p-6 ">
      {/* Price Range Section */}
      <div className="bg-white rounded-lg p-0 w-full max-w-md mx-auto ">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg font-bold text-[#7b48a5]">Price Range</h3>
        </div>
        {/* Input boxes */}
        <div className="flex justify-between mb-2 gap-4">
          <div className="flex-1 min-w-0">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Min (Rs)
            </label>
            <div className="relative">
              <input
                type="number"
                value={minInput}
                onChange={handleMinInput}
                onKeyDown={(e) => handleInputKeyDown(e, "min")}
                className="w-full px-3 py-1 border border-gray-300 rounded text-sm text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none select-none"
                min={sliderMinValue}
                max={maxVal - minGap}
                style={{
                  width: `${Math.max(minInput.toString().length + 5, 6)}ch`,
                }}
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Max (Rs)
            </label>
            <div className="relative">
              <input
                type="number"
                value={maxInput}
                onChange={handleMaxInput}
                onKeyDown={(e) => handleInputKeyDown(e, "max")}
                className="w-full px-3 py-1 border border-gray-300 rounded text-sm text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none select-none"
                min={minVal + minGap}
                max={sliderMaxValue}
                style={{
                  width: `${Math.max(maxInput.toString().length + 5, 6)}ch`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="relative h-1 bg-gray-300 rounded-full my-6 mb-8">
          <div
            className="absolute h-full bg-[#7b48a5] rounded-full"
            style={trackStyle}
          ></div>

          <input
            type="range"
            min={sliderMinValue}
            max={sliderMaxValue}
            value={minVal}
            onChange={slideMin}
            onMouseDown={startDrag}
            onMouseUp={stopDrag}
            onTouchStart={startDrag}
            onTouchEnd={stopDrag}
            className="absolute w-full h-1 top-1/2 -translate-y-1/2 appearance-none pointer-events-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#7b48a5] [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
          />

          <input
            type="range"
            min={sliderMinValue}
            max={sliderMaxValue}
            value={maxVal}
            onChange={slideMax}
            onMouseDown={startDrag}
            onMouseUp={stopDrag}
            onTouchStart={startDrag}
            onTouchEnd={stopDrag}
            className="absolute w-full h-1 top-1/2 -translate-y-1/2 appearance-none pointer-events-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#7b48a5] [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
          />

          {/* Tooltips */}
          {isDragging && (
            <>
              <div
                className="absolute -top-8 text-xs text-gray-600 bg-white px-2 py-1 rounded border border-gray-200 shadow-sm whitespace-nowrap"
                style={{ left: trackStyle.left, transform: "translateX(-50%)" }}
              >
                ₹{minVal}
              </div>
              <div
                className="absolute -top-8 text-xs text-gray-600 bg-white px-2 py-1 rounded border border-gray-200 shadow-sm whitespace-nowrap"
                style={{
                  right: trackStyle.right,
                  transform: "translateX(50%)",
                }}
              >
                ₹{maxVal}
              </div>
            </>
          )}
        </div>
      </div>
      {/* Categories Section */}
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("categories")}
          >
            <h3 className="text-lg font-bold text-[#7b48a5]">Categories</h3>
            <span className="text-[#7b48a5]">
              {expandedSections.categories ? "−" : "+"}
            </span>
          </div>
          {expandedSections.categories && (
            <div className="mt-1">
              {Object.entries(categories).map(([category, subcategories]) => (
                <div key={category} className="mb-4 ">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`cat-${category}`}
                      name="allCategories"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={() => handleCategoryChange(category)}
                      className="h-4 w-4 hidden text-[#7b48a5] focus:ring-purple-500 cursor-pointer"
                    />
                    <label
                      htmlFor={`cat-${category}`}
                      className={`ml-2 font-semibold cursor-pointer ${
                        selectedCategory === category
                          ? "text-[#7b48a5]"
                          : "text-purple-700"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSection(category);
                      }}
                    >
                      {category}
                    </label>
                    {subcategories?.length > 0 && (
                      <span
                        className="ml-2 text-purple-800 cursor-pointer"
                        onClick={() => toggleSection(category)}
                      >
                        {expandedSections[category] ? "−" : "+"}
                      </span>
                    )}
                  </div>
                  {expandedSections[category] && subcategories.length > 0 && (
                    <div className="ml-4 space-y-2 mt-2">
                      {subcategories.map((subcategory, idx) => (
                        <div
                          key={`${category}-${idx}`}
                          className="flex items-center  "
                        >
                          <input
                            type="radio"
                            id={`${category}-${idx}`}
                            name="allCategories"
                            value={subcategory}
                            checked={selectedCategory === subcategory}
                            onChange={() => handleCategoryChange(subcategory)}
                            className="h-4 w-4 text-purple-600 cursor-pointer focus:ring-purple-500 shrink-0"
                          />
                          <label
                            htmlFor={`${category}-${idx}`}
                            className={`ml-2 font-medium cursor-pointer ${
                              selectedCategory === subcategory
                                ? "text-purple-800 font-semibold"
                                : "text-purple-600"
                            }`}
                          >
                            {subcategory}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LeftSideBar;
