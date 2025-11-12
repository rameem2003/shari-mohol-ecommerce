const {
  findAllBanners,
  createBanner,
  removeBanner,
} = require("../services/banner.service");
const deleteFile = require("../utils/fileDelete");
const bannerUploadValidator = require("../validator/bannerData.validator");

/**
 * All Banner
 */
const allBanner = async (req, res) => {
  try {
    let banners = await findAllBanners();

    res.status(200).send({
      success: true,
      message: "Banner is fetch success",
      data: banners,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

/**
 * Add New Banner
 */
const addNewBanner = async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }

  let filename = req?.file?.filename || "";
  const { data, error } = bannerUploadValidator.safeParse(req.body);

  if (error) {
    await deleteFile("../uploads/banners/", filename);
    return res
      .status(400)
      .json({ success: false, message: JSON.parse(error.message)[0].message });
  }

  if (!filename || !req.file) {
    return res
      .status(400)
      .json({ success: false, message: "Banner image is required" });
  }

  try {
    let newBanner = await createBanner(
      data.description,
      data.advertisementLink,
      filename
    );

    return res.status(201).send({
      success: true,
      message: "Banner created successfully",
      data: newBanner,
    });
  } catch (error) {
    await deleteFile("../uploads/banners/", filename);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

/**
 * Delete The banner
 */
const deleteBanner = async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }

  const { id } = req.params;

  try {
    let deletedBanner = await removeBanner(id);

    res.status(200).send({
      success: true,
      message: "Banner deleted successfully",
      data: deletedBanner,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

module.exports = { allBanner, addNewBanner, deleteBanner };
