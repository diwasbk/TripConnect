import express from "express";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { packageBasicInfoSchema } from "../types/package.types";
import PackageController from "../controllers/package.controller";
import { upload } from "../middlewares/multer.middleware";

const packageRouter = express.Router();
const packageController = new PackageController();

packageRouter.get("/all", packageController.getAllPackagesByStatus);
packageRouter.get("/live", packageController.getAllLivePackages);
packageRouter.get("/:packageID", packageController.getSinglePackageById);
packageRouter.post("/create-basic-info", schemaValidateMiddleware(packageBasicInfoSchema), packageController.createPackageBasicInfo);
packageRouter.put("/update-basic-info/:packageID", schemaValidateMiddleware(packageBasicInfoSchema.partial()), packageController.updatePackageBasicInfoByID);
packageRouter.put("/update-photo/:packageID", upload.single("myfile"), packageController.updatePackagePhotosByPackageID);
packageRouter.delete("/delete-photo/:packageID", packageController.deletePackagePhotoByPackageID);
packageRouter.delete("/delete/:packageID", packageController.deleteSinglePackageById);

export default packageRouter;