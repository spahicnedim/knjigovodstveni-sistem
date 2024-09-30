const prisma = require("../prismaClient");
const { Decimal } = require("decimal.js"); // Dodajte ovu liniju ako koristite Decimal.js

const createKalkulacije = async (req, res) => {
  const {
    redniBroj,
    poslovniceId,
    skladisteId,
    vrstaDokumentaId,
    companyId,
    kupacDobavljacId,
    pDVId,
    datumIzdavanjaDokumenta,
    datumKreiranjaKalkulacije,
    valutaId,
    artikli,
  } = req.body;

  // Pretvaranje JSON stringa u objekt
  const parsedArtikli = JSON.parse(artikli);

  try {
    const activeGodina = await prisma.godine.findFirst({
      where: { status: true },
    });

    if (!activeGodina) {
      return res.status(404).json({ message: "Nema aktivne godine." });
    }

    // Provjeravamo je li fajl uploadovan
    const file = req.file;
    let filePath = null;
    if (file) {
      filePath = file.path; // Putanja fajla
    }

    const validDatumIzdavanja = new Date(datumIzdavanjaDokumenta);
    const validDatumKreiranja = new Date(datumKreiranjaKalkulacije);

    // Kreiranje dokumenta i povezivanje artikala
    const dokument = await prisma.$transaction(async (prisma) => {
      const createdDokument = await prisma.dokumenti.create({
        data: {
          redniBroj,
          poslovniceId: parseInt(poslovniceId, 10),
          skladisteId: parseInt(skladisteId, 10),
          vrstaDokumentaId: parseInt(vrstaDokumentaId, 10),
          companyId: parseInt(companyId, 10),
          kupacDobavljacId: parseInt(kupacDobavljacId, 10),
          pDVId: parseInt(pDVId, 10),
          datumIzdavanjaDokumenta: validDatumIzdavanja,
          datumKreiranjaKalkulacije: validDatumKreiranja,
          valutaId: parseInt(valutaId, 10),
          filePath: filePath,
          godineId: activeGodina.id,
        },
      });

      // Povezivanje artikala sa dokumentom
      for (const artikl of parsedArtikli) {
        const existingArtiklInStock = await prisma.skladisteArtikli.findUnique({
          where: {
            skladisteId_artikliId: {
              skladisteId: parseInt(skladisteId, 10),
              artikliId: parseInt(artikl.artikliId, 10),
            },
          },
        });

        if (existingArtiklInStock) {
          await prisma.skladisteArtikli.update({
            where: {
              skladisteId_artikliId: {
                skladisteId: parseInt(skladisteId, 10),
                artikliId: parseInt(artikl.artikliId, 10),
              },
            },
            data: {
              kolicina: {
                increment: parseFloat(artikl.kolicina),
              },
            },
          });
        } else {
          await prisma.skladisteArtikli.create({
            data: {
              artikli: {
                connect: { id: parseInt(artikl.artikliId, 10) },
              },
              skladiste: {
                connect: { id: parseInt(skladisteId, 10) },
              },
              kolicina: parseFloat(artikl.kolicina),
            },
          });
        }
        // Dohvati posljednju cijenu na osnovu najvećeg id-a
        const lastCijena = await prisma.artikliCijene.findFirst({
          where: { artikliId: parseInt(artikl.artikliId, 10) },
          orderBy: { id: 'desc' }, // Dohvati zadnju cijenu na osnovu id-a
        });

        // Postavi cijene samo ako nisu nula; ako jesu, koristi postojeće vrijednosti
        const novaCijena = parseFloat(artikl.cijena) || lastCijena?.cijena || 0;
        const novaMpcijena = parseFloat(artikl.mpcijena) || lastCijena?.mpcijena || 0;
        const novaVpcijena = parseFloat(artikl.vpcijena) || lastCijena?.vpcijena || 0;

        // Provjeri da li su cijene promijenjene u odnosu na zadnje cijene
        const arePricesDifferent =
            (artikl.cijena && novaCijena !== lastCijena?.cijena) ||
            (artikl.mpcijena && novaMpcijena !== lastCijena?.mpcijena) ||
            (artikl.vpcijena && novaVpcijena !== lastCijena?.vpcijena);

        if (arePricesDifferent) {
          await prisma.artikliCijene.create({
            data: {
              artikliId: parseInt(artikl.artikliId, 10),
              cijena: novaCijena,
              mpcijena: novaMpcijena,
              vpcijena: novaVpcijena,
            },
          });
        }

        await prisma.dokumentiArtikli.create({
          data: {
            dokumentId: createdDokument.id,
            artikliId: parseInt(artikl.artikliId, 10),
            kolicina: parseFloat(artikl.kolicina),
            cijena: parseFloat(artikl.cijena),
            mpcijena: parseFloat(artikl.mpcijena),
            vpcijena: parseFloat(artikl.vpcijena)
          },
        });
      }

      let knjigaId;
      if (vrstaDokumentaId == 1) {
        knjigaId = 1; // KUF ID
      } else if (vrstaDokumentaId == 2) {
        knjigaId = 1; // KIF ID
      }


      // Update dokumenta s knjigeId
      await prisma.dokumenti.update({
        where: { id: createdDokument.id },
        data: {
          knjigeId: knjigaId,
        },
      });
      return createdDokument;
    });

    res.status(201).json({ dokument });
  } catch (error) {
    console.error(
      "Error creating dokument and connecting artikli:",
      error.message
    );
    res.status(400).json({
      error: "Error creating dokument and connecting artikli",
      details: error.message,
    });
  }
};

