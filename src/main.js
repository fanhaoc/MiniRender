/*
 * @Author: anganao
 * @Date: 2024-03-10 15:05:27
 * @LastEditors: anganao
 * @LastEditTime: 2024-03-22 20:50:21
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
    
    image.enableZBuffer = true;
    for(let i=0;i<loader.faces.length;i++){
            let point1x = loader.vertices[loader.faces[i].points[0]][0];
            let point1y = loader.vertices[loader.faces[i].points[0]][1];
            let point1z = loader.vertices[loader.faces[i].points[0]][2];
            let point2x = loader.vertices[loader.faces[i].points[1]][0];
            let point2y = loader.vertices[loader.faces[i].points[1]][1];
            let point2z = loader.vertices[loader.faces[i].points[1]][2];
            let point3x = loader.vertices[loader.faces[i].points[2]][0];
            let point3y = loader.vertices[loader.faces[i].points[2]][1];
            let point3z = loader.vertices[loader.faces[i].points[2]][2];
            let indensity = lightInterpolation_triangle([0, 0, -1], generateNormal(
                [point1x, point1y, point1z],
                [point2x, point2y, point2z],
                [point3x, point3y, point3z]
            ));

            let qpoint1x = (point1x + 1) * image.width / 2;
            let qpoint1y = (point1y + 1) * image.height / 2;
            let qpoint2x = (point2x + 1) * image.width / 2;
            let qpoint2y = (point2y + 1) * image.height / 2;
            let qpoint3x = (point3x + 1) * image.width / 2;
            let qpoint3y = (point3y + 1) * image.height / 2;
            // 备注：需要取整数
            qpoint1x = Math.round(qpoint1x);
            qpoint1y = Math.round(qpoint1y);
            qpoint2x = Math.round(qpoint2x);
            qpoint2y = Math.round(qpoint2y);
            qpoint3x = Math.round(qpoint3x);
            qpoint3y = Math.round(qpoint3y);
            image.triangle_gravity([qpoint1x, qpoint1y, point1z], [qpoint2x, qpoint2y, point2z], [qpoint3x, qpoint3y, point3z], [255 * indensity, 255 * indensity, 255 * indensity, 255]);
            //image.triangle_gravity([point1x, point1y, point1z], [point2x, point2y, point2z], [point3x, point3y, point3z], [Math.random()*255, Math.random()*255, Math.random()*255, 255]);

    }
    // 绘制zbuffer图
    // for(let i=0;i<image.zBuffer.length;i++){
    //     if(image.zBuffer[i] === undefined){
    //         image,zBuffer[i] = 0;
    //     }

    //     let x = i % image.width;
    //     let y = Math.floor(i / image.width);
    //     let color = 255 * image.zBuffer[i];
    //     image.setData(x, y, [color, color, color, 255]);
    // }
    image.draw()
})



// 光照插值函数, 返回光照强度【0~1】
function lightInterpolation_triangle(lightVec, normal){
    lightVec = normalize(lightVec);
    normal = normalize(normal);
    let angle = dotProduct(lightVec, normal);
    if(angle < 0) return 0;
    return angle;
}
// line(0,0, 500, 700, image, [255, 0, 0, 255]);