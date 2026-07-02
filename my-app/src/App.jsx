import { useEffect, useState, useRef} from 'react'
import './App.css'
import Canvas from './components/Canvas'
import { ColorPalette } from './components/ColorPalette'

function App() {
  const [brush, setBrush] = useState({ 
    r: 0, 
    g: 0, 
    b: 0, 
    type: 'basicbrush', 
    radiusAirbrush: 5, 
    lineWidth: 1 
  });

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <div className='toolbar'>
        <ColorPalette onUpdate={setBrush}/>
      </div>
      <div>
        <Canvas
            width={500}
            height={500}
            brush={brush.type}
            radius={brush.radiusAirbrush}
            lineWidth={brush.lineWidth}
            color={brush}
        />
      </div>
    </div>
  )
}

export default App
