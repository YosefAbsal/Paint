function BasicBrush(ctx, { x, y, lineWidth}) {
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x, y);
    ctx.moveTo(x, y);
}

function GradientBrush(ctx, { x, y, coords, colorStops }) {
    let gradient = ctx.createLinearGradient(
        coords.x0,
        coords.y0, 
        coords.x1, 
        coords.y1
    );

    for (const colorStop of colorStops) {
        gradient.addColorStop(colorStop.percent, colorStop.color)
    }

    context.strokeStyle = gradient;

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
    basicbrush: BasicBrush,
    gradientbrush: GradientBrush,
    airbrush: AirBrush
};

export default function getBrush(type) {
    return brushes[type];
}

