import type { PropertyListing } from "./components/PropertyCard";

// Simulates external data coming from an API.
// JSON.parse() returns any, so TypeScript cannot verify the actual data.
const externalInput = `{
  "id": 101,
  "address": "456 Oak Avenue",
  "city": "Los Angeles, CA",
  "price": "725000",
  "bedrooms": 3,
  "bathrooms": 2,
  "imageUrl": "/house.jpg"
}`;

const apiResponse = JSON.parse(externalInput);

// Unsafe assertion: this tells TypeScript to trust us without
// performing any runtime validation.
const unsafeProperty = apiResponse as PropertyListing;

// TypeScript believes price is a number because of the assertion.
// At runtime, however, price is actually a string.
console.log(unsafeProperty.price.toFixed(2));

// Example B: All primitive types match PropertyListing,
// but the values violate real-world business rules.
const invalidBusinessPayload = {
  id: 102,
  address: "789 Pine Street",
  city: "Los Angeles, CA",
  price: -450000,
  bedrooms: -3,
  bathrooms: 0,
  imageUrl: "/house2.jpg",
};

const invalidBusinessProperty =
  invalidBusinessPayload as PropertyListing;

  // Boundary Defense: validate unknown external data before using it.
function isPropertyListing(data: unknown): data is PropertyListing {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const property = data as Record<string, unknown>;

  return (
    typeof property.id === "number" &&
    typeof property.address === "string" &&
    property.address.trim().length > 0 &&
    typeof property.city === "string" &&
    property.city.trim().length > 0 &&
    typeof property.price === "number" &&
    property.price > 0 &&
    typeof property.bedrooms === "number" &&
    property.bedrooms >= 0 &&
    typeof property.bathrooms === "number" &&
    property.bathrooms > 0 &&
    typeof property.imageUrl === "string" &&
    property.imageUrl.trim().length > 0
  );
}

function processProperty(data: unknown) {
  if (!isPropertyListing(data)) {
    throw new Error("Invalid property listing payload");
  }

  // Safe to use after runtime validation.
  console.log(`Validated price: $${data.price.toFixed(2)}`);
}

try {
  processProperty(invalidBusinessProperty);
} catch (error) {
  console.error("Example B rejected:", error);
}