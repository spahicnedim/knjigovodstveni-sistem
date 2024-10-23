import {useState, useEffect, useMemo, lazy, Suspense} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPoslovnice } from "../../../features/poslovnice/poslovnicaThunks.js";
import { useParams } from "react-router-dom";
import { fetchSkladista } from "../../../features/skladista/skladisteThunks.js";
import { fetchDokumenti } from "../../../features/dokumenti/dokumentThunks.js";
import { resetDokumenti } from "../../../features/dokumenti/dokumentSlice.js";
import { fetchKupciDobavljaci } from "../../../features/kupacDobavljac/kupacDobavljacThunk.js";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useFilters,
  useSortBy,
} from "react-table";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
const  DrawerDokument = lazy(() => import("../DrawerDokument.jsx")) ;
const DetaljiMaloprodajneKalkulacije = lazy(() => import( "./MaloprodajnaKalkulacija/DetaljiMaloprodajneKalkulacije.jsx"));
import { parseISO, compareAsc, format } from "date-fns";
import {
  fetchAllGodine,
} from "../../../features/godine/godineThunks.js";
import { fetchVrstaDokumenta } from "../../../features/vrstaDokumenta/vrstaDokumentaThunks.js";
const DetaljiVeleprodajneKalkulacije = lazy(() => import("./VeleprodajnaKalkulacija/DetaljiVeleprodajneKalkulacije.jsx"));
const DetaljiIzlazneFakture =  lazy(() => import("./IzlaznaFaktura/DetaljiIzlazneFakture.jsx"));
import SelectPoslovnice from "../SelectSearch/SelectPoslovnice.jsx";
import SelectSkladista from "../SelectSearch/SelectSkladista.jsx";

