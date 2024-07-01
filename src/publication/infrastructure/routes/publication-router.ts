// infrastructure/publication-router.ts
import express from "express";
import { publicationController } from "../dependencies-publication";
import { upload } from "../adapters/storages/local-file-storage";

const publicationRouter = express.Router();

publicationRouter.get("/getAll", publicationController.getAll.bind(publicationController));
publicationRouter.post("/create", upload.single('image'), publicationController.create.bind(publicationController));
publicationRouter.get("/:id", publicationController.getById.bind(publicationController));
publicationRouter.put('/:id', upload.single('image'), publicationController.update.bind(publicationController));
publicationRouter.delete('/:id', publicationController.delete.bind(publicationController));

export { publicationRouter };
