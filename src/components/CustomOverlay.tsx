import { OverlayPanel } from "primereact/overlaypanel"
import { useRef, useState, type Dispatch, type SetStateAction } from "react"
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import 'primeicons/primeicons.css';
import "./CustomOverlay.css";

function CustomOverlay({setRowsToSelect}:{setRowsToSelect:Dispatch<SetStateAction<number>>}) {
    const panelRef = useRef<OverlayPanel>(null);
    const [inputValue,SetInputValue] = useState<number>(0);
    function onClickHandler() {
        setRowsToSelect(inputValue);
        panelRef.current?.hide();
    }
  return (
    <div className="panel-container" >
        <Button  onClick={(e) => panelRef.current?.toggle(e)}><i className="pi pi-angle-down"></i></Button>
        <OverlayPanel ref={panelRef} className="panel">
            <label htmlFor="Selector" style={{fontSize:"20px"}}>Selector</label>
            <InputText id="Selector" style={{padding:"6px"}} placeholder="enter a number" type="text" onChange={(e)=>SetInputValue(parseInt(e.target.value))} keyfilter="int"/>
            <Button onClick={onClickHandler} style={{backgroundColor:"green", padding:"7px" , borderRadius:"5px" ,color:"white"}}>Submit</Button>
        </OverlayPanel>
    </div>
  )
}

export default CustomOverlay