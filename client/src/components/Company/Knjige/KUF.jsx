import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import { fetchKnjige } from '../../../features/knjige/knjigeThunks';


export function KUF() {
    const dispatch = useDispatch();
    const { knjigeId, companyId } = useParams(); // Dohvatanje ID-a knjige iz URL-a

    const { knjiga, loading, error } = useSelector((state) => state.knjige); // Pristup Redux stanju
    // Učitaj knjigu po ID-u kada se komponenta učita
    useEffect(() => {
        if (knjigeId) {
            dispatch(fetchKnjige({knjigeId, companyId}));
        }
    }, [dispatch, knjigeId, companyId]);

    if (loading) return <p>Učitavanje...</p>;
    if (error) return <p>Greška: {error}</p>;

    console.log(knjiga)
    return (
        <div>
            <h1>Naziv - {knjiga?.naziv}</h1>
            <ul>
                {knjiga?.dokumenti.map((dokument) => (
                    <li key={dokument.id}>
                        {dokument.redniBroj} - {dokument.kupacDobavljac?.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}