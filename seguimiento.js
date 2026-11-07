
const SUPABASE_URL = 'https://jvihfeewciwbjneeyobu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_dURn0hifL6rpTXC2jWO0aw_rfGhAsdt';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', () => {
    const seguimientoForm = document.getElementById('seguimientoForm');
    const mensajeExito = document.getElementById('mensajeExito');
    const mensajeError = document.getElementById('mensajeError');

    if (seguimientoForm) {
        seguimientoForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (mensajeExito) mensajeExito.style.display = 'none';
            if (mensajeError) mensajeError.style.display = 'none';

            const dniAlumno = document.getElementById('dni_alumno').value.trim();
            const dniDocente = document.getElementById('dni_docente').value.trim();
            const fechaEncuentro = document.getElementById('fecha_encuentro').value;
            const avanceComentarios = document.getElementById('avance_comentarios').value.trim();
            const nota = document.getElementById('nota').value.trim();
            const fechaProximoEncuentro = document.getElementById('fecha_proximo_encuentro').value;

            try {
                const { data, error } = await supabaseClient
                    .from('seguimiento')
                    .insert([
                        {
                            dni_alumno: parseInt(dniAlumno),
                            dni_docente: parseInt(dniDocente),
                            fecha_encuentro: fechaEncuentro,
                            avance_comentarios: avanceComentarios,
                            nota: nota,
                            fecha_proximo_encuentro: fechaProximoEncuentro
                        }
                    ]);

                if (error) throw error;

                if (mensajeExito) {
                    mensajeExito.innerText = 'Seguimiento guardado con éxito en Supabase';
                    mensajeExito.style.display = 'block';
                }

                seguimientoForm.reset();

            } catch (err) {
                console.error('Error al guardar seguimiento:', err);
                if (mensajeError) {
                    mensajeError.innerText = 'Error al registrar el seguimiento: ' + err.message;
                    mensajeError.style.display = 'block';
                }
            }
        });
    }
});