const updateDokumenta = async (req, res) => {
  const { dokumentId } = req.params;
  const {
    redniBroj,
    vrstaDokumentaId,
    kupacDobavljacId,
    datumIzdavanjaDokumenta,
    datumKreiranjaKalkulacije,
    artikli,
  } = req.body;

  const parsedArtikli = JSON.parse(artikli);

  try {
    const validDatumIzdavanja = new Date(datumIzdavanjaDokumenta);
    const validDatumKreiranja = new Date(datumKreiranjaKalkulacije);

    const dokument = await prisma.$transaction(async (prisma) => {
      // Ažuriranje podataka dokumenta
      const updatedDokument = await prisma.dokumenti.update({
        where: {
          id: parseInt(dokumentId, 10),
        },
        data: {
          redniBroj: redniBroj ? String(redniBroj) : undefined,
          vrstaDokumentaId: parseInt(vrstaDokumentaId, 10),
          kupacDobavljacId: parseInt(kupacDobavljacId, 10),
          datumIzdavanjaDokumenta: validDatumIzdavanja,
          datumKreiranjaKalkulacije: validDatumKreiranja,
        },
      });

      // Ažuriranje ili kreiranje artikala povezanih s dokumentom
      for (const artikl of parsedArtikli) {
        const existingDokumentArtikl = await prisma.dokumentiArtikli.findFirst({
          where: {
            dokumentId: parseInt(dokumentId, 10),
            artikliId: parseInt(artikl.artikliId, 10),
          },
        });

        if (existingDokumentArtikl) {
          // Ako artikl već postoji, ažuriraj količinu i cijenu
          await prisma.dokumentiArtikli.update({
            where: {
              id: existingDokumentArtikl.id,
            },
            data: {
              kolicina: parseFloat(artikl.kolicina),
              cijena: parseFloat(artikl.cijena),
              mpcijena: parseFloat(artikl.mpcijena),
              vpcijena: parseFloat(artikl.vpcijena)
            },
          });
        } else {
          // Ako artikl ne postoji, kreiraj novi zapis
          await prisma.dokumentiArtikli.create({
            data: {
              dokumentId: parseInt(dokumentId, 10),
              artikliId: parseInt(artikl.artikliId, 10),
              kolicina: parseFloat(artikl.kolicina),
              cijena: parseFloat(artikl.cijena),
              mpcijena: parseFloat(artikl.mpcijena),
              vpcijena: parseFloat(artikl.vpcijena)
            },
          });
        }

        // Ažuriraj skladište
        const existingArtiklInStock = await prisma.skladisteArtikli.findUnique({
          where: {
            skladisteId_artikliId: {
              skladisteId: updatedDokument.skladisteId,
              artikliId: parseInt(artikl.artikliId, 10),
            },
          },
        });

        if (existingArtiklInStock) {
          await prisma.skladisteArtikli.update({
            where: {
              skladisteId_artikliId: {
                skladisteId: updatedDokument.skladisteId,
                artikliId: parseInt(artikl.artikliId, 10),
              },
            },
            data: {
              kolicina: {
                increment: parseFloat(artikl.kolicina), // Povećaj količinu
              },
            },
          });
        } else {
          await prisma.skladisteArtikli.create({
            data: {
              artikliId: parseInt(artikl.artikliId, 10),
              skladisteId: updatedDokument.skladisteId,
              kolicina: parseFloat(artikl.kolicina),
            },
          });
        }
      }

      return updatedDokument;
    });

    res.status(200).json({ dokument });
  } catch (error) {
    console.error("Error updating dokument and artikli:", error.message);
    res.status(400).json({
      error: "Error updating dokument and artikli",
      details: error.message,
    });
  }
};

