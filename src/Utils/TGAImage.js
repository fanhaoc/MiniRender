/*
 * @Author: anganao
 * @Date: 2024-03-10 15:39:46
 * @LastEditors: anganao
 * @LastEditTime: 2024-03-10 22:12:17
 * @FilePath: \tinyRenderJS\src\Utils\TGAImage.js
 * @Description: 
 * Copyright (c) 2024 by VGE, All Rights Reserved. 
 */
export default class TGAImage{
    constructor(canvasName, width, height){
        this.canvas = document.getElementById(canvasName);
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext('2d');
        this.image = this.ctx.createImageData(width, height);
        this.width = width;
        this.height = height;

 
    }
    setData(x, y, color){
        if(x <0 || y<0 || x>this.image.width || y>this.image.height) return;
        const index = (x + y * this.image.width) * 4;
        for(let i=0;i<4;i++){
            this.image.data[index+i] = color[i];
        }
    }

    // 画线
    line(x0, y0, x1, y1, color){
        // y轴翻转
        y0 = this.height - y0;
        y1 = this.height - y1;

        let steep = false;
        if(Math.abs(x1-x0) < Math.abs(y1-y0)){
            [x0, y0] = [y0, x0];
            [x1, y1] = [y1, x1];
            steep = true;
        }
        // 使算法从左到右
        if(x0>x1){
            [x0, x1] = [x1, x0];
            [y0, y1] = [y1, y0];
        }
        x0 = Math.round(x0); //将每一个位置设置为整数
        for(let x=x0;x<=x1;x++){
            const t = (x-x0)/(x1-x0);
            const y = Math.round(y0 * (1 - t) + y1*t); 
            if(steep){
                this.setData(y,x, color);
            } else {
                this.setData(x,y, color);
            }
        }
    }

    draw(){
        this.ctx.putImageData(this.image, 0, 0);
    }
}