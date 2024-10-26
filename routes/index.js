var express = require("express");
const {
  registerUser,
  verifyEmail,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/UserController");
const upload = require("../utils/multerConfig");
const {
  createTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
} = require("../controllers/TeamController");
const validateTeamMember = require("../middleware/validateTeamMember");
const auth = require("../middleware/auth");
const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/serviceController");
const {
  validateService,
  serviceValidation,
} = require("../middleware/validateServices");
const {
  deleteProject,
  getAllProject,
  getProjectById,
  createProject,
  updateProject,
  getAllProjects,
} = require("../controllers/ProjectController");
const {
  deleteBlog,
  getBlogById,
  getAllBlogs,
  createBlog,
  updateBlog,
} = require("../controllers/BlogController");
const {
  createMessage,
  getAllMessages,
  getMessageById,
  deleteMessage,
} = require("../controllers/contactUsController");
const {
  createSliderImage,
  getAllSliderImages,
  getSliderImageById,
  updateSliderImage,
  deleteSliderImage,
} = require("../controllers/desktopSliderController");
const {
  createMobileSliderImage,
  getAllMobileSliderImages,
  getMobileSliderImageById,
  updateMobileSliderImage,
  deleteMobileSliderImage,
} = require("../controllers/mobileSliderController");
const {
  createGalleryImage,
  getAllGalleryImages,
  getGalleryImageById,
  updateGalleryImage,
  deleteGalleryImage,
} = require("../controllers/galleryController");
var router = express.Router();

// authentication
router.post("/signup", registerUser);
router.get("/verify-email", verifyEmail);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// team
router.post(
  "/team",
  upload.single("profile_photo"),
  validateTeamMember,
  auth,
  createTeamMember
); // ✅
router.get("/team", getAllTeamMembers); // ✅
router.get("/team/:id", getTeamMemberById); // ✅
router.put("/team/:id", upload.single("profile_photo"), auth, updateTeamMember); // ✅
router.delete("/team/:id", auth, deleteTeamMember); // ✅

// services
router.post(
  "/services",
  auth,
  upload.fields([
    { name: "shortVideo", maxCount: 1 },
    { name: "longVideo", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  serviceValidation,
  validateService,
  createService
);
router.get("/services", getAllServices);
router.get("/services/:id", getServiceById);
router.put(
  "/services/:id",
  auth,
  upload.fields([
    { name: "shortVideo", maxCount: 1 },
    { name: "longVideo", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  updateService
);
router.delete("/services/:id", auth, deleteService);

// Project
router.post(
  "/project",
  auth,
  upload.fields([
    { name: "shortVideo", maxCount: 1 },
    { name: "longVideo", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  serviceValidation,
  validateService,
  createProject
);
router.get("/project", getAllProjects);
router.get("/project/:id", getProjectById);
router.put(
  "/project/:id",
  auth,
  upload.fields([
    { name: "shortVideo", maxCount: 1 },
    { name: "longVideo", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  updateProject
);
router.delete("/project/:id", auth, deleteProject);

// Blog
router.post(
  "/blog",
  auth,
  upload.fields([
    { name: "shortVideo", maxCount: 1 },
    { name: "longVideo", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  serviceValidation,
  validateService,
  createBlog
);
router.get("/blogs", getAllBlogs);
router.get("/blog/:id", getBlogById);
router.put(
  "/blog/:id",
  auth,
  upload.fields([
    { name: "shortVideo", maxCount: 1 },
    { name: "longVideo", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  updateBlog
);
router.delete("/blog/:id", auth, deleteBlog);

// contact us
router.post("/contact", createMessage);
router.get("/contact", getAllMessages);
router.get("/contact/:id", getMessageById);
router.delete("/contact/:id", deleteMessage);

// desktop slider
router.post("/desktop-slider", auth, upload.single("image"), createSliderImage);
router.get("/desktop-slider", getAllSliderImages);
router.get("/desktop-slider/:id", getSliderImageById);
router.put(
  "/desktop-slider/:id",
  auth,
  upload.single("image"),
  updateSliderImage
);
router.delete("/desktop-slider/:id", auth, deleteSliderImage);

// Mobile slider
router.post(
  "/mobile-slider",
  auth,
  upload.single("image"),
  createMobileSliderImage
);
router.get("/mobile-slider", getAllMobileSliderImages);
router.get("/mobile-slider/:id", getMobileSliderImageById);
router.put(
  "/mobile-slider/:id",
  auth,
  upload.single("image"),
  updateMobileSliderImage
);
router.delete("/mobile-slider/:id", auth, deleteMobileSliderImage);

// Routes for gallery images
router.post("/gallery", auth, upload.single("image"), createGalleryImage);
router.get("/gallery", getAllGalleryImages);
router.get("/gallery/:id", getGalleryImageById);
router.put("/gallery/:id", auth, upload.single("image"), updateGalleryImage);
router.delete("/gallery/:id", auth, deleteGalleryImage);

module.exports = router;