// Definiši jednostavan text input filter za kolonu
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Pretraži (${count})...`}
      className='w-72 h-9 pl-2 border border-gray-300 rounded-lg'
    />
  );
}

function DobavljacColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
  dobavljaci,
}) {
  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder='Pretraži dobavljača'
      className='w-72 h-9 pl-2 border border-gray-300 rounded-lg'
    />
  );
}

const ListaDokumenata = () => {
  const dispatch = useDispatch();
  const [poslovniceId, setPoslovnicaId] = useState(null);
  const [skladisteId, setSkladisteId] = useState(null);
  const [godineId, setGodineId] = useState(null);
  const [filteredSkladista, setFilteredSkladista] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);
  const [vrstaDokumentaId, setVrstaDokumentaId] = useState(null);

  const poslovnice = useSelector((state) => state.poslovnica.poslovnice);
  const skladista = useSelector((state) => state.skladiste.skladista);
  const dokumenti = useSelector((state) => state.dokument.dokumenti);
  const dobavljaci = useSelector(
    (state) => state.kupacDobavljac.kupciDobavljaci
  );
  const godine = useSelector((state) => state.godina.godine);
  const vrstaDokumenta = useSelector(
    (state) => state.vrstaDokumenta.vrsteDokumenata
  );

  const { companyId } = useParams();

  useEffect(() => {
    dispatch(fetchPoslovnice(companyId));
    dispatch(fetchSkladista());
    dispatch(fetchAllGodine());
    dispatch(fetchVrstaDokumenta());
  }, [dispatch, companyId]);

  useEffect(() => {
    if (poslovniceId && skladisteId && godineId && vrstaDokumentaId) {
      dispatch(fetchDokumenti({ skladisteId, godineId, vrstaDokumentaId }));
      dispatch(fetchKupciDobavljaci(companyId));
    }
  }, [dispatch, poslovniceId, skladisteId, godineId, companyId, vrstaDokumentaId]);

  useEffect(() => {
    return () => {
      dispatch(resetDokumenti());
    };
  }, [dispatch]);

  useEffect(() => {
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
    const activeYear = godine.find((godina) => godina.status === true);
    if (activeYear) {
      setGodineId(activeYear.id); // Postavlja se godina sa statusom true kao podrazumijevana
    }
  }, [godine]);

  const data = useMemo(() => {
    return [...dokumenti]
      .filter((dokument) => dokument.datumIzdavanjaDokumenta) // Filtriraj nevalidne datume
      .sort(
        (a, b) =>
          new Date(b.datumIzdavanjaDokumenta) -
          new Date(a.datumIzdavanjaDokumenta)
      );
  }, [dokumenti]);

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

  const columns = useMemo(
    () => [
      {
        Header: "Sifra Dokumenta",
        accessor: "redniBroj",
        sortType: "alphanumeric",
        Filter: DefaultColumnFilter,
      },
      {
        Header: "Datum",
        accessor: "datumIzdavanjaDokumenta",
        Cell: ({ value }) => {
          if (!value) {
            return "N/A"; // Prikazati "N/A" ako je datum nevalidan
          }
          try {
            return format(new Date(value), "dd.MM.yyyy");
          } catch (error) {
            console.error("Invalid date format: ", value); // Logiraj grešku za dijagnostiku
            return "Invalid date"; // Prikazati poruku ako je greška u formatu
          }
        },
        Filter: DefaultColumnFilter,
        filter: "dateFilter",
        sortType: (rowA, rowB, columnId) => {
          const dateA = parseISO(rowA.original[columnId]);
          const dateB = parseISO(rowB.original[columnId]);
          return compareAsc(dateA, dateB);
        },
      },
      {
        Header: "Dobavljac",
        accessor: "kupacDobavljacId",
        Cell: ({ value }) => {
          const kupacDobavljac = dobavljaci.find((kd) => kd.id === value);
          return kupacDobavljac ? kupacDobavljac.name : "N/A";
        },
        Filter: ({ column }) => (
          <DobavljacColumnFilter column={column} dobavljaci={dobavljaci} />
        ), // Prilagođeni filter za ovu kolonu
        filter: (rows, id, filterValue) => {
          return rows.filter((row) => {
            const kupacDobavljac = dobavljaci.find(
              (kd) => kd.id === row.original[id]
            );
            return kupacDobavljac
              ? kupacDobavljac.name
                  .toLowerCase()
                  .includes(filterValue.toLowerCase())
              : false;
          });
        },
      },
    ],
    [dobavljaci]
  );

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

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
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  return (
    <div>
      <div className='p-6 bg-white rounded-lg shadow-md space-y-6'>
        <div className='flex justify-between mb-6'>
          <div className='w-1/2 mr-6'>
            <label className='block text-gray-700 text-sm font-medium mb-2'>
              Poslovnica
            </label>
            <SelectPoslovnice
                poslovnice={poslovnice}
                poslovniceId={poslovniceId}
                setPoslovnicaId={setPoslovnicaId}
                openDrawer={openDrawer}
            />
          </div>

          <div className='w-1/7'>
            <label className='text-gray-700 text-sm font-medium mr-4'>
              Godina
            </label>
            <select
              value={godineId || ""}
              onChange={(e) => setGodineId(e.target.value)}
              className='w-32 h-9 pl-2 border border-gray-300 rounded-sm'
              required
            >
              {godine.map((godina) => (
                <option key={godina.id} value={godina.id}>
                  {godina.naziv}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-medium mb-2'>
            Skladište
          </label>
          <SelectSkladista
              filteredSkladista={filteredSkladista}
              skladisteId={skladisteId}
              setSkladisteId={setSkladisteId}
              openDrawer={openDrawer}
          />
        </div>
        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-medium mb-2'>
            Vrsta Dokumenta
          </label>
          <select
            value={vrstaDokumentaId || ""}
            onChange={(e) => setVrstaDokumentaId(e.target.value)}
            className='w-72 h-9 pl-2 border border-gray-300 rounded-sm'
            required
          >
            <option value=''>Odaberite vrstu dokumenta</option>
            {vrstaDokumenta.map((vrsta) => (
              <option key={vrsta.id} value={vrsta.id}>
                {vrsta.naziv}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-6'>
          <h2 className='text-xl font-medium mb-4'>Dokumenti</h2>
          <div className='mb-6'>
            <input
              type='text'
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value || undefined)}
              placeholder='Pretraži dokumente...'
              className='w-72 h-9 pl-2 border border-gray-300 rounded-lg'
            />
          </div>
          <table
            {...getTableProps()}
            className='w-full border-collapse border border-gray-300'
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm cursor-pointer'
                    >
                      {column.render("Header")}
                      {/*                  <button>*/}
                      {/*  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}*/}
                      {/*</button>*/}
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                const isHighlighted = row.original.redniBroj
                  ?.toLowerCase()
                  .includes(globalFilter?.toLowerCase());
                return (
                  <tr
                      key={row.id || row.index}
                    {...row.getRowProps()}
                    onClick={() => handleRowClick(row.original.id)}
                    className={`cursor-pointer hover:bg-gray-100 ${
                      isHighlighted ? "bg-gray-300" : ""
                    }`}
                  >
                    {row.cells.map((cell) => (
                      <td
                          key={cell.id || cell.index}
                        {...cell.getCellProps()}
                        className='border border-gray-300 p-3'
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className='mt-6 flex gap-2 items-center'>
            <button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className='p-2 cursor-pointer'
            >
              <FaAngleDoubleLeft />
            </button>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className='p-2 cursor-pointer'
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className='p-2 cursor-pointer'
            >
              <FaAngleRight />
            </button>
            <button
              onClick={() => gotoPage(pageOptions.length - 1)}
              disabled={!canNextPage}
              className='p-2 cursor-pointer'
            >
              <FaAngleDoubleRight />
            </button>
            <span>
              Stranica {pageIndex + 1} od {pageOptions.length}
            </span>
            <select
              value={pageSize || ""}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className='p-2 border border-gray-300 rounded-lg'
            >
              {[5, 10, 20, 30, 40].map((pageSizeOption) => (
                <option key={pageSizeOption} value={pageSizeOption}>
                  {pageSizeOption} stavki po stranici
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <Suspense>
        <DrawerDokument
            isOpen={isDrawerOpen}
            onClose={closeDrawer}
            brojDokumenta={
              drawerContent && drawerContent !== "null"
                  ? dokumenti.find((doc) => doc.id === drawerContent)?.redniBroj
                  : ""
            }
        >
          {vrstaDokumentaId == 1 && drawerContent && (
              <Suspense>
                <DetaljiMaloprodajneKalkulacije dokumentId={drawerContent} poslovniceId={poslovniceId} />
              </Suspense>
          )}

          {vrstaDokumentaId == 2 && drawerContent && (
              <Suspense>
                <DetaljiVeleprodajneKalkulacije dokumentId={drawerContent} poslovniceId={poslovniceId} />
              </Suspense>
          )}
          {vrstaDokumentaId == 3 && drawerContent && (
              <Suspense>
                <DetaljiIzlazneFakture dokumentId={drawerContent} poslovniceId={poslovniceId} />
              </Suspense>
          )}
        </DrawerDokument>
      </Suspense>
    </div>
  );
}
export default ListaDokumenata;