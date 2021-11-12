const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 b';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['b', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export default formatBytes
