import { AgGridReact } from "ag-grid-react"
import { FC, useState } from "react"
import { FaMedal } from "react-icons/fa";

export const RankingTable:FC<any> = () => {

    const rankRenderer = (params:any) => {
        switch(parseInt(params.value)) {
            case 1:
                return <div className="flex text-center items-center">
                        <FaMedal size={20} color={"gold"} />
                        </div>
            case 2:
                return <div className="flex text-center items-center">
                    <FaMedal size={20} color={"silver"} />
                    </div>
            case 3:
                return <div className="flex text-center items-center">
                    <FaMedal size={20} color={"brown"} />
                        </div>
            default:
                return params.value
        }
      
    }

    const [rowData] = useState<any>([
        { rank: "1", name: "Emilio", points: 64950 },
        { rank: "2", name: "MariPaz", points: 33850 },
        { rank: "3", name: "Alicia", points: 29600, },
        { rank: "4", name: "Carlos", points: 19340, },
        { rank: "5", name: "María", points: 10000, },
        { rank: "6", name: "Álvaro", points: 817, },
      ]);
      
      // Column Definitions: Defines the columns to be displayed.
      const [colDefs] = useState<any>([
        { field: "rank", cellRenderer: rankRenderer, flex:0.5, headerName: "Nº", resizable:false },
        { field: "name", flex:1, headerName: "Jugador", resizable:false },
        { field: "points", flex:1, headerName: "Puntos", resizable:false },
      
      ]);

    return (
        <div
            className="ag-theme-quartz h-full w-full" // applying the grid theme
             // the grid will fill the size of the parent container
            >
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                rowClass={"font-game2 text-center"}
                className={"font-game2 text-lg ag-theme-quartz w-full"}
            />
        </div>
    )
}