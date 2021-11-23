export const splitFileName = (name: string) => {
    const res = name.split('$');
    return res[1]
}
