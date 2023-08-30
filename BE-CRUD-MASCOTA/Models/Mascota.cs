using System;
using System.Collections.Generic;

namespace BE_CRUD_MASCOTA.Models;

public partial class Mascota
{
    public int Idmascota { get; set; }

    public string Nombre { get; set; } = null!;

    public int Edad { get; set; }

    public string Color { get; set; } = null!;

    public string Raza { get; set; } = null!;

    public float Peso { get; set; }

    public DateTime Fechacreacion { get; set; }
}
