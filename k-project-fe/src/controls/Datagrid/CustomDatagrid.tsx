import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Paginator, PaginatorCurrentPageReportOptions, PaginatorPageChangeEvent, PaginatorRowsPerPageDropdownOptions } from 'primereact/paginator';
import React, { useState } from 'react';
import './CustomDatagrid.scss';

interface PaginationProps {
    pagination?: boolean,
    paginationMode?: 'client' | 'server',
    onPageChange?: (page: number) => void
    pageSizeOptions?: Array<number>
}


interface CustomDatagridProps {
    dataSource?: any,
    columns?: any[],
    pagination?: PaginationProps
}
const CustomDatagrid = ({ ...props }: CustomDatagridProps) => {
    if (props?.pagination) {
        props.pagination = {
            pagination: true,
            paginationMode: 'client',
            pageSizeOptions: [10, 25, 50]
        };
    }

    props.columns = [
        <Column field='col1' header="Code"></Column>,
        <Column field='col2' header="Name"></Column>
    ];

    props.dataSource = [
        { id: 1, col1: 'Hello', col2: 'World' },
        { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
        { id: 3, col1: 'MUI', col2: 'is Amazing' },
    ];

    const [first, setFirst] = useState<number>(0);
    const [rows, setRows] = useState(10);

    const onPageChange = (e: PaginatorPageChangeEvent) => {
        console.log("e", e)
        setFirst(e?.first ?? 0);
        setRows(e?.rows ?? 0);
    };

    const PagingTemplate = {
        layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
        RowsPerPageDropdown: (options: PaginatorRowsPerPageDropdownOptions) => {
            const dropdownOptions = [
                { label: 5, value: 5 },
                { label: 10, value: 10 },
                { label: 20, value: 20 },
                { label: 120, value: 120 }
            ];

            return (
                <React.Fragment>
                    <span className="mx-1" style={{ color: 'var(--text-color-black: #383838)', userSelect: 'none' }}>
                        Tổng số dòng/Trang:{' '}
                    </span>
                    <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />
                </React.Fragment>
            );
        },
        CurrentPageReport: (options: PaginatorCurrentPageReportOptions) => {
            return (
                <span style={{ color: 'var(--text-color-black: #383838)', userSelect: 'none', width: '180px', textAlign: 'center' }}>
                    &nbsp; {options.first} - {options.last} trong {options.totalRecords}
                </span>
            );
        }
    };

    return (
        <div className="card">
            <DataTable
                value={props.dataSource}
                tableStyle={{ minWidth: '50rem' }}>
                {props.columns}
            </DataTable>
            <Paginator template={PagingTemplate} first={first} rows={rows} totalRecords={120} onPageChange={(e) => onPageChange(e)} className="justify-content-end" />

        </div>
    );
};
export default CustomDatagrid;