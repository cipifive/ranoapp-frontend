import { AgGridReact } from "ag-grid-react"
import { FC, useState } from "react"

export const GeneralTable:FC<any> = (props):JSX.Element => {

    const {
        data,
        turn,
        round
    } = props

    const autoSizeStrategy:any = {
        type: 'fitGridWidth',
        defaultMinWidth: 30,
        columnLimits: [
        ]
    }

    const nameRenderer = (params:any) => {
        return (
            <span>{params.value[0]}{params.data.frogs !== 0? <sup>{params.data.frogs}</sup> : false}</span>
        )
    }
      
      // Column Definitions: Defines the columns to be displayed.
      const [colDefs] = useState<any>([
        { field: "id", hide:true, headerName: '', resizable:false, cellRenderer: nameRenderer, tooltipField:"name"},
        { field: "name", suppressMovable: true,  headerName: '', resizable:false, cellRenderer: nameRenderer, tooltipField:"name"},
        { field: "round1", suppressMovable: true, headerName: "R1", resizable:false },
        { field: "round2", suppressMovable: true, headerName: "R2", resizable:false },
        { field: "round3", suppressMovable: true, headerName: "R3", resizable:false },
        { field: "round4", suppressMovable: true, headerName: "R4", resizable:false },
        { field: "round5", suppressMovable: true, headerName: "R5", resizable:false },
        { field: "round6", suppressMovable: true, headerName: "R6", resizable:false },
        { field: "round7", suppressMovable: true, headerName: "R7", resizable:false },
        { field: "round8", suppressMovable: true, headerName: "R8", resizable:false },
        { field: "round9", suppressMovable: true, headerName: "R9", resizable:false },
        { field: "round10", suppressMovable: true, headerName: "R10", resizable:false },
        { field: "total", suppressMovable: true, headerName: "T", resizable:false },
      
      ]);
    
    const rowRules:any = {
        'row-selected' : (params:any) => { 
            const { id } = params.data
           
            return id === turn?.id && round <= 10
        
        },
    }

    const getRowStyle:any = (params:any) => {
        const maxPoints = Math.max(...data.map((d:any) => d.total))
        if(params.data.total === maxPoints && round > 10) {
            return {
                background: '#100235',
                color: '#FB8C00'
            }
        }
        return true
    }

    return (
        <div
            className="ag-theme-quartz h-full w-full" // applying the grid theme
             // the grid will fill the size of the parent container
            >
            <AgGridReact
                rowData={data}
                columnDefs={colDefs}
                rowClass={"font-game2 text-center"}
                className={"punct font-game2 text-lg ag-theme-quartz w-full"}
                suppressRowClickSelection
                suppressCellFocus
                autoSizeStrategy={autoSizeStrategy}
                rowClassRules={rowRules}
                getRowStyle={getRowStyle}
            />
        </div>
    )
}