/*
 * @Author: anganao
 * @Date: 2024-03-10 15:05:27
 * @LastEditors: anganao
 * @LastEditTime: 2024-03-10 22:10:29
 * @FilePath: \tinyRenderJS\src\main.js
 * @Description: 
 * Copyright (c) 2024 by VGE, All Rights Reserved. 
 */
import TGAImage from "./Utils/TGAImage"
import Loader from "./Utils/OBJLoader"


const image = new TGAImage('canvas', 1000, 1000);
const loader = new Loader();

loader.getData(()=>{
    for(let i=0;i<loader.faces.length;i++){
        for(let j=0;j<3;j++){
            let point1x = loader.vertices[loader.faces[i][j]][0];
            let point1y = loader.vertices[loader.faces[i][j]][1];
            let point2x = loader.vertices[loader.faces[i][(j+1)%3]][0];
            let point2y = loader.vertices[loader.faces[i][(j+1)%3]][1];
            point1x = (point1x + 1) * image.width / 2;
            point1y = (point1y + 1) * image.height / 2;
            point2x = (point2x + 1) * image.width / 2;
            point2y = (point2y + 1) * image.height / 2;
            image.line(point1x, point1y, point2x, point2y, [255, 0, 0, 255]);           
        }

    }
    image.draw()
})


// line(0,0, 500, 700, image, [255, 0, 0, 255]);