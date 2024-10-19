const User = require("../Models/AuthenticationModel"); // Import the User model
const Product = require("../Models/ProductsModel"); // Import the Product model




const addWarranty = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(200).json({ missingId: "User ID is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(200).json({ userNotFound: "User not found" });
    }

    const { purchaseDate, warrantyPeriod, purchaseAddress, productId } = req.body;

    if (!purchaseDate || !warrantyPeriod || !productId || !purchaseAddress) {
      return res
        .status(200)
        .json({
          missingFields:
            "Purchase date, warranty period, and purchase address are required",
        });
    }

    user.warranty.push({
      purchaseDate,
      warrantyPeriod,
      purchaseAddress,
      productId
    });

    await user.save();

    return res
      .status(200)
      .json({ warrantyAdded: "Warranty added successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while adding the warranty" });
  }
};


async function getWarranty(req, res) {
  const { userId } = req.params;
  try {
    if (!userId) {
      return res.status(400).json({ missingId: "User ID is required" });
    }

    const user = await User.findById(userId).populate({
      path: 'warranty.productId',
      model: Product
    });

    if (!user) {
      return res.status(404).json({ userNotFound: "User not found" });
    }

    return res.status(200).json({ warranty: user.warranty });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while getting the warranty" });
  }
}

module.exports = {
  addWarranty,
  getWarranty,
};