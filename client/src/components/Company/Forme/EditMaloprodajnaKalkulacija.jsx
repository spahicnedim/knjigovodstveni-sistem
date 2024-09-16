import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { MdEdit, MdEmail, MdDelete } from "react-icons/md";
import { IoMdPrint } from "react-icons/io";
import { useReactToPrint } from "react-to-print";
import PdfContent from "../PDFLayout/PDFDokument";
import { roundTo } from "../../../utils/RoundTo";
import { fetchArtikli } from "../../../features/artikli/artikliThunks.js";
import { fetchKupciDobavljaci } from "../../../features/kupacDobavljac/kupacDobavljacThunk.js";
import { fetchPdv } from "../../../features/dokumenti/dokumentThunks.js";
import { fetchDokumentiById } from "../../../features/dokumenti/dokumentThunks.js";

export function EditMaloprodajnaKalkulacija({ dokumentId }) {
  const contentRef = useRef();
  const dispatch = useDispatch();
  const { companyId } = useParams();

  useEffect(() => {
    dispatch(fetchDokumentiById(dokumentId));
    dispatch(fetchArtikli());
    dispatch(fetchKupciDobavljaci(companyId));
    dispatch(fetchPdv());
  }, [dispatch, companyId, dokumentId]);

  const dokument = useSelector((state) => state.dokument.current || {});

  const kupciDobavljaci = useSelector(
    (state) => state.kupacDobavljac.kupciDobavljaci
  );
  const pdv = useSelector((state) => state.dokument.pdv);
  const artikliList = useSelector((state) => state.artikl.artikli);

  const aktivniPdv = pdv.find((p) => p.Aktivan);

  const artikliDokumenta =
    dokument?.dokument?.DokumentiArtikli?.map((dokumentArtikl) => {
      const artiklInfo = dokumentArtikl.artikli;
      return {
        naziv: artiklInfo?.naziv,
        jedinicaMjere: artiklInfo?.jedinicaMjere,
        kolicina: dokumentArtikl.kolicina, // Ovo je količina iz 'DokumentiArtikli' tabele
        cijena: dokumentArtikl.cijena, // Ovo je cijena iz 'DokumentiArtikli' tabele
        mpcijena: dokumentArtikl.mpcijena, // Ovo je mpcijena iz 'DokumentiArtikli' tabele
      };
    }) || [];

  console.log(artikliDokumenta);
  console.log(dokument);

  const dobavljac = kupciDobavljaci?.find(
    (dobavljac) => dobavljac.id === dokument?.dokument?.kupacDobavljacId
  );

  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    pageStyle: `
      @page {
        size: A4 landscape;
        counter-increment: page;
      }
      body {
        -webkit-print-color-adjust: exact; 
        margin: 0; 
        overflow: hidden; 
      }
      header, footer {
        display: none; 
      }
      .printable-area {
        width: 100%; 
        height: auto; 
        box-sizing: border-box; 
      }
    `,
  });

  if (!dokument || !dokument.dokument || !artikliList.length) {
    return <div>Loading...</div>; // Prikaz loadera dok podaci nisu dostupni
  }

  return (
    <div>
      <div className='flex items-center'>
        <button className='px-2 flex items-center space-x-1'>
          <MdEdit className='w-4 h-4' />
          <span>Edit</span>
        </button>
        <div className='w-px h-5 bg-gray-300 mx-2'></div>
        <button className='px-2 flex items-center space-x-1'>
          <MdEmail className='w-4 h-4' />
          <span>Pošalji Mail</span>
        </button>
        <div className='w-px h-5 bg-gray-300 mx-2'></div>
        <button
          type='button'
          onClick={handlePrint}
          className='px-2 flex items-center space-x-1'
        >
          <IoMdPrint className='w-4 h-4' />
          <span>Print</span>
        </button>
        <div className='w-px h-5 bg-gray-300 mx-2'></div>
        <button className='px-2 flex items-center space-x-1'>
          <MdDelete className='w-4 h-4' />
          <span>Izbriši</span>
        </button>
      </div>
      <div className='border-b border-gray-300 pt-2' />

      <div className='mt-4'>
        <PdfContent
          ref={contentRef}
          artikli={artikliDokumenta}
          aktivniPdv={aktivniPdv}
          roundTo={roundTo}
          naziv={dokument.dokument.naziv}
          brojDokumenta={dokument.dokument.redniBroj}
          dobavljac={dobavljac ? dobavljac.name : "Nepoznat"}
        />
      </div>
    </div>
  );
}