const getAllDokumenti = async (req, res) => {
  const { skladisteId, godineId, vrstaDokumentaId } = req.query;

  try {
    if (!skladisteId || !godineId || !vrstaDokumentaId) {
      return res
        .status(400)
        .json({ error: "Missing skladisteId or godineId query parameters" });
    }

    const whereConditions = {
      skladisteId: parseInt(skladisteId, 10),
      godineId: parseInt(godineId, 10),
      vrstaDokumentaId: parseInt(vrstaDokumentaId, 10),
    };

    const dokumenti = await prisma.dokumenti.findMany({
      where: whereConditions,
      // include: {
      //   artikli: true,
      // },
    });

    res.status(200).json({ dokumenti });
  } catch (error) {
    console.error("Error fetching dokumenti:", error.message);
    res
      .status(400)
      .json({ error: "Error fetching dokumenti", details: error.message });
  }
};

const getDokumentById = async (req, res) => {
  const { dokumentId } = req.params;

  try {
    const dokument = await prisma.dokumenti.findUnique({
      where: {
        id: parseInt(dokumentId, 10),
      },
      include: {
        DokumentiArtikli: {
          include: {
            artikli: true, // Ovo uključuje podatke o artiklu
          },
        },
        kupacDobavljac: true,
      },
    });

    if (!dokument) {
      return res.status(404).json({ error: "Dokument nije pronađen." });
    }

    res.status(200).json({ dokument });
  } catch (error) {
    console.error("Error fetching dokument:", error.message);
    res
      .status(400)
      .json({ error: "Error fetching dokument", details: error.message });
  }
};



const deleteDokument = async (req, res) => {
  const { dokumentId } = req.params;

  try {
    // Pokrenite transakciju kako biste osigurali da se svi povezani podaci brišu zajedno
    await prisma.$transaction(async (prisma) => {
      // Pronađi dokument i sve povezane artikle
      const dokument = await prisma.dokumenti.findUnique({
        where: { id: parseInt(dokumentId, 10) },
        include: {
          DokumentiArtikli: true,
        },
      });

      if (!dokument) {
        return res.status(404).json({ error: "Dokument nije pronađen." });
      }

      // Za svaki artikl koji je povezan s dokumentom
      for (const dokumentArtikl of dokument.DokumentiArtikli) {
        // Smanji količinu u skladištu za svaki artikl koji je povezan s dokumentom
        await prisma.skladisteArtikli.update({
          where: {
            skladisteId_artikliId: {
              skladisteId: dokument.skladisteId,
              artikliId: dokumentArtikl.artikliId,
            },
          },
          data: {
            kolicina: {
              decrement: dokumentArtikl.kolicina, // Smanji količinu
            },
          },
        });

        // Obriši artikl iz "DokumentiArtikli" tabele
        await prisma.dokumentiArtikli.delete({
          where: { id: dokumentArtikl.id },
        });
      }

      // Obriši sam dokument
      await prisma.dokumenti.delete({
        where: { id: parseInt(dokumentId, 10) },
      });

      // Ako je dokument imao uploadovan fajl, možete dodati logiku za brisanje fajla ovdje

    });

    res.status(200).json({ message: "Dokument i svi povezani podaci su obrisani." });
  } catch (error) {
    console.error("Error deleting dokument:", error.message);
    res.status(400).json({
      error: "Error deleting dokument",
      details: error.message,
    });
  }
};
module.exports = {
  createKalkulacije,
  updateDokumenta,
  getAllDokumenti,
  getDokumentById,
  deleteDokument,
};
