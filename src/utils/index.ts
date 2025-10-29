export function calculateDiscount(
  originalPrice: number,
  discountPercentage: number
): number {
  if (
    typeof originalPrice !== "number" ||
    typeof discountPercentage !== "number" ||
    isNaN(originalPrice) ||
    isNaN(discountPercentage)
  ) {
    return 0;
  }

  if (originalPrice < 0 || discountPercentage < 0 || discountPercentage > 100) {
    return 0;
  }

  const discountAmount = (originalPrice * discountPercentage) / 100;
  //   return parseFloat(discountAmount.toFixed(2));
  return parseInt(discountAmount.toFixed(2));
}

export function formatToReadableDate(dateInput: string | Date): string {
  const date = new Date(dateInput);

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function isToday(date: Date | string) {
  if (!date) return false;
  const givenDate = new Date(date);
  const today = new Date();
  return (
    givenDate.getDate() === today.getDate() &&
    givenDate.getMonth() === today.getMonth() &&
    givenDate.getFullYear() === today.getFullYear()
  );
}
