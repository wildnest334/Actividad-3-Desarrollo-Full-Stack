// ------------------------------
// Rutas directas de usuarios (register/login)
// ------------------------------
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ error: 'Username y password son obligatorios' });

    const usuarios = await obtenerUsuarios();
    if (usuarios.find(u => u.username === username))
        return res.status(400).json({ error: 'Usuario ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10);
    usuarios.push({ username, password: hashedPassword });
    await guardarUsuarios(usuarios);

    // Generar token al registrarse
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente', token });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ error: 'Username y password son obligatorios' });

    const usuarios = await obtenerUsuarios();
    const usuario = usuarios.find(u => u.username === username);
    if (!usuario) return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });

    // Generar token al iniciar sesión
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ mensaje: 'Login exitoso', token });
});
