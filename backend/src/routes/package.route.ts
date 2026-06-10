import express from "express";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { departureSchema, itinerarySchema, packageBasicInfoSchema } from "../types/package.types";
import PackageController from "../controllers/package.controller";
import { upload } from "../middlewares/multer.middleware";

const packageRouter = express.Router();
const packageController = new PackageController();

packageRouter.get("/all", packageController.getAllPackagesByStatus);
packageRouter.get("/live", packageController.getAllLivePackages);
packageRouter.get("/top-booked", packageController.getTopBookedPackages);
packageRouter.get("/:slug", packageController.getPackageBySlug);
packageRouter.get("/:packageId", packageController.getPackageById);
packageRouter.post("/create-basic-info", schemaValidateMiddleware(packageBasicInfoSchema), packageController.createPackageBasicInfo);
packageRouter.put("/update-basic-info/:packageId", schemaValidateMiddleware(packageBasicInfoSchema.partial()), packageController.updatePackageBasicInfoById);
packageRouter.put("/upload-photo/:packageId", upload.single("myfile"), packageController.uploadPackagePhotosByPackageId);
packageRouter.delete("/delete-photo/:packageId", packageController.deletePackagePhotoByPackageId);
packageRouter.delete("/delete/:packageId", packageController.deletePackageById);

packageRouter.put("/itinerary/add/:packageId", schemaValidateMiddleware(itinerarySchema), packageController.addPackageItineraryByPackageId);
packageRouter.get("/itinerary/:packageId", packageController.getPackageItineraryByPackageId);
packageRouter.put("/itinerary/update/:packageId/:itineraryId", schemaValidateMiddleware(itinerarySchema.partial()), packageController.updatePackageItineraryByItineraryId);
packageRouter.delete("/itinerary/delete/:packageId/:itineraryId", packageController.deleteItineraryByItineraryId);

packageRouter.put("/departure/add/:packageId", schemaValidateMiddleware(departureSchema), packageController.addPackageDepartureByPackageId);
packageRouter.get("/departure/:packageId", packageController.getPackageDepartureByPackageId);
packageRouter.put("/departure/update/:packageId/:departureId", schemaValidateMiddleware(departureSchema.partial()), packageController.updatePackageDepartureByDepartureId);
packageRouter.delete("/departure/delete/:packageId/:departureId", packageController.deleteDepartureByDepartureId);

packageRouter.patch("/publish/:packageId", packageController.publishPackageByPackageID);
packageRouter.patch("/activate-deactivate/:packageId/:isActive", packageController.activateORdeactivatePackagebyId);

export default packageRouter;