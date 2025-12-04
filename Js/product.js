// product.js - Initializes products in localStorage if not already present

(function initializeProducts() {
  const STORAGE_KEY = "PUFNUT_PRODUCTS_V2";

  // Check if products are already in localStorage
  const existingData = localStorage.getItem(STORAGE_KEY);
  if (existingData) {
    try {
        const parsedData = JSON.parse(existingData);
        // If data exists and is a non-empty array, we are good.
        if (Array.isArray(parsedData) && parsedData.length > 0) {
            console.log("Products already initialized in localStorage.");
            return;
        }
        // If array is empty (length 0), we fall through to restore defaults.
        console.log("Product list is empty. Restoring defaults...");
    } catch (e) {
        console.error("Error parsing product data. Resetting to defaults.", e);
        // If parse error, fall through to restore defaults.
    }
  }

  // Default product data
  const SNACK_PRODUCTS = [
    {
      id: "SNK001",
      name: "Classic Salted Peanuts",
      mrp: 120,
      price: 100,
      img: "../Asset/111.png",
      category: "snacks",
    },
    {
      id: "SNK002",
      name: "Spicy Masala Peanuts",
      mrp: 130,
      price: 110,
      img: "../Asset/222.png",
      category: "snacks",
    },
    {
      id: "SNK003",
      name: "Honey Roasted Peanuts",
      mrp: 150,
      price: 135,
      img: "../Asset/333.png",
      category: "snacks",
    },
    {
      id: "SNK004",
      name: "Garlic & Herb Peanuts",
      mrp: 140,
      price: 125,
      img: "../Asset/4444.png",
      category: "snacks",
    },
    {
      id: "SNK005",
      name: "Sweet Chili Peanuts",
      mrp: 145,
      price: 130,
      img: "../Asset/111.png",
      category: "snacks",
    },
    {
      id: "SNK006",
      name: "Peri-Peri Peanuts",
      mrp: 140,
      price: 120,
      img: "../Asset/222.png",
      category: "snacks",
    },
    {
      id: "SNK007",
      name: "Cheddar Cheese Peanuts",
      mrp: 160,
      price: 145,
      img: "../Asset/333.png",
      category: "snacks",
    },
    {
      id: "SNK008",
      name: "Wasabi Coated Peanuts",
      mrp: 170,
      price: 155,
      img: "../Asset/4444.png",
      category: "snacks",
    },
  ];

  const RECIPE_PRODUCTS = [
    {
      id: "REC001",
      name: "Peanut Butter (Creamy)",
      mrp: 250,
      price: 220,
      img: "../Asset/111.png",
      category: "recipes",
    },
    {
      id: "REC002",
      name: "Peanut Butter (Chunky)",
      mrp: 260,
      price: 230,
      img: "../Asset/222.png",
      category: "recipes",
    },
    {
      id: "REC003",
      name: "Peanut Chutney Powder",
      mrp: 180,
      price: 160,
      img: "../Asset/333.png",
      category: "recipes",
    },
    {
      id: "REC004",
      name: "Roasted Peanut Oil",
      mrp: 350,
      price: 320,
      img: "../Asset/4444.png",
      category: "recipes",
    },
    {
      id: "REC005",
      name: "Peanut Flour",
      mrp: 200,
      price: 180,
      img: "../Asset/111.png",
      category: "recipes",
    },
    {
      id: "REC006",
      name: "Spicy Peanut Sauce",
      mrp: 220,
      price: 200,
      img: "../Asset/222.png",
      category: "recipes",
    },
    {
      id: "REC007",
      name: "Peanut & Jaggery Bar",
      mrp: 100,
      price: 80,
      img: "../Asset/333.png",
      category: "recipes",
    },
    {
      id: "REC008",
      name: "Savory Peanut Granola",
      mrp: 300,
      price: 275,
      img: "../Asset/4444.png",
      category: "recipes",
    },
  ];

  const allProducts = [...SNACK_PRODUCTS, ...RECIPE_PRODUCTS];

  // Store the combined list in localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allProducts));
  console.log("Default products have been saved to localStorage.");
})();
