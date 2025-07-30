import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { useEffect, useState } from 'react';
import { getData } from '../utility/data';
import type { dataObjType } from '../utility/types';
import './DataDisplay.css'
import CustomOverlay from './CustomOverlay';

function DataDisplay() {
    const [dataArray, setDataArray] = useState<dataObjType[]>([]);
    const [first, setFirst] = useState<number>(0);
    const [curPage, setCurPage] = useState<number>(1);
    const [selectedRowsSet, setSelectedRowsSet] = useState<Set<number>>(() => new Set());
    const [selectedRows, setSelectedRows] = useState<dataObjType[]>([]);
    const [rowsToSelect,SetRowsToSelect] = useState<number>(0);
    async function fetchData() {
        const data = await getData(curPage);
        setDataArray(data);
         const pageSelected = data.filter(d => selectedRowsSet.has(d.index));
        setSelectedRows(pageSelected);
    }
    useEffect(() => {
        fetchData();
    }, [curPage]);

    const onPageChange = (event: any) => {
        setFirst(event.first);
        getData(curPage + 1);
        setCurPage(event.page + 1);

    }
const handleSelection = (e: any) => {
  const newSelected: dataObjType[] = e.value || [];
  const prevSelected = selectedRows || [];

  const newIndexes = new Set(newSelected.map((row) => row.index));
  const prevIndexes = new Set(prevSelected.map((row) => row.index));

  const addedIndexes = [...newIndexes].filter((i) => !prevIndexes.has(i));
  const removedIndexes = [...prevIndexes].filter((i) => !newIndexes.has(i));

  setSelectedRowsSet((prev) => {
    const updated = new Set(prev);
    addedIndexes.forEach((i) => updated.add(i));
    removedIndexes.forEach((i) => updated.delete(i));
    return updated;
  });

  setSelectedRows(newSelected);
};


    useEffect(() => {
    if (rowsToSelect <= 0) return;

    const startIndex = (curPage-1) * 12;
    const newSet = new Set(selectedRowsSet);

    for (let i = startIndex; i < startIndex + rowsToSelect; i++) {
        newSet.add(i);
    }

    const newSelectedRows: dataObjType[] = dataArray.filter(d => newSet.has(d.index));

    setSelectedRowsSet(newSet);
    setSelectedRows(newSelectedRows);
}, [rowsToSelect]);


    return (
        <div className="data-display-container">
            <div className="data-table-wrapper">
                <DataTable
                    value={dataArray}
                    stripedRows
                    dataKey="index"
                    selection={selectedRows}
                    onSelectionChange={handleSelection}
                    selectionMode="multiple"
                    tableStyle={{ minWidth: '50rem' }}
                    className="custom-data-table"
                >


                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
                    <Column header={<CustomOverlay setRowsToSelect={SetRowsToSelect}/>}></Column>
                    <Column field="title" header="Title" className="title-column"></Column>
                    <Column field="place_of_origin" header="Place of Origin" className="origin-column"></Column>
                    <Column field="artist_display" header="Artist" className="artist-column"></Column>
                    <Column field="inscriptions" header="Inscriptions" className="inscriptions-column"></Column>
                    <Column field='date_start' header="Start Date" className='date-column'></Column>
                    <Column field='date_end' header="End Date" className='date-column'></Column>
                </DataTable>
            </div>
            <div className="paginator-wrapper">
                <Paginator first={first} rows={12} totalRecords={129355} onPageChange={onPageChange}
                    className="custom-paginator"
                    template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport" />
            </div>
        </div>

    )
}

export default DataDisplay