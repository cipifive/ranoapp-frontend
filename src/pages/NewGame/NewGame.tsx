import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import clic_sound from '../../assets/button_clic.wav'
import { useTransitionStore } from "../../Zustand/transitionStore";
import { ISound } from "../../models/settings";
import { useSoundStore } from "../../Zustand/soundStore";
import { catchResponse, handleClickHomeButton } from "../../utils/helperFunctions";
import { FaLongArrowAltLeft } from "react-icons/fa";
import moment from "moment";
import { MultiSelect } from "primereact/multiselect";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { CountDown } from "../../components/NewGame/CountDown";
import { IUser } from "../../models/users";
import { getUsers } from "../../services/user_service";
import { createGame } from "../../services/game_service";
import { INewGame } from "../../models/game";


export const NewGame:FC<any> = ():JSX.Element => {

    const { setReduce }:any = useTransitionStore()

    const { sounds }:ISound = useSoundStore()

    const navigate:any = useNavigate()

    const audioRef:any = useRef()

    const [nameGame, setNameGame] = useState<string>(moment().format('DD-MM-YYYY HH:mm'))

    const [newGameID, setNewGameID] = useState<number>(1)

    const [players, setPlayers] = useState<any[]>([])

    const [showTimer, setShowTimer] = useState(false);

    const [users, setUsers] = useState<IUser[]>([])

    const [loading, setLoading] = useState<boolean>(false)


    const handleItemTemplate = (params:any) => {
       
        return <span className="font-game2">{params.name}</span>
    }

    const reorder = (list:any, startIndex:any, endIndex:any) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
      };
      
      const grid = 8;
      
      const getItemStyle = (isDragging:any, draggableStyle:any) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: 8,
        margin: `0 0 ${grid}px 0`,
        border: '1px solid black',
        
      
        // change background colour if dragging
        background: isDragging ? "orange" : "#fcd34d",
      
        // styles we need to apply on draggables
        ...draggableStyle
      });
      
      const getListStyle = (isDraggingOver:any) => ({
        background: isDraggingOver ? "transparent" : "transparent",
        padding: 4,
        width: '100%',
        
      });

      
    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
          }
      
          const items = reorder(
            players,
            result.source.index,
            result.destination.index
          );
         setPlayers(items)
    };

    const handleStartGame = async() => {
        try {
            setLoading(true)
            const jugadores:IUser[] = players.map((p:string) => ({
                id: p,
                name: users.find((u:any) => u.id == p)?.name ?? '-'
            }))
            let body:INewGame = {
                name: nameGame,
                players: jugadores
            }

            const response = await createGame(body)
            if(response.status === 200) {
                const { data } = response.data
                setNewGameID(data)
                setTimeout(() => {
                    setShowTimer(true)
                    setLoading(false)
                },500)
            } else {
                setLoading(false)
            }
        } catch (err:any) {
            setLoading(false)
        }
        
    }


    const fetchUsers = async() => {
        try {
            const response = await getUsers()
            const { data } = response
            setUsers(data)
        } catch (err:any) {
            catchResponse(err)
        }
    }

    useEffect(() => {
        fetchUsers()
    },[])


    return (
        <div className="flex justify-start items-center flex-col w-full p-4 h-full   screen_component_aument relative">
            <span  onClick={() => handleClickHomeButton("/", audioRef,setReduce,navigate)} ><FaLongArrowAltLeft className="absolute top-3 left-3 z-10" size={34} color="orange" /></span>
            <span className="text-amber-400 font-game2 text-3xl h-20">Nueva partida</span>
            <div className={`flex flex-col justify-start h-full p-4 pt-10 w-full items-start ${showTimer? 'opacity-25' : ''}`}>
                
                <div className="text-[#fcd34d] font-game2 text-2xl w-full mb-4">
                    <span>Nombre de la partida</span>
                    <input className="w-full h-12 font-game2 rounded bg-white  text-xl p-1 text-[#100235]" onChange={(e:any) => setNameGame(e.target.value)} value={nameGame} />
                </div>
                <div className="flex flex-col  text-[#fcd34d] font-game2 text-2xl w-full  mb-8">
                    <span>Jugadores</span>
                    <MultiSelect value={players} onChange={(e) => setPlayers(e.value)} itemTemplate={handleItemTemplate} options={users} optionValue="id"  optionLabel="name" 
                 placeholder="Selecciona jugadores" maxSelectedLabels={4} className="w-full md:w-20rem text-black font-game2" />
                </div>
                <div className="border border-amber-400 p-3 rounded w-full h-full overflow-y-auto font-game2">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            >
                            {players.map((item, index) => (
                                <Draggable key={item} draggableId={item} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                    )}
                                    >
                                    {users.find((j:IUser) => j.id === item)?.name}
                                    </div>
                                )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            </div>
                        )}
                        </Droppable>
                    </DragDropContext>
                </div>
                <span className={`text-center self-center p-4 text-2xl font-game2 mt-8 ${loading? 'bg-zinc-300' : 'bg-[#fcd34d]'}   rounded`} onClick={loading? () => {} : () => handleStartGame()}>{loading? <div className="lds-ellipsis-btn"><div></div><div></div><div></div><div></div></div> : 'Comenzar'}</span>
                
            </div>
            <audio ref={audioRef} muted={!sounds} src={clic_sound} />
            {
                    showTimer && (
                    <CountDown
                        startFrom={3}
                        onCountdownEnd={() => {
                          setShowTimer(false);
                          navigate(`/game/${newGameID}`)
                        }}
                      />)
                }
        </div>
    )
}