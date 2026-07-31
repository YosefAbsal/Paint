function Pen(ctx, { x, y, lineWidth, brush}) {
    if (brush === 'eraser')
        ctx.strokeStyle = 'white';

    ctx.lineWidth = lineWidth;
    ctx.lineTo(x, y);
    ctx.moveTo(x, y);
}

function AirBrush(ctx, { x, y, radius }) {
    for (let i = 0; i < Math.floor(radius); ++i) {
        const angle = Math.random() * 2 * Math.PI;

        const r = Math.sqrt(Math.random()) * radius;

        const offsetX = r * Math.cos(angle);
        const offsetY = r * Math.sin(angle);

        const startX = x + offsetX;
        const startY = y + offsetY;

        ctx.moveTo(startX, startY);

        const oddOrEven = Math.floor(Math.random() * 10);
        (oddOrEven % 2 === 0) ? ctx.lineTo(startX + Math.random() * 2, startY) : 
                                ctx.lineTo(startX, startY + Math.random() * 2);
    }
}

const brushes = {
    pen: Pen,
    eraser: Pen,
    airbrush: AirBrush
};

 function getBrush(type) {
    return brushes[type];
}

export default getBrush;