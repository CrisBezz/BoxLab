// Adapted from Klecks cc24e97712c199929760250881ffe2e25233ce6d (MIT).
// Copyright (c) 2026 bitbof (bitbof.com). See vendor/KLECKS-LICENSE.
// PointLine/BezierLine + Vec2 only; unrelated Paint.NET SplineInterpolator omitted.
// Adaptation: TypeScript erased, UI/barrel imports replaced with the small numeric
// dependencies below. No Klecks pen rasterizer/history/selection or editor input.
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const mix=(a,b,t)=>a*(1-t)+b*t;
const dist=(x,y,a,b)=>Math.hypot(x-a,y-b);
const copyObj=v=>({...v});
const pointsToAngleDeg=(a,b)=>Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI;
const Vec2 = {
    add: function(p1, p2) {
        return {
            x: p1.x + p2.x,
            y: p1.y + p2.y
        };
    },
    sub: function(p1, p2) {
        return {
            x: p1.x - p2.x,
            y: p1.y - p2.y
        };
    },
    nor: function(p) {
        const len = Math.sqrt(p.x ** 2 + p.y ** 2);
        return {
            x: p.x / len,
            y: p.y / len
        };
    },
    len: function(p) {
        return Math.sqrt(p.x ** 2 + p.y ** 2);
    },
    dist: function(p1, p2) {
        return Vec2.len(Vec2.sub(p1, p2));
    },
    mul: function(p, s) {
        return {
            x: p.x * s,
            y: p.y * s
        };
    },
    angle: function(p1, p2) {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x);
    },
    dot: function(a, b) {
        const aArr = [
            a.x,
            a.y
        ];
        const bArr = [
            b.x,
            b.y
        ];
        return aArr.map((x, i)=>aArr[i] * bArr[i]).reduce((m, n)=>m + n);
    }
};

export class PointLine {
    segmentArr;
    constructor(p){
        this.segmentArr = [];
        for(let i = 0; i < p.points.length; i++){
            ((i)=>{
                let length = 0;
                if (i < p.points.length - 1) {
                    length = dist(p.points[i].x, p.points[i].y, p.points[i + 1].x, p.points[i + 1].y);
                }
                this.segmentArr[i] = {
                    x: p.points[i].x,
                    y: p.points[i].y,
                    length: length
                };
            })(i);
        }
    }
    getAtDist(dist) {
        let remainder = Math.min(this.getLength(), dist);
        let i = 0;
        for(; remainder > this.segmentArr[i].length && i < this.segmentArr.length - 2; i++){
            remainder -= this.segmentArr[i].length;
        }
        const fac = Math.min(1, Math.max(0, remainder / this.segmentArr[i].length));
        return {
            x: this.segmentArr[i].x * (1 - fac) + this.segmentArr[i + 1].x * fac,
            y: this.segmentArr[i].y * (1 - fac) + this.segmentArr[i + 1].y * fac
        };
    }
    getLength() {
        let result = 0;
        for(let i = 0; i < this.segmentArr.length - 1; i++){
            result += this.segmentArr[i].length;
        }
        return result;
    }
}
export class BezierLine {
    pointArr;
    lastDot = 0;
    lastPoint;
    lastCallbackPoint;
    lastAngle;
    lastSpacing;
    getBezierPoints(p1, p2, p3, p4, resolution) {
        const curvePoints = [];
        let t;
        for(let i = 0; i <= resolution; i++){
            t = i / resolution;
            curvePoints[curvePoints.length] = {
                x: (1 - t) ** 3 * p1.x + 3 * (1 - t) ** 2 * t * p2.x + 3 * (1 - t) * t ** 2 * p3.x + t ** 3 * p4.x,
                y: (1 - t) ** 3 * p1.y + 3 * (1 - t) ** 2 * t * p2.y + 3 * (1 - t) * t ** 2 * p3.y + t ** 3 * p4.y
            };
        }
        return curvePoints;
    }
    constructor(){
        this.pointArr = [];
    }
    add(x, y, spacing, callback, controlsCallback) {
        if (this.lastPoint && x === this.lastPoint.x && y === this.lastPoint.y) {
            return;
        }
        this.lastPoint = {
            x,
            y
        };
        this.pointArr[this.pointArr.length] = {
            x,
            y,
            spacing
        };
        if (this.pointArr.length === 1) {
            this.lastSpacing = spacing;
            return;
        } else if (this.pointArr.length === 2) {
            this.pointArr[0].dir = Vec2.nor(Vec2.sub(this.pointArr[1], this.pointArr[0]));
            this.lastDot = spacing;
            this.lastSpacing = spacing;
            return;
        } else {
            const pointM1 = this.pointArr.at(-1);
            const pointM2 = this.pointArr.at(-2);
            const pointM3 = this.pointArr.at(-3);
            pointM2.dir = Vec2.nor(Vec2.sub(pointM1, pointM3));
            if (isNaN(pointM2.dir.x) || isNaN(pointM2.dir.y)) {
                pointM2.dir = copyObj(pointM3.dir);
            }
        }
        const a = this.pointArr.at(-3);
        const b = this.pointArr.at(-2);
        const p1 = a;
        const p2 = Vec2.add(a, Vec2.mul(a.dir, Vec2.dist(a, b) / 4));
        const p3 = Vec2.sub(b, Vec2.mul(b.dir, Vec2.dist(a, b) / 4));
        const p4 = b;
        let pointLine;
        if (callback) {
            const curvePoints = this.getBezierPoints(p1, p2, p3, p4, 20);
            pointLine = new PointLine({
                points: curvePoints
            });
        } else {
            pointLine = new PointLine({
                points: [
                    p1,
                    p4
                ]
            });
        }
        const len = pointLine.getLength();
        let tempSpacing = mix(this.lastSpacing, spacing, clamp(this.lastDot / len, 0, 1));
        let d = this.lastDot;
        for(; d <= len; d += tempSpacing){
            tempSpacing = mix(this.lastSpacing, spacing, clamp(d / len, 0, 1));
            const point = pointLine.getAtDist(d);
            const angle = this.lastCallbackPoint ? pointsToAngleDeg(this.lastCallbackPoint, point) : undefined;
            if (callback) {
                callback({
                    x: point.x,
                    y: point.y,
                    t: d / len,
                    angle: angle,
                    dAngle: this.lastCallbackPoint ? angle - this.lastAngle : 0
                });
            }
            this.lastCallbackPoint = point;
            this.lastAngle = angle;
        }
        if (callback) {
            this.lastDot = d - len;
        } else {
            this.lastDot = 0;
            controlsCallback?.({
                p1: p1,
                p2: p2,
                p3: p3,
                p4: p4
            });
        }
        this.lastSpacing = spacing;
    }
    addFinal(spacing, callback, controlsCallback) {
        if (this.pointArr.length < 2) {
            return;
        }
        const p1 = this.pointArr.at(-2);
        const p2 = this.pointArr.at(-1);
        const newP = Vec2.add(p2, Vec2.sub(p2, p1));
        this.add(newP.x, newP.y, spacing, callback, controlsCallback);
    }
}
