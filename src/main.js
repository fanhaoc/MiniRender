/*
 * @Author: anganao
 * @Date: 2024-03-10 15:05:27
 * @LastEditors: anganao
 * @LastEditTime: 2024-03-11 20:44:43
 * @FilePath: \tinyRenderJS\src\main.js
 * @Description: 
 * Copyright (c) 2024 by VGE, All Rights Reserved. 
 */
import TGAImage from "./Utils/TGAImage"
import Loader from "./Utils/OBJLoader"
import { generateNormal, normalize, moduel, dotProduct } from "./Core/geometry";

const image = new TGAImage('canvas', 1000, 1000);
const loader = new Loader();

// image.triangle_gravity([10, 10], [500, 200], [300, 800], [255,0,0,255], [0,255,0,255], [0,0,255,255])
image.draw()

loader.getData(()=>{
    for(let i=0;i<loader.faces.length;i++){
            let point1x = loader.vertices[loader.faces[i][0]][0];
            let point1y = loader.vertices[loader.faces[i][0]][1];
            let point1z = loader.vertices[loader.faces[i][0]][2];
            let point2x = loader.vertices[loader.faces[i][1]][0];
            let point2y = loader.vertices[loader.faces[i][1]][1];
            let point2z = loader.vertices[loader.faces[i][1]][2];
            let point3x = loader.vertices[loader.faces[i][2]][0];
            let point3y = loader.vertices[loader.faces[i][2]][1];
            let point3z = loader.vertices[loader.faces[i][2]][2];
            let indensity = lightInterpolation_triangle([0, 0, 1], [point1x, point1y, point1z], [point2x, point2y, point2z], [point3x, point3y, point3z]);

            point1x = (point1x + 1) * image.width / 2;
            point1y = (point1y + 1) * image.height / 2;
            point2x = (point2x + 1) * image.width / 2;
            point2y = (point2y + 1) * image.height / 2;
            point3x = (point3x + 1) * image.width / 2;
            point3y = (point3y + 1) * image.height / 2;

            point1x = Math.round(point1x);
            point1y = Math.round(point1y);
            point2x = Math.round(point2x);
            point2y = Math.round(point2y);
            point3x = Math.round(point3x);
            point3y = Math.round(point3y);

            image.triangle_gravity([point1x, point1y], [point2x, point2y], [point3x, point3y], [0, 255 * indensity, 255 * indensity, 255]);

    }
    image.draw()
})



// 光照插值函数, 返回光照强度【0~1】
function lightInterpolation_triangle(lightVec, point1, point2, pint3){
    let intensity = 0;
    let normal = generateNormal(point1, point2, pint3);
    let mo1 = moduel(lightVec);
    let mo2 = moduel(normal);
    let angle = dotProduct(lightVec, normal) / (mo1 * mo2);
    if(angle > 0){  
        return angle;
    } else {
        return 0;
    }
}
// line(0,0, 500, 700, image, [255, 0, 0, 255]);