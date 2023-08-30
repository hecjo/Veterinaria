using BE_CRUD_MASCOTA.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BE_CRUD_MASCOTA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MascotaController : ControllerBase
    {
        private readonly ModelContext _context;

        public MascotaController(ModelContext context)
        {
            _context = context;
        }

        //Obtener todos los campos de la tabla (select * from Tabla)

        [HttpGet]
        public async Task<IActionResult> GetLisMasc()
        {
            try
            {
                var listMascotas = await _context.Mascotas.ToListAsync();
                return Ok(listMascotas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Obtener registro por filtro con id (select * from Tabla where idTabla = id)

        [HttpGet("{id}")]
        public async Task<ActionResult<Mascota>> GetMasc(int id)
        {
            try
            {
                var mascota = await _context.Mascotas.FindAsync(id);
                return Ok(mascota);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Metodo para eliminar (delete * from tabla where idTabla = id)

        [HttpDelete("{id}")]

        public async Task<IActionResult> DelMasc(int id)
        {
            try
            {
                var mascota = await _context.Mascotas.FindAsync(id);

                if (mascota == null)
                {
                    return NotFound();
                }

                _context.Mascotas.Remove(mascota);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Metodo para insertar (insert into Tabla (campos) Values()

        [HttpPost]
        public async Task<IActionResult> PostMasc(Mascota mascota)
        {
            try
            {
                mascota.Fechacreacion = DateTime.Now;
                _context.Add(mascota);
                await _context.SaveChangesAsync();
                return CreatedAtAction("Get", new { idmascota = mascota.Idmascota }, mascota);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Metodo para actualizar un registro.

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMasc(int id , Mascota mascota)
        {
            try
            {
                var mascotaItem = await _context.Mascotas.FindAsync(id);

                if ( id != mascota.Idmascota)
                {
                    return BadRequest();
                }

                if(mascotaItem == null)
                {
                    return NotFound();
                }

                //Actualización de campos en especifico.
                mascotaItem.Nombre = mascota.Nombre;
                mascotaItem.Edad = mascota.Edad;
                mascotaItem.Color = mascota.Color;
                mascotaItem.Raza = mascota.Raza;
                mascotaItem.Peso = mascota.Peso;

                await _context.SaveChangesAsync();
                return NotFound();

                //Para este caso se me actualiza la fecha de creación, es decir actualiza todos los campos
                //_context.Update(mascota);
                //await _context.SaveChangesAsync();
                //return NotFound();
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}