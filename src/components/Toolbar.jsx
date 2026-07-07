import './Toolbar.css'
import Canvas from './Canvas'

function Toolbar() {
  function brush1() {
    console.log(123);
  }
  return (
    <>
      <div>
        <div className="toolbar">
          <div className="tools">
            <div className="brushes">
              <button id="brush1" onClick={brush1}>Brush 1</button>
            </div>
            |
            <div className="brushSizes">
              <select id="sizes">
                <option>Small</option>
                <option>Meduim</option>
                <option>Large</option>
              </select>
            </div>
            |
            <div className="shapes">shapes</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Toolbar;