
async function generateRandomGmail(num:number) {
    const length = num ? num : 5; 
    const characters = '0123456789123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export default {generateRandomGmail}