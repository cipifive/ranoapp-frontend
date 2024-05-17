import { AgGridReact } from "ag-grid-react"
import { FC, useState } from "react"
import { FaMedal } from "react-icons/fa";

export const RankingTable:FC<any> = (props):JSX.Element => {

    const {
        data
    } = props

    const rankRenderer = (params:any) => {
        switch(parseInt(params.rowIndex + 1)) {
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

    const percentRenderer = (params:any) => `${params.value}%`

      // Column Definitions: Defines the columns to be displayed.
      const [colDefs] = useState<any>([
        { field: "rank", cellRenderer: rankRenderer, flex:0.5, headerName: "Nº", resizable:false },
        { field: "name", flex:1, headerName: "Jug", resizable:false },
        { field: "games", flex:1, headerName: "PJ", resizable:false },
        { field: "wins", flex:1, headerName: "PG", resizable:false },
        { field: "ratio", cellRenderer: percentRenderer, flex:1, headerName: "WR", resizable:false },
        
      
      ]);

    return (
        <div
            className="ag-theme-quartz h-full w-full" // applying the grid theme
             // the grid will fill the size of the parent container
            >
            <AgGridReact
                rowData={data}
                columnDefs={colDefs}
                rowClass={"font-game2 text-center"}
                className={"rank font-game2 text-lg ag-theme-quartz w-full"}
            />
        </div>
    )
}