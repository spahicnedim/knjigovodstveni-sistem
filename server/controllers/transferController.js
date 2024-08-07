const prisma = require("../prismaClient");

const transfer = async (req, res) => {
    const {
        izSkladisteId,
        uSkladisteId,
        artikli
    } = req.body;

    try {
        await prisma.$transaction(async (prisma) => {
            for (const { artikliId, kolicina } of artikli) {
                // Ensure that artikliid is being correctly passed to the query
                if (!artikliId) {
                    throw new Error("artikliId is missing.");
                }

                const artikliUSkladistu = await prisma.skladisteArtikli.findUnique({
                    where: {
                        skladisteId_artikliId: {
                            skladisteId: izSkladisteId,
                            artikliId: artikliId // Corrected to match schema field name
                        }
                    }
                });

                if (!artikliUSkladistu || artikliUSkladistu.kolicina < kolicina) {
                    throw new Error(`Nema dovoljno količine za artikl ID ${artikliId} u skladištu.`);
                }

                // Decrease quantity in the source warehouse
                await prisma.skladisteArtikli.update({
                    where: {
                        id: artikliUSkladistu.id, // Use the unique ID for update
                    },
                    data: {
                        kolicina: {
                            decrement: kolicina
                        },
                    },
                });

                // Check if the item exists in the destination warehouse
                const artikliUCiljnomSkladistu = await prisma.skladisteArtikli.findUnique({
                    where: {
                        skladisteId_artikliId: {
                            skladisteId: uSkladisteId,
                            artikliId: artikliId // Corrected to match schema field name
                        }
                    }
                });

                if (artikliUCiljnomSkladistu) {
                    // If the item exists, increase the quantity
                    await prisma.skladisteArtikli.update({
                        where: {
                            id: artikliUCiljnomSkladistu.id, // Use the unique ID for update
                        },
                        data: {
                            kolicina: {
                                increment: kolicina
                            },
                        },
                    });
                } else {
                    // If the item doesn't exist, create it
                    await prisma.skladisteArtikli.create({
                        data: {
                            skladisteId: uSkladisteId,
                            artikliId: artikliId, // Corrected to match schema field name
                            kolicina: kolicina
                        },
                    });
                }

                await prisma.transferi.create({
                    data: {
                        artikliId: artikliId, // Corrected to match schema field name
                        izSkladisteId,
                        uSkladisteId,
                        kolicina
                    }
                });
            }
        });
        res.status(200).json({ message: "Transfer successful" });
    } catch (error) {
        console.error("Error creating company:", error);
        res
            .status(400)
            .json({ error: "Error creating company", details: error.message });
    }
};

module.exports = {
    transfer
};