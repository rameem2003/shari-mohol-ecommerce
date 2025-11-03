const bannerModel = require("../model/banner.model");
const deleteFile = require("../utils/fileDelete");

const findAllBanners = async () => {
  try {
    let banners = await bannerModel.find({});

    return banners;
  } catch (error) {
    console.log("Error finding banners: ", error);
    throw new Error("Error finding banners: " + error.message);
  }
};

const createBanner = async (description, advertisementLink, imagePath) => {
  try {
    let newBanner = new bannerModel({
      description,
      advertisementLink,
      banner: imagePath,
    });
    await newBanner.save();
    return newBanner;
  } catch (error) {
    console.log("Error creating banner: ", error);
    throw new Error("Error creating banner: " + error.message);
  }
};

const removeBanner = async (id) => {
  try {
    let targetBanner = await bannerModel.findOneAndDelete({ _id: id });
    await deleteFile("../uploads/banners/", targetBanner.banner);
    return targetBanner;
  } catch (error) {
    console.log("Error deleting banner: ", error);
    throw new Error("Error deleting banner: " + error.message);
  }
};

module.exports = {
  findAllBanners,
  createBanner,
  removeBanner,
};
