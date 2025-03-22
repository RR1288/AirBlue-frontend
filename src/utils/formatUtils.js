export function formatDate(dateString) {
    if (!dateString) return "N/A"; // Handle empty dates
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};