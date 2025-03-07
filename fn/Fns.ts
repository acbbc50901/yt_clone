
// 判断是否为中文
export const containsChinese = (text: string) => /[\u4e00-\u9fa5]/.test(text);
