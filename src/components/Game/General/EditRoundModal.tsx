import { FC, useState } from "react"
import Modal from 'react-modal';
import { GiFrogPrince, GiHole } from "react-icons/gi";
import { FaBridge } from "react-icons/fa6";
import { PiSpinnerBallLight } from "react-icons/pi";
import { updateRound } from "../../../services/game_service";
import { success } from "../../../utils/toast";


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

export const EditRoundModal:FC<any> = (props):JSX.Element => {

    const {
        modalIsOpen,
        setModalIsOpen,
        selectedRound,
        setSelectedRound,
        flag,
        setFlag
        
    } = props


    const [selectedItem, setSelectedItem] = useState<any>()

    const [selectedShot, setSelectedShot] = useState<any>(11)

    const [loading, setLoading] = useState<boolean>(false)

    const renderItemBoard = (selectedItem?:number) => {
        let item:number = 1;
        if(selectedItem) {
            item = selectedRound?.boxes[selectedItem - 1]
        }
        
        switch(item ) {
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

    

    const renderPoints = (item:any) => {
        switch(item) {
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
        setSelectedRound(undefined)
    }

    const handleUpdateRound = async() => {
        try {
            setLoading(true)
            let body = {
                id_user: selectedRound?.id_user,
                id_round: selectedRound?.id_round ,
                points: selectedRound?.points ,
                boxes: JSON.stringify(selectedRound?.boxes) ,
                id_game: selectedRound?.id_game ,
            }
            const response = await updateRound(body)
            if(response.status === 200) {
                handleClose()
                setFlag(!flag)
                success("Ronda editada con éxito")
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
        
    }

    const handleSelectShot = (e:any) => {
        if(e.target.value == 11) {
            setSelectedShot(11)
        } else {
            let selectedIndex = e.target.value.split(" ")[1]
            setSelectedShot(parseInt(selectedIndex))
        }

        setSelectedItem(undefined)
        
    }
    
    const handleSelectItem = (id:number) => {
        setSelectedItem(id)
        let minusPoints:number = renderPoints(selectedRound?.boxes[selectedShot - 1])
        
        let plusPoints:number = renderPoints(id)

        let newBoxes = [...selectedRound?.boxes]
        newBoxes[selectedShot - 1] = id
        setSelectedRound({...selectedRound, points: (selectedRound?.points - minusPoints + plusPoints), boxes: newBoxes  })
    }

    return (
        <Modal
        isOpen={modalIsOpen}
    
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className="font-game2 text-black">Puntos de la ronda {selectedRound?.id_round} =  <b className="text-2xl text-amber-400">{selectedRound?.points}pts</b></h2>
      
        <div className="">
                <select className="p-3 font-game2 rounded bg-white text-black border rounded border-amber-400  w-10/12" onChange={handleSelectShot}>
                    <option value={11}>Todas</option>
                    {selectedRound?.boxes?.map((h:any, index:number) => {
                        return <option value={h.shot}>Lanzamiento {index + 1}</option>
                    })}
                </select>
            </div>
        {
            selectedShot !== 11 && (<h2 className="font-game2 text-black">El lanzamiento seleccionado fue {renderItemBoard(selectedShot)}. Selecciona la casilla por la que lo quieras editar.</h2>)
        }
        
        
        
        <div className="grid grid-cols-3 p-2 gap-4 h-1/2 w-full  ">
            <div className={`flex justify-center items-center rounded ${selectedItem === 1? 'bg-amber-400 text-black' : 'bg-[#100235] text-amber-400 '}   border rounded relative`} onClick={selectedShot == 11 || loading? () => {} : () => handleSelectItem(1)}>
            {
                selectedShot !== 11?
                selectedRound?.boxes.map((h:any,index:number) => {
                    if(h === 1 && (index + 1) === selectedShot) {
                        return (
                            <span key={`${index}`} className={`absolute text-sm`} style={{top:(index * 8),right:0,fontWeight:"bold"}}>{index + 1}</span>
                        )
                    }
                })
                :
                selectedRound?.boxes?.map((h:any,index:number) => {
                    if(h === 1) {
                        return (
                            <span key={`${index}`} className={`absolute text-sm`} style={{top:(index * 8),right:0,fontWeight:"bold"}}>{index + 1}</span>
                        )
                    }
                })
            }
                <GiHole size={65} />
            </div>
            <div className={`flex justify-center items-center rounded  ${selectedItem === 2? 'bg-amber-400 text-black' : 'bg-[#100235] text-amber-400 '}   border rounded relative`} onClick={selectedShot == 11 || loading? () => {} : () => handleSelectItem(2)}>
            {
                selectedShot !== 11?
                selectedRound?.boxes.map((h:any,index:number) => {
                    if(h === 2 && (index + 1) === selectedShot) {
                        return (
                            <span key={`${index}`} className={`absolute text-sm`} style={{top:(index * 8),right:0,fontWeight:"bold"}}>{index + 1}</span>
                        )
                    }
                })
                :
                selectedRound?.boxes?.map((h:any,index:number) => {
                    if(h === 2) {
                        return (
                            <span key={`${index}`} className={`absolute text-sm`} style={{top:(index * 8),right:0,fontWeight:"bold"}}>{index + 1}</span>
                        )
                    }
                })
            }
                <GiHole size={65} />
            </div>
            <div className={`flex justify-center items-center rounded ${selectedItem === 3? 'bg-amber-400 text-black' : 'bg-[#100235] text-amber-400 '}   border rounded  relative`} onClick={selectedShot == 11 || loading? () => {} : () => handleSelectItem(3)}>
            {
                selectedShot !== 11?
                selectedRound?.boxes.map((h:any,index:number) => {
                    if(h === 3 && (index + 1) === selectedShot) {
                        return (
                            <span key={`${index}`} className={`absolute text-sm`} style={{top:(index * 8),right:0,fontWeight:"bold"}}>{index + 1}</span>
                        )
                    }
                })
                :
                selectedRound?.boxes?.map((h:any,index:number) => {
                    if(h === 3) {
                        return (
                            <span key={`${index}`} className={`absolute text-sm`} style={{top:(index * 8),right:0,fontWeight:"bold"}}>{index + 1}</span>
                        )
                    }
                })
            }
                <GiHole size={65} />
            </div>
              
            <div className={`flex justify-center items-center rounded ${selectedItem === 4? 'bg-amber-400 text-black' : 'bg-[#100235] text-amber-400 '}   border rounded  relative`} onClick={selectedShot == 11 || loading? () => {} : () => handleSelectItem(4)}>
            {
                selectedShot !== 11?
                selectedRound?.boxes?.map((h:any,index:number) => {
                    if(h === 4 && (index + 1) === selectedShot) {
                        return (
                            <span key={`${index}`} className={`absolute text-sm`} style={{top:(index * 8),right:0,fontWeight:"bold"}}>{index + 1}</span>
                        )
                    }
                })
                :
                selectedRound?.boxes?.map((h:any,index:number) => {
                    if(h === 4) {
                        return (
                            <span key={`${index}`} className={`absolute text-sm`} style={{top:(index * 8),right:0,fontWeight:"bold"}}>{index + 1}</span>
                        )
                    }
                })
            }
                <GiHole size={65} />
            </div>
            <div className={`flex justify-center items-center rounded ${selectedItem === 5 ? 'bg-amber-400 text-black' : 'bg-[#100235] text-amber-400 '}   border rounded  relative`} onClick={selectedShot == 11 || loading? () => {} : () => handleSelectItem(5)}>
            {
                selectedShot !== 11?
                selectedRound?.boxes?.map((h:any,index:number) => {
                    if(h === 5 && (index + 1) === selectedShot) {
                        return (
                            <span key={`${index}`} className={`absolute text-sm`} style={{top:(index * 8),right:0,fontWeight:"bold"}}>{index + 1}</span>
                        )
                    }
                })
                :
                selectedRound?.boxes?.map((h:any,index:number) => {
                    if(h === 5) {
                        return (
                            <span key={`${index}`} className={`absolute text-sm`} style={{top:(index * 8),right:0,fontWeight:"bold"}}>{index + 1}</span>
                        )
                    }
                })
            }
                <GiFrogPrince size={65} />
            </div>
            <div className={`flex justify-center items-center rounded ${selectedItem === 6? 'bg-amber-400 text-black' : 'bg-[#100235] text-amber-400 '}   border rounded  relative`} onClick={selectedShot == 11 || loading? () => {} : () => handleSelectItem(6)}>
            {
                selectedShot !== 11?
                selectedRound?.boxes?.map((h:any,index:number) => {
                    if(h === 6 && (index + 1) === selectedShot) {
                        return (
                            <span key={`${index}`} className={`absolute text-sm`} style={{top:(index * 8),right:0,fontWeight:"bold"}}>{index + 1}</span>
                        )
                    }
                })
                :
                selectedRound?.boxes?.map((h:any,index:number) => {
                    if(h === 6) {
                        return (
                            <span key={`${index}`} className={`absolute text-sm`} style={{top:(index * 8),right:0,fontWeight:"bold"}}>{index + 1}</span>
                        )
                    }
                })
            }
                <GiHole size={65} />
            </div>
            <div className={`flex justify-center itens-center rounded ${selectedItem === 7? 'bg-amber-400 text-black' : 'bg-[#100235] text-amber-400 '}   border rounded  relative`} onClick={selectedShot == 11 || loading? () => {} : () => handleSelectItem(7)}>
            {
                selectedShot !== 11?
                selectedRound?.boxes?.map((h:any,index:number) => {
                    if(h === 7 && (index + 1) === selectedShot) {
                        return (
                            <span key={`${index}`} className={`absolute text-sm`} style={{top:(index * 8),right:0,fontWeight:"bold"}}>{index + 1}</span>
                        )
                    }
                })
                :
                selectedRound?.boxes?.map((h:any,index:number) => {
                    if(h === 7) {
                        return (
                            <span key={`${index}`} className={`absolute text-sm`} style={{top:(index * 8),right:0,fontWeight:"bold"}}>{index + 1}</span>
                        )
                    }
                })
            }
                <FaBridge size={65} />
            </div>
            <div className={`flex justify-center items-center rounded ${selectedItem === 8? 'bg-amber-400 text-black' : 'bg-[#100235] text-amber-400 '}   border rounded relative`} onClick={selectedShot == 11 || loading? () => {} : () => handleSelectItem(8)}>
            {
                selectedShot !== 11?
                selectedRound?.boxes?.map((h:any,index:number) => {
                    if(h === 8 && (index + 1) === selectedShot) {
                        return (
                            <span key={`${index}`} className={`absolute text-sm`} style={{top:(index * 8),right:0,fontWeight:"bold"}}>{index + 1}</span>
                        )
                    }
                })
                :
                selectedRound?.boxes?.map((h:any,index:number) => {
                    if(h === 8) {
                        return (
                            <span key={`${index}`} className={`absolute text-sm`} style={{top:(index * 8),right:0,fontWeight:"bold"}}>{index + 1}</span>
                        )
                    }
                })
            }
                <PiSpinnerBallLight  size={65} />
            </div>
            <div className={`flex justify-center itens-center rounded ${selectedItem === 9? 'bg-amber-400 text-black' : 'bg-[#100235] text-amber-400 '}   border rounded  relative`} onClick={selectedShot == 11 || loading? () => {} : () => handleSelectItem(9)}>
            {
                selectedShot !== 11?
                selectedRound?.boxes?.map((h:any,index:number) => {
                    if(h === 9 && (index + 1) === selectedShot) {
                        return (
                            <span key={`${index}`} className={`absolute text-sm`} style={{top:(index * 8),right:0,fontWeight:"bold"}}>{index + 1}</span>
                        )
                    }
                })
                :
                selectedRound?.boxes?.map((h:any,index:number) => {
                    if(h === 9) {
                        return (
                            <span key={`${index}`} className={`absolute text-sm`} style={{top:(index * 8),right:0,fontWeight:"bold"}}>{index + 1}</span>
                        )
                    }
                })
            }
                <FaBridge size={65} />
            </div>
            </div>
            <div className={`flex justify-center items-center ${selectedItem === 10? 'bg-amber-400 text-black' : 'bg-[#100235] text-amber-400 '} text-3xl   border rounded  mr-2 ml-2  rounded h-16 relative`}  onClick={selectedShot == 11 || loading? () => {} : () => handleSelectItem(10)} >
            {
                selectedShot !== 11?
                selectedRound?.boxes?.map((h:any,index:number) => {
                    if(h === 10 && (index + 1) === selectedShot) {
                        return (
                            <span key={`${index}`} className={`absolute text-sm`} style={{top:0,right:(index * 8),fontWeight:"bold"}}>{index + 1}</span>
                        )
                    }
                })
                :
                selectedRound?.boxes?.map((h:any,index:number) => {
                    if(h === 10) {
                        return (
                            <span key={`${index}`} className={`absolute text-sm`} style={{top:0,right:(index * 8),fontWeight:"bold"}}>{index + 1}</span>
                        )
                    }
                })
            }
                <span className={`font-game2 ${selectedItem === 10?'text-black' : ''}`}>FUERA</span>
            </div>
            <div className="flex w-full justify-around items-center p-4  mt-2 rounded">
            <span className={`text-center w-1/3  p-3 text-xl font-game2   rounded ${'bg-zinc-300'}`} onClick={loading? () => {} : () => handleClose()}>Cerrar</span>
                <span className={`text-center w-1/3  p-3 text-xl font-game2   rounded ${loading? 'bg-zinc-300' : 'bg-[#fcd34d]'}`} onClick={loading? () => {} : () =>handleUpdateRound()}>{loading? <div className="lds-ellipsis-btn"><div></div><div></div><div></div><div></div></div> : 'Guardar'}</span>
            </div>
      </Modal>
    )
}