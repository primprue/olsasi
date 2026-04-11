const PORT = 4000;
import app from './backend.mjs';
app.get('/', (req, res) => {
    res.send("¡Estás en la raíz del servidor!");
});

app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
});