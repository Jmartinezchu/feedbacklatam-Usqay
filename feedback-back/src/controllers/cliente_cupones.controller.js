import { getConnection } from './../database/database';
import {DateFormat} from "../global/date-format";

const getCupones = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query(
      `SELECT cp.name as nameCompanie, s.name as nameSucursal, f.name as nameForm, cl.nombre as nameCliente, cl.celular as celCliente, 
        cg.nombre_cupon, cg.valor_cupon, DATE_FORMAT(cg.fecha_limit, '${DateFormat}') as fecha_limit, DATE_FORMAT(cg.create_at, '${DateFormat}') as create_at,
        cg.id_state_cg, cg.cupon_code, cg.fecha_reclamado, scg.valor as stateValCupon, s.address as sucuAdrress
        from cupones_ganados cg
        INNER JOIN companies cp on cp.id = cg.id_companie
        INNER JOIN branch_offices s on s.id = cg.id_sucursal
        INNER JOIN formularios f on f.id = cg.id_form
        INNER JOIN clients cl on cl.id = cg.id_client      
        INNER JOIN state_cg scg on scg.id = cg.id_state_cg
        WHERE cg.id_client = ${id} and cg.nombre_cupon != 'Sigue intentando' `
    );
    res.json(result);
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    console.log(error);
  }
};

export const methods = {
  getCupones,
};
