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
        adresa,
        sjedisteId,
        drzava,
        PDVbroj: PDVbroj.toString(),
        IDbroj: IDbroj.toString(),
        valuta,
        obveznikPDV,
        telefon: telefon.toString(),
        fax: fax.toString(),
        email,
        web,
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

const getOneCompany = async (req, res) => {
  const { serviceId, id } = req.params;
  try {
    const company = await prisma.company.findUnique({
      where: { id: parseInt(id) },
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

module.exports = { createCompany, getOneCompany, getCompanyById };
