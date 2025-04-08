export function validateDates(departureDate, returnDate){
    const departure = new Date(departureDate);
    const returnDateObj = new Date(returnDate);
    return departure <= returnDateObj;
};