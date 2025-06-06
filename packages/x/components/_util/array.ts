export const isTwoDimensionalArray = (arr: any): boolean => {
    if (!Array.isArray(arr)) return false;
    return arr.every(item => Array.isArray(item));
}
