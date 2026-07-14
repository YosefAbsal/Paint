import { useRef, useEffect, useState } from 'react';
import './ColorPalette.css';
import airbrushArt from '../assets/AIRBRUSHART.png';
import pencilArt from '../assets/PENCILART.png';
import eraserArt from '../assets/ERASER.png';

let exportRgb = {};

function ColorPalette(props) {
    const [brush, setBrush] = useState({
    r: 0, 
    g: 0, 
    b: 0, 
    type: 'basicbrush', 
    radiusAirbrush: 5, 
    lineWidth: 1 
  });
    
    useEffect(() => {
        props.onUpdate(brush);
    });

    const newColor = (r, g, b, id) => {
        return {
            r: r,
            g: g,
            b: b,
            id: id
        }
    }

    const colors = [];
    let id = 0;
    colors.push(newColor(0, 0, 0, ++id))
    for (let c = 40; c < 256; c += 60) {
        for (let r = 40; r < 256; r += 60) {
            for (let b = 40; b < 256; b += 60) {
                colors.push(newColor(b, r, c, ++id))
            }
        }
    }
    colors.push(newColor(255, 255, 255, ++id))

    let classNames = [
        {input: 'rInput', colorVal: brush.r, r: 'r'}, 
        {input: 'gInput', colorVal: brush.g, g: 'g'}, 
        {input: 'bInput', colorVal: brush.b, b: 'b'}, 
    ];

    const isInt = (value) => {
        let intMaybe = Number(value);
        return (Number.isInteger(intMaybe)) ? intMaybe : 0;
    };

    return (
        <div className='palette'>
            <div className='colors'>
                {colors.map((c, i) => {
                    return <button
                        className='colorButtons'
                        key={c.id}
                        style={{
                            backgroundColor: `rgb(${c.r}, ${c.g}, ${c.b})`
                        }}
                        onClick={() => {
                            setBrush({
                                ...brush,
                                r: c.r,
                                g: c.g,
                                b: c.b,
                            });
                        }}>
                    </button>
                })}
            </div>
            <div className='slidersAndColorDisp'>
                {classNames.map((name, i) => {
                    return <input
                        className= {`${name.input}`}
                        type='range'
                        min={0}
                        max={255}
                        value={`${name.colorVal}`}
                        onChange={(e) => {
                            if (i === 0) {
                                setBrush({
                                    ...brush,
                                    r: isInt(e.target.value)
                                });
                            } else if (i === 1) {
                                setBrush({
                                    ...brush,
                                    g: isInt(e.target.value)
                                });
                            } else {
                                setBrush({
                                    ...brush,
                                    b: isInt(e.target.value)
                                });
                            }
                         }
                        } />
                })}
                <div 
                    className='colorDisplay' 
                    style={{
                        width: 40,
                        height: 40,
                        backgroundColor: `rgb(${brush.r}, ${brush.g}, ${brush.b})`
                }} />
            </div>
            <div className='toolButtons'>
                <button onClick={() => setBrush({...brush, type: 'airbrush'})}>
                    <img src={airbrushArt} alt='air brush'/>
                </button>
                <button onClick={() => setBrush({...brush, type: 'basicbrush'})}>
                    <img src={pencilArt} alt='pen'/>
                </button>
                <button onClick={() => setBrush({...brush, r: 255, g: 255, b: 255, type: 'basicbrush'})}>
                    <img src={eraserArt} alt='eraser'/>
                </button>
            </div>
            <div className='brushSize'>
                <button onClick={() => setBrush({...brush, radiusAirbrush: 5, lineWidth: 1 })} >Small</button>
                <button onClick={() => setBrush({...brush, radiusAirbrush: 15, lineWidth: 3})} >Medium</button>
                <button onClick={() => setBrush({...brush, radiusAirbrush: 25, lineWidth: 7})} >Large</button>
            </div>
        </div>
    );
}

export { ColorPalette, exportRgb };