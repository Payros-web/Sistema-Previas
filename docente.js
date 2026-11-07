
const SUPABASE_URL = 'https://jvihfeewciwbjneeyobu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_dURn0hifL6rpTXC2jWO0aw_rfGhAsdt';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', () => {
    const docenteForm = document.getElementById('docenteForm');
    const mensajeExito = document.getElementById('mensajeExito');
    const mensajeError = document.getElementById('mensajeError');

    if (docenteForm) {
        docenteForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (mensajeExito) mensajeExito.style.display = 'none';
            if (mensajeError) mensajeError.style.display = 'none';

            const dni = document.getElementById('dni_docente').value.trim();
            const apellido = document.getElementById('apellido').value.trim();
            const nombre = document.getElementById('nombre').value.trim();
            const materia = document.getElementById('materia').value.trim();

            try {
                const { data, error } = await supabaseClient
                    .from('docentes')
                    .insert([
                        {
                            dni_docente: parseInt(dni),
                            apellido: apellido,
                            nombre: nombre,
                            materia: materia
                        }
                    ]);

                if (error) throw error;

                if (mensajeExito) {
                    mensajeExito.innerText = 'Docente guardado con éxito en Supabase';
                    mensajeExito.style.display = 'block';
                }

                docenteForm.reset();

            } catch (err) {
                console.error('Error al guardar docente:', err);
                if (mensajeError) {
                    mensajeError.innerText = 'Error al registrar el docente: ' + err.message;
                    mensajeError.style.display = 'block';
                }
            }
        });
    }
});
