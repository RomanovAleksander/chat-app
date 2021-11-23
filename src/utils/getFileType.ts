export const getFileType = (name: string) => {
    const splitName = name.split('.').reverse();
    return splitName[0];
};
