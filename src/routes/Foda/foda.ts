import express from 'express';
import { Foda } from '@libs/FODA/Foda';
import { EmpresasDAO } from '@dao/models/Empresas/EmpresasDAO';
import { MongoDBConn } from '@dao/MongoDBConn';
import { FodaDao } from '@dao/models/FODA/FodaDao';
import { Empresas } from '@libs/Empresas/Empresas';

const empresasDao = new EmpresasDAO(MongoDBConn);
let fodaDao;
let empresasModel: Empresas;
let fodaModel: Foda;
empresasDao.init().then(() => {
    empresasModel = new Empresas(empresasDao);
    fodaDao = new FodaDao(MongoDBConn, empresasDao);
    fodaDao.init().then(() => {
        fodaModel = new Foda(fodaDao, empresasDao);
    });
});

const router = express.Router();

router.post('/:empresa/new', async (req, res) => {
    const { empresa } = req.params as { empresa: string };
    const { nombre } = req.body;
    const result = await fodaModel.newFoda(nombre, empresa);
    return res.status(200).json(result);
});

router.put('/:empresa/tmp/:fodaId', async (req, res) => {
    const { fodaId } = req.params;
    const { type } = req.body;
    const updt = await fodaModel.updateFoda(fodaId, type);
    return res.status(200).json(updt);
});

router.put('/:empresa/upd/:fodaId/nombre', async (req, res)=>{
    const {fodaId} = req.params;
    const {nombre} = req.body;
    const updObject = await fodaModel.setNombre(fodaId, nombre);
    return res.status(200).json(updObject);
  });
  router.put('/:empresa/upd/:fodaId/estado', async (req, res)=>{
    const {fodaId} = req.params;
    const {estado} = req.body;
    const updObject = await fodaModel.setEstado(fodaId, estado);
    return res.status(200).json(updObject);
  });
  router.put('/:empresa/upd/:fodaId/observacion', async (req, res)=>{
    const {fodaId} = req.params;
    const {observacion} = req.body;
    const updObject = await fodaModel.setObservation(fodaId, observacion);
    return res.status(200).json(updObject);
  });

export default router;