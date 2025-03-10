const deleteFile = require("../helpers/deleteFile");
const bannerModel = require("../model/banner.model");
const path = require("path");

/**
 * All Banner
 */
const allBanner = async (req, res) => {
  try {
    let banners = await bannerModel.find({});

    res.status(200).send({
      success: true,
      msg: "Banner is fetch success",
      data: banners,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/**
 * Add New Banner
 */
const addNewBanner = async (req, res) => {
  const { description, advertisementLink } = req.body;
  const { filename } = req.file;

  if (filename) {
    try {
      let banner = new bannerModel({
        banner: `${process.env.HOST_URL}${process.env.PORT}/${filename}`,
        description,
        advertisementLink,
      });

      await banner.save();

      res.status(201).send({
        success: true,
        msg: "New Banner Uploaded",
        data: banner,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        msg: "Internal Server Error",
        error,
      });
    }
  } else {
    res.status(404).send({
      success: false,
      msg: "Please fill all fields",
    });
  }
};

/**
 * Delete The banner
 */
const deleteBanner = async (req, res) => {
  const { id } = req.params;

  try {
    let banner = await bannerModel.findOneAndDelete({ _id: id });

    let imagePath = banner.banner.split("/");
    let oldImagePath = imagePath[imagePath.length - 1];

    try {
      await deleteFile(`${path.join(__dirname, "../temp")}/${oldImagePath}`);
      res.status(200).send({
        success: true,
        msg: "Banner Delete Success",
      });
    } catch (fileDeleteErr) {
      return res.status(500).send({
        success: false,
        msg: "Internal Server Error",
        fileDeleteErr,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

module.exports = { allBanner, addNewBanner, deleteBanner };
