// multerConfig.js
const multer = require('multer');
const path = require('path');

// Definiši putanju za spremanje fajlova
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Direktorijum gde će se fajlovi spremati
    },
    filename: (req, file, cb) => {
        const { vrstaDokumentaId } = req.body; // Uzmi vrstu dokumenta iz zahtjeva
        let prefix = '';

        // Postavljamo prefiks na osnovu vrste dokumenta
        switch (parseInt(vrstaDokumentaId, 10)) {
            case 1:
                prefix = 'maloprodajnaKalkulacija-';
                break;
            case 2:
                prefix = 'veleprodajniDokument_';
                break;
            // Dodaj druge vrste dokumenata po potrebi
            default:
                prefix = 'dokument_';
                break;
        }

        // Kreiramo ime fajla - prefiks + originalno ime fajla + ekstenzija
        cb(null, prefix + Date.now() + path.extname(file.originalname));
    }
});

// Kreiraj multer instancu sa definisanom konfiguracijom
const upload = multer({ storage: storage });

module.exports = upload;