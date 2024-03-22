/*
 * @Author: anganao
 * @Date: 2024-03-11 20:04:32
 * @LastEditors: anganao
 * @LastEditTime: 2024-03-22 19:18:00
 * @FilePath: \tinyRenderJS\src\Core\geometry.js
 * @Description: 
 * Copyright (c) 2024 by VGE, All Rights Reserved. 
 */
// 自动生成三角面片法线
function generateNormal(point1, point2, point3){
    // 1->2->3的顺序连接
    const v1 = [point2[0] - point1[0], point2[1] - point1[1], point2[2] - point1[2]];
    const v2 = [point1[0] - point3[0], point1[1] - point3[1], point1[2] - point3[2]];
    const res = [
        v1[1] * v2[2] - v1[2] * v2[1], 
        v1[2] * v2[0] - v1[0] * v2[2],
        v1[0] * v2[1] - v1[1] * v2[0]
        ]
    return normalize(res)
}

// 向量单位化
function normalize(vector){
    const mo = moduel(vector);
    return [vector[0] / mo, vector[1] / mo, vector[2] / mo]
}

// 计算模长
function moduel(vector){
    return Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1] + vector[2] * vector[2])
}

// 向量点乘
function dotProduct(vector1, vector2){
    return vector1[0] * vector2[0] + vector1[1] * vector2[1] + vector1[2] * vector2[2]
}
export {
    generateNormal,
    normalize,
    moduel,
    dotProduct
}