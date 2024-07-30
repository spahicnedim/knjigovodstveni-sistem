const prisma = require("../prismaClient");

const createCompany = async (req, res) => {
  const {
    name,
    adresa,
    sjedisteId,
    drzava,
    PDVbroj,
    IDbroj,
    valuta,
    obveznikPDV,
    telefon,
    fax,
    email,
    web,
    serviceId,
  } = req.body;

  try {
    const company = await prisma.company.create({
      data: {
        name,
        adresa: adresa || null,
        sjedisteId: sjedisteId || null,
        drzava: drzava || null,
        PDVbroj: PDVbroj ? PDVbroj.toString() : null,
        IDbroj: IDbroj ? IDbroj.toString() : null,
        valuta: valuta || null,
        obveznikPDV: obveznikPDV !== undefined ? obveznikPDV : null,
        telefon: telefon ? telefon.toString() : null,
        fax: fax ? fax.toString() : null,
        email: email || null,
        web: web || null,
        serviceId,
      },
    });

    res.status(201).json({ company });
  } catch (error) {
    console.error("Error creating company:", error);
    res
      .status(400)
      .json({ error: "Error creating company", details: error.message });
  }
};

const updateCompany = async (req, res) => {
  const { companyId } = req.params;
  const {
    name,
    adresa,
    sjedisteId,
    drzava,
    PDVbroj,
    IDbroj,
    valuta,
    obveznikPDV,
    telefon,
    fax,
    email,
    web,
  } = req.body;

  try {
    const company = await prisma.company.update({
      where: {
        id: parseInt(companyId, 10), // Ensure id is correctly parsed to an integer
      },
      data: {
        name: name || undefined,
        adresa: adresa || undefined,
        sjedisteId: sjedisteId || undefined,
        drzava: drzava || undefined,
        PDVbroj: PDVbroj ? PDVbroj.toString() : undefined,
        IDbroj: IDbroj ? IDbroj.toString() : undefined,
        valuta: valuta || undefined,
        obveznikPDV: obveznikPDV !== undefined ? obveznikPDV : undefined,
        telefon: telefon ? telefon.toString() : undefined,
        fax: fax ? fax.toString() : undefined,
        email: email || undefined,
        web: web || undefined,
      },
    });

    res.status(200).json({ company });
  } catch (error) {
    console.error("Error updating company:", error);
    res
      .status(400)
      .json({ error: "Error updating company", details: error.message });
  }
};

const getOneCompany = async (req, res) => {
  const { serviceId, companyId } = req.params;
  try {
    const company = await prisma.company.findUnique({
      where: { id: parseInt(companyId) },
    });
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    if (company.serviceId !== parseInt(serviceId)) {
      return res
        .status(403)
        .json({ error: "Company does not belong to the current service" });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: "Error fetching company" });
  }
};

const getCompanyById = async (req, res) => {
  const { serviceId } = req.params;

  const companies = await prisma.company.findMany({
    where: { serviceId: parseInt(serviceId) },
  });

  res.json(companies);
};

module.exports = {
  createCompany,
  getOneCompany,
  getCompanyById,
  updateCompany,
};
