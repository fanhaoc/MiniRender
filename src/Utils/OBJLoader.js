/*
 * @Author: anganao
 * @Date: 2024-03-10 19:58:05
 * @LastEditors: anganao
 * @LastEditTime: 2024-03-22 17:45:38
 * @FilePath: \tinyRenderJS\src\Utils\OBJLoader.js
 * @Description: 
 * Copyright (c) 2024 by VGE, All Rights Reserved. 
 */
export default class Loader{
    states = false;
    vertices = [];
    normals = [];
    faces =[];
    constructor(){
        const fileReader = new FileReader();
        const fileButton = document.getElementById('file');
        fileButton.addEventListener('change', (e)=>{
            const file = e.target.files[0];
            fileReader.readAsText(file);
        })
        fileReader.onload = (e)=>{
            this.loadTomodel(e.target.result)
        }
    }
    loadTomodel(dataString){
        let count = 1;
        const lines = dataString.split('\n');
        for(let j=0;j<lines.length;j++){
            const elements = lines[j].split(' ');
            if(elements[0] === 'v'){
                this.vertices.push([parseFloat(elements[1]), parseFloat(elements[2]), parseFloat(elements[3])])
            } else if(elements[0] === 'f'){
                let points = [];
                let normals = [];
                for(let i=1;i<elements.length;i++){
                    const pnt = elements[i].split('/');
                    points.push(pnt[0] - 1);
                    normals.push(pnt[2] - 1);
                }
                this.faces.push({
                    points,
                    normals
                });
            } else if(elements[0] === 'vn'){
                this.normals.push([parseFloat(elements[1]), parseFloat(elements[2]), parseFloat(elements[3])])
            }
        };
        this.states = true;
    }
    getData(callback){
        const id = setInterval(()=>{
            if(this.states){
                callback();
                clearInterval(id);
            }
        }, 1000);
    }
}