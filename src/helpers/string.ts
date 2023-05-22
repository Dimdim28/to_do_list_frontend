export const humaniseDate = (date: string) => {
    const DateInstance = new Date(date);
    let day: string | number = DateInstance.getDate();
    let month: string | number = DateInstance.getMonth() + 1;
    let year = DateInstance.getFullYear();
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    return [day, month, year].join('.');
}