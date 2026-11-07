
// 1. Configuración de conexión a Supabase
const SUPABASE_URL = 'https://jvihfeewciwbjneeyobu.supabase.co';
// Pegá entre las comillas tu Publishable Key completa que copiaste de Supabase
const SUPABASE_KEY = 'sb_publishable_dURn0hifL6rpTXC2jWO0aw_rfGhAsdt';

// Inicializar el cliente oficial de Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const mensajeError = document.getElementById('mensajeError');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const usuarioInput = document.getElementById('usuario').value.trim();
            const claveInput = document.getElementById('clave').value.trim();

            mensajeError.style.display = 'none';

            try {
                // 2. Consulta directa a la tabla 'usuarios' de Supabase
                const { data: usuarios, error } = await supabaseClient
                    .from('usuarios')
                    .select('*')
                    .eq('usuario', usuarioInput)
                    .eq('clave', claveInput);

                if (error) {
                    throw error;
                }

                // 3. Validar si encontró coincidencia
                if (usuarios && usuarios.length > 0) {
                    const usuarioEncontrado = usuarios[0];

                    // Guardar la sesión en el navegador como hacíamos antes
                    sessionStorage.setItem('usuarioLogueado', JSON.stringify({
                        usuario: usuarioEncontrado.usuario,
                        nombre: usuarioEncontrado.nombre,
                        rol: usuarioEncontrado.rol
                    }));

                    // Redireccionar al dashboard de reportes
                    window.location.href = 'reportes.html';
                } else {
                    mensajeError.innerText = 'Usuario o contraseña incorrectos';
                    mensajeError.style.display = 'block';
                }

            } catch (err) {
                console.error('Error al conectar con Supabase:', err);
                mensajeError.innerText = 'Error de conexión con la base de datos';
                mensajeError.style.display = 'block';
            }
        });
    }
});
