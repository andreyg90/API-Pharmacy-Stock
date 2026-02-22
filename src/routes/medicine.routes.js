import { Router } from "express";
import { getMedicine,getMedicines,createMedicine,updateMedicine,deleteMedicine} from "../controllers/medicine.controller.js";

const router = Router();

router.get('/',getMedicines)
router.get('/:id',getMedicine)
router.post('/',createMedicine)
router.put('/:id',updateMedicine)
router.delete('/:id',deleteMedicine)

export default router;