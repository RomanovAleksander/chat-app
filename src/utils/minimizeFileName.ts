const reverseString = (str: string) => str.split('').reverse().join('');

export const minimizeFileName = (name: string) => {
    if (name === undefined) return '';
    const reversed = reverseString(name);
    const res = reversed.slice(0, 10);
    return `...${reverseString(res)}`;
};
