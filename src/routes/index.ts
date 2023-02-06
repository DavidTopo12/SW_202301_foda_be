import express from 'express';
const router  = express.Router();
import empresasRouter from './empresas/empresas';
import usuariosRouter from './usuarios/usuarios';

//REST API
//Internet -> HTTP -> REST API -> DB
//SOAP XML
//{} -> JSON 
//[] -> JSON
// {LLAVE: VALOR}
// VALOR: texto, numerico, booleano, array [valores], objeto {llave:valor}

//  REST stateless, resource unique representation
//CRUD -> CREATE, READ, UPDATE, DELETE
//32 metodos que las peticione http pueden manejar: GET, POST, PUT, DELETE


//https://localhost:3001
router.get('/', (_req, res) => {
  res.json({msg:'Hello World!'});
 });


 //https://localhost:3001/version
 router.get('/version', (_req, res)=>{
  //const no va a ser modificado
  const version: string="1.0.0";
  const jsonResp= {"name":"FODA Be", "version":version};
  //string, number, boolean, types, interfaces, classses, enumerators 
  
  //para responder
  res.json(jsonResp);
});


//EMPRESAS
router.use('/empresas', empresasRouter);

// USUARIOS
router.use('/usuarios', usuariosRouter);


//router.get router.post router.put router.delete router.use
//

export default router;
