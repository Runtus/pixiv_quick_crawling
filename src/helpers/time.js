module.exports = {
    timeFormatYMD: (timeStamp) => {
        const date = new Date(timeStamp);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }
}