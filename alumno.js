
const SUPABASE_URL = 'https://jvihfeewciwbjneeyobu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_dURn0hifL6rpTXC2jWO0aw_rfGhAsdt'; // Tu clave

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', () => {
    const alumnoForm = document.getElementById('alumnoForm');
    const mensajeExito = document.getElementById('mensajeExito');
    const mensajeError = document.getElementById('mensajeError');

    if (alumnoForm) {
        alumnoForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (mensajeExito) mensajeExito.style.display = 'none';
            if (mensajeError) mensajeError.style.display = 'none';

            const dni = document.getElementById('dni_alumno').value.trim();
            const apellido = document.getElementById('apellido').value.trim();
            const nombre = document.getElementById('nombre').value.trim();
            const correo = document.getElementById('correo_electronico').value.trim();

            try {
                const { data, error } = await supabaseClient
                    .from('alumnos')
                    .insert([
                        {
                            dni_alumno: parseInt(dni),
                            apellido: apellido,
                            nombre: nombre,
                            correo_electronico: correo
                        }
                    ]);

                if (error) throw error;

                if (mensajeExito) {
                    mensajeExito.innerText = 'Alumno guardado con éxito en Supabase';
                    mensajeExito.style.display = 'block';
                }

                alumnoForm.reset();

            } catch (err) {
                console.error('Error al guardar alumno:', err);
                if (mensajeError) {
                    mensajeError.innerText = 'Error al registrar el alumno: ' + err.message;
                    mensajeError.style.display = 'block';
                }
            }
        });
    }
});
