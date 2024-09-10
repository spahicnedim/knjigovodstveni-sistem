import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPoslovnice } from "../../features/poslovnice/poslovnicaThunks.js";
import { useParams } from "react-router-dom";
import { fetchSkladista } from "../../features/skladista/skladisteThunks.js";
import { fetchDokumenti } from "../../features/dokumenti/dokumentThunks.js";
import {fetchKupciDobavljaci} from "../../features/kupacDobavljac/kupacDobavljacThunk.js";
import { useTable, usePagination, useGlobalFilter, useSortBy  } from 'react-table';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Drawer from "../Drawer.jsx";
import {EditMaloprodajnaKalkulacija} from "./Forme/EditMaloprodajnaKalkulacija.jsx";
import { parseISO, compareAsc, format } from 'date-fns';

export function MaloprodajnaKalukacija() {
    const dispatch = useDispatch();
    const [poslovniceId, setPoslovnicaId] = useState(null);
    const [skladisteId, setSkladisteId] = useState(null);
    const [filteredSkladista, setFilteredSkladista] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState(null);

    const poslovnice = useSelector((state) => state.poslovnica.poslovnice);
    const skladista = useSelector((state) => state.skladiste.skladista);
    const dokumenti = useSelector((state) => state.dokument.dokumenti);
    const dobavljaci = useSelector((state) => state.kupacDobavljac.kupciDobavljaci)

    const { companyId } = useParams();

    useEffect(() => {
        dispatch(fetchPoslovnice(companyId));
        dispatch(fetchSkladista());
    }, [dispatch, companyId]);

    useEffect(() => {
        // Filtriranje skladišta na osnovu odabrane poslovnice
        if (poslovniceId) {
            const relevantSkladista = skladista.filter(
                (skladiste) => skladiste.poslovnicaId === Number(poslovniceId)
            );
            setFilteredSkladista(relevantSkladista);
        } else {
            setFilteredSkladista([]);
        }
    }, [poslovniceId, skladista]);

    useEffect(() => {
        if (skladisteId) {
            dispatch(fetchDokumenti(skladisteId));
            dispatch(fetchKupciDobavljaci(companyId));
        }
    }, [dispatch, skladisteId]);

    const openDrawer = (id) => {
        setDrawerContent(id);
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
        setDrawerContent(null);
    };

    const handleRowClick = (id) => {
        openDrawer(id);
    };

    const columns = useMemo(() => [
        {
            Header: 'Naziv Dokumenta',
            accessor: 'naziv',
            sortType: 'alphanumeric'
        },
        {
            Header: 'Datum',
            accessor: 'datumIzdavanjaDokumenta',
            Cell: ({ value }) => {
                // Formatiraj datum u "mjesec.dan.godina"
                return format(new Date(value), 'MM.dd.yyyy');
            },
            sortType: (rowA, rowB, columnId) => {
                const dateA = parseISO(rowA.original[columnId]);
                const dateB = parseISO(rowB.original[columnId]);
                return compareAsc(dateA, dateB);
            }
        },
        {
            Header: 'Dobavljac',
            accessor: 'kupacDobavljacId',
            Cell: ({value}) => {
                const kupacDobavljac = dobavljaci.find(kd => kd.id === value);
                return kupacDobavljac ? kupacDobavljac.name : 'N/A';
            }
        },

    ], [dobavljaci]);

    const data = useMemo(() => dokumenti, [dokumenti]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        setGlobalFilter,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize, globalFilter }
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    return (
        <div>
            <div className='p-6 bg-white rounded-lg shadow-md space-y-6'>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Poslovnica</label>
                    <select
                        value={poslovniceId}
                        onChange={(e) => setPoslovnicaId(e.target.value)}
                        className="w-72 h-9 pl-2 border border-gray-300 rounded-lg"
                        required
                    >
                        <option value="">Odaberite poslovnicu</option>
                        {poslovnice.map((poslovnica) => (
                            <option key={poslovnica.id} value={poslovnica.id}>
                                {poslovnica.naziv}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Skladište</label>
                    <select
                        value={skladisteId}
                        onChange={(e) => setSkladisteId(e.target.value)}
                        className="w-72 h-9 pl-2 border border-gray-300 rounded-lg"
                        required
                    >
                        <option value="">Odaberite skladište</option>
                        {filteredSkladista.map((skladiste) => (
                            <option key={skladiste.id} value={skladiste.id}>
                                {skladiste.naziv}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-6">
                    <h2 className="text-xl font-medium mb-4">Dokumenti</h2>
                    <div className="mb-6">
                        <input
                            type="text"
                            value={globalFilter || ''}
                            onChange={(e) => setGlobalFilter(e.target.value || undefined)}
                            placeholder="Pretraži dokumente..."
                            className="w-72 h-9 pl-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <table {...getTableProps()} className="w-full border-collapse border border-gray-300">
                        <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        className="border border-gray-300 p-3 bg-gray-100 font-normal text-sm cursor-pointer"
                                    >
                                        {column.render('Header')}
                                        <span>
                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row);
                            return (
                                <tr
                                    {...row.getRowProps()}
                                    onClick={() => handleRowClick(row.original.id)} // Dodaj klik handler
                                    className="cursor-pointer hover:bg-gray-100" // Dodaj stilove za hover
                                >
                                    {row.cells.map(cell => (
                                        <td
                                            {...cell.getCellProps()}
                                            className="border border-gray-300 p-3"
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    <div className="mt-6 flex gap-2 items-center">
                        <button
                            onClick={() => gotoPage(0)}
                            disabled={!canPreviousPage}
                            className="p-2 cursor-pointer"
                        >
                            <FaAngleDoubleLeft/>
                        </button>
                        <button
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                            className="p-2 cursor-pointer"
                        >
                        <FaAngleLeft/>
                        </button>
                        <button
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                            className="p-2 cursor-pointer"
                        >
                            <FaAngleRight/>
                        </button>
                        <button
                            onClick={() => gotoPage(pageOptions.length - 1)}
                            disabled={!canNextPage}
                            className="p-2 cursor-pointer"
                        >
                            <FaAngleDoubleRight/>
                        </button>
                        <span>
                        Stranica {pageIndex + 1} od {pageOptions.length}
                    </span>
                        <select
                            value={pageSize}
                            onChange={(e) => setPageSize(Number(e.target.value))}
                            className="p-2 border border-gray-300 rounded-lg"
                        >
                            {[10, 20, 30, 40].map(pageSizeOption => (
                                <option key={pageSizeOption} value={pageSizeOption}>
                                    {pageSizeOption} stavki po stranici
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
                {drawerContent && <EditMaloprodajnaKalkulacija dokumentId={drawerContent} />

                }
            </Drawer>
        </div>

    );
}