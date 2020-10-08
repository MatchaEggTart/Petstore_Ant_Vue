export function formatPrice (price) {
    // 参数如果不是数字
    if (!parseInt(price)) {
        return "0.00";
    }
    // 为价格添加小数点
    var priceString = (price / 100).toFixed(2);
    // 如果价格大于99999用逗号分隔3位
    if (price > 99999) {
        // 将价格设置为数组
        var priceArray = priceString.split("").reverse();
        // 设置位移量
        var index = 3;
        while (priceArray.length > index + 3) {
            // 在数组中每3位插入 ,
            priceArray.splice(index + 3, 0, ",");
            index += 4;
        }
        // 将数组转换成字符串
        priceString = priceArray.reverse().join("");
    }
    return "$ " + priceString;
}