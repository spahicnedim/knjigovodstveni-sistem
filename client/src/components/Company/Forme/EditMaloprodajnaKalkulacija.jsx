import {useSelector} from "react-redux";
import {format} from "date-fns";

export function EditMaloprodajnaKalkulacija({dokumentId}) {
    const dokumenti = useSelector((state) => state.dokument.dokumenti);
    const dokument = dokumenti.find(doc => doc.id === dokumentId);

    if (!dokument) {
        return <div>Dokument nije pronađen.</div>;
    }

    return (
        <div>
            <h2 className="text-xl font-medium mb-4">Detalji Dokumenta, ID: {dokumentId}</h2>
            <p><strong>Naziv:</strong> {dokument.naziv}</p>
            <p><strong>Datum:</strong> {format(new Date(dokument.datumIzdavanjaDokumenta), 'MM.dd.yyyy')}</p>
            <p><strong>Dobavljač:</strong> {dokument.kupacDobavljacId}</p>
            {/* Dodajte druge detalje dokumenta po potrebi */}
        </div>
    );
}