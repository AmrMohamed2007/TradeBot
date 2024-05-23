function ConvertAmount(str: string) {
    const suffixes = {
        'h': 1e2,
        'k': 1e3,
        'm': 1e6,
        'b': 1e9,
        't': 1e12
    };

    const match = str.match(/^([\d\.]+)([kmbt])$/i);
    console.log(match);
    if (match) {
        const num = parseFloat(match[1]);

        const suffix = match[2].toLowerCase();

        return num * suffixes[suffix];
    }

    // If no match, try to parse as a regular number
    const parsedNum = parseFloat(str);
    if (!isNaN(parsedNum)) {
        return parsedNum;
    }

    if (suffixes[`${str}`]) {
        return +suffixes[`${str}`]
    }


    throw new Error('Invalid format');
}

export default { ConvertAmount }