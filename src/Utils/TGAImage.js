/*
 * @Author: anganao
 * @Date: 2024-03-10 15:39:46
 * @LastEditors: anganao
 * @LastEditTime: 2024-03-11 20:26:32
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

    // 画三角形
    triangle_scan(point1, point2, point3, color){
        // 根据y值大小进行排序
        let points = [point1, point2, point3];
        for(let i=0;i<3;i++){
            for(let j=i+1;j<3;j++){
                if(points[i][1] > points[j][1]){
                    [points[i], points[j]] = [points[j], points[i]];
                }
            }
        }
        // 三条线段 斜率的倒数k
        let line1 = (points[1][0] - points[0][0])/(points[1][1] - points[0][1]);
        let line2 = (points[2][0] - points[1][0])/(points[2][1] - points[1][1]);
        let line3 = (points[0][0] - points[2][0])/(points[0][1] - points[2][1]);
        // 从下往上绘制平行线
        let nowy = points[0][1];
        const middley = points[1][1];
        const topy = points[2][1];
        for(let y=nowy;y<=topy;y++){
            if(y<middley){
                this.line((y-points[0][1])*line1+points[0][0], y, (y-points[0][1])*line3+points[0][0], y, color);
            } else {
                this.line((y-points[1][1])*line2+points[1][0], y, (y-points[0][1])*line3+points[0][0], y, color);
            }
        }
    }

    // 基于重心坐标的三角形绘制
    triangle_gravity(point1, point2, point3, color1, color2, color3){
        //计算包围盒
        let minx = Math.min(point1[0], point2[0], point3[0]);
        let miny = Math.min(point1[1], point2[1], point3[1]);
        let maxx = Math.max(point1[0], point2[0], point3[0]);
        let maxy = Math.max(point1[1], point2[1], point3[1]);
        const boundingBox = {
            x: minx,
            y: miny,
            width: maxx - minx,
            height: maxy - miny
        }
        // 重心坐标计算函数
        const gravityCoord = (p) => {
            let g1 = (point3[1] - point2[1]) * p[0] + (point2[0] - point3[0]) * p[1] + point3[0] * point2[1] - point2[0] * point3[1];
            g1 = g1 / ((point3[1] - point2[1]) * point1[0] + (point2[0] - point3[0]) * point1[1] + point3[0] * point2[1] - point2[0] * point3[1])

            let g2 = (point1[1] - point3[1]) * p[0] + (point3[0] - point1[0]) * p[1] + point1[0] * point3[1] - point3[0] * point1[1];
            g2 = g2 / ((point1[1] - point3[1]) * point2[0] + (point3[0] - point1[0]) * point2[1] + point1[0] * point3[1] - point3[0] * point1[1])

            let g3 = 1 - g1 - g2;
            return [g1, g2, g3]
        }
        // 逐点计算包围盒馁像素点的坐标
        for(let x=boundingBox.x;x<=boundingBox.x+boundingBox.width;x++){
            for(let y=boundingBox.y;y<=boundingBox.y+boundingBox.height;y++){
                const [g1, g2, g3] = gravityCoord([x, y]);
                if(Math.min(g1, g2, g3) < 0) continue;

                let color = undefined;
                // y轴翻转
                if(color2 === undefined || color3 === undefined){
                    color = color1;
                } else {
                    color = this.colorInterpolation_triangle([color1, color2, color3], [g1, g2, g3]);
                }
                // 光照
                this.setData(x, this.height - y, color);
            }
        }
    }
    // 颜色插值函数
    colorInterpolation_triangle([color1, color2, color3], [g1, g2, g3]){
        let color = []
        for(let i=0;i<4;i++){
            color[i] = Math.round(color1[i] * g1 + color2[i] * g2 + color3[i] * g3);
        }
        return color
    }

    draw(){
        this.ctx.putImageData(this.image, 0, 0);
    }
}