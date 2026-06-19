const calculateAvg = (arr) => {
    if (!arr || arr.length === 0) return 0;
    const sum = arr.reduce((acc, val) => acc + val, 0);
    const avg = sum / arr.length;
    console.log("Average:", avg)
    return avg;
};

module.exports = calculateAvg;