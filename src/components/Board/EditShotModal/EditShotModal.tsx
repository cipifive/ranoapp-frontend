import { FC, useState } from "react"
import Modal from 'react-modal';
import { Board } from "../Board";
import { Hole } from "../Items/Hole";
import { Frog } from "../Items/Frog";
import { Bridge } from "../Items/Bridge";
import { Mill } from "../Items/Mill";
import { GiFrogPrince, GiHole } from "react-icons/gi";
import { FaBridge } from "react-icons/fa6";
import { PiSpinnerBallLight } from "react-icons/pi";
import { useRoundStore } from "../../../Zustand/roundStore";
import { IRound } from "../../../models/round";

const customStyles:any = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '85%'
    },
  };

  Modal.setAppElement('#root');

export const EditShotModal:FC<any> = (props):JSX.Element => {

    const {
        modalIsOpen,
        setModalIsOpen,
        selectedShot,
        history,
        
    } = props

    const [selectedItem, setSelectedItem] = useState<any>()

    const { setHistory, setPoints, points }:IRound = useRoundStore()

    const renderItemBoard = (selectedItem?:number) => {
        switch(selectedItem ?? history[selectedShot]?.box) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 6:
                return 'Agujero (5 pts)'
            case 5:
                return 'Rana (50 pts)'
            case 7:
            case 9:
                return 'Puente (10 pts)'
            case 8:
                return 'Molino (25 pts)'
            case 10:
                return 'Fuera (0 pts)'
        }
    }

    const renderPoints = () => {
        switch(selectedItem) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 6:
                return 5
            case 5:
                return 50
            case 7:
            case 9:
                return 10
            case 8:
                return 25
            case 10:
                return 0
            default:
                return 0
        }
    }

    const handleClose = () => {
        setModalIsOpen(false)
        setSelectedItem(undefined)
    }

    const handleUpdateShot = () => {
        let aux = history.map((h:any,index:number) => {
            if(index === selectedShot) {
                let puntos = points - h.points + renderPoints() 
                setPoints(puntos)
                return {...h,box:selectedItem,points:renderPoints()}
            } 
            return h
        })
        setHistory(aux)
        handleClose()
    }

    return (
        <Modal
        isOpen={modalIsOpen}
    
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className="font-game2">El lanzamiento {selectedShot + 1} fue:</h2>
        <button>{renderItemBoard()}</button>
        <div className="font-game2">Selecciona la casilla por la que quieras cambiarlo</div>
        
        <div className="grid grid-cols-3 p-2 gap-4 h-1/2 w-full  ">
            <div className={`flex justify-center items-center rounded ${selectedItem === 1? 'bg-amber-400 text-black' : 'bg-[#100235] text-amber-400 '}   border rounded relative`} onClick={() => setSelectedItem(1)}>
                <GiHole size={65} />
            </div>
            <div className={`flex justify-center items-center rounded  ${selectedItem === 2? 'bg-amber-400 text-black' : 'bg-[#100235] text-amber-400 '}   border rounded relative`} onClick={() => setSelectedItem(2)}>
                <GiHole size={65} />
            </div>
            <div className={`flex justify-center items-center rounded ${selectedItem === 3? 'bg-amber-400 text-black' : 'bg-[#100235] text-amber-400 '}   border rounded  relative`} onClick={() => setSelectedItem(3)}>
                <GiHole size={65} />
            </div>
              
            <div className={`flex justify-center items-center rounded ${selectedItem === 4? 'bg-amber-400 text-black' : 'bg-[#100235] text-amber-400 '}   border rounded  relative`} onClick={() => setSelectedItem(4)}>
                <GiHole size={65} />
            </div>
            <div className={`flex justify-center items-center rounded ${selectedItem === 5 ? 'bg-amber-400 text-black' : 'bg-[#100235] text-amber-400 '}   border rounded  relative`} onClick={() => setSelectedItem(5)}>
                <GiFrogPrince size={65} />
            </div>
            <div className={`flex justify-center items-center rounded ${selectedItem === 6? 'bg-amber-400 text-black' : 'bg-[#100235] text-amber-400 '}   border rounded  relative`} onClick={() => setSelectedItem(6)}>
                <GiHole size={65} />
            </div>
            <div className={`flex justify-center itens-center rounded ${selectedItem === 7? 'bg-amber-400 text-black' : 'bg-[#100235] text-amber-400 '}   border rounded  relative`} onClick={() => setSelectedItem(7)}>
                <FaBridge size={65} />
            </div>
            <div className={`flex justify-center items-center rounded ${selectedItem === 8? 'bg-amber-400 text-black' : 'bg-[#100235] text-amber-400 '}   border rounded relative`} onClick={() => setSelectedItem(8)}>
                <PiSpinnerBallLight  size={65} />
            </div>
            <div className={`flex justify-center itens-center rounded ${selectedItem === 9? 'bg-amber-400 text-black' : 'bg-[#100235] text-amber-400 '}   border rounded  relative`} onClick={() => setSelectedItem(9)}>
                <FaBridge size={65} />
            </div>
            </div>
            <div className={`flex justify-center items-center ${selectedItem === 10? 'bg-amber-400 text-black' : 'bg-[#100235] text-amber-400 '} text-3xl   border rounded  mr-2 ml-2  rounded h-16 relative`}  onClick={() => setSelectedItem(10)} >
                <span className={`font-game2 ${selectedItem === 10?'text-black' : ''}`}>FUERA</span>
            </div>
            <h2 className="font-game2 mt-2">El lanzamiento se sustituirá por:</h2>
            <button>{renderItemBoard(selectedItem)}</button>
            <div className="flex w-full justify-around items-center p-4  mt-2 rounded">
                <span className={`text-center w-1/3  p-3 text-xl font-game2   rounded ${!selectedItem? 'bg-zinc-300' : 'bg-[#fcd34d]'}`} onClick={!selectedItem? () => {} : () => handleUpdateShot()}>Editar</span>
            </div>
      </Modal>
    )
}