export async function generateAvatar(address: string, size = 100) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        console.error("No se pudo obtener el contexto del canvas.");
        return null;
    }

    canvas.width = size;
    canvas.height = size;

    // Función de hash mejorada utilizando SHA-256
    const hash = await sha256(address);

    // Convertir los primeros 6 caracteres del hash a números para colores
    const color1 = `#${hash.slice(0, 6)}`;
    const color2 = `#${hash.slice(6, 12)}`;
    const color3 = `#${hash.slice(12, 18)}`;

    // Fondo
    ctx.fillStyle = color1;
    ctx.fillRect(0, 0, size, size);

    // Patrones simétricos
    const numberOfShapes = 6;
    const angleIncrement = (Math.PI * 2) / numberOfShapes;
    const radius = size / 2.5;

    for (let i = 0; i < numberOfShapes; i++) {
        const angle = i * angleIncrement;
        const x = size / 2 + radius * Math.cos(angle);
        const y = size / 2 + radius * Math.sin(angle);

        ctx.beginPath();
        ctx.arc(x, y, size / 10, 0, Math.PI * 2);
        ctx.fillStyle = color2;
        ctx.fill();

        // Añadir líneas para mayor complejidad
        ctx.strokeStyle = color3;
        ctx.lineWidth = 2;
        ctx.moveTo(size / 2, size / 2);
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    // Añadir un círculo central
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 6, 0, Math.PI * 2);
    ctx.fillStyle = color3;
    ctx.fill();

    return canvas.toDataURL("image/png");
}

// Función de hash SHA-256 utilizando SubtleCrypto
async function sha256(str: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    return await crypto.subtle.digest("SHA-256", data).then(hashBuffer => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    });
}