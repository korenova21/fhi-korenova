function vypisPismena(veta: string): void {
    // obmedzenie na max 255 znakov
    const text = veta.slice(0, 255).toLowerCase();

    const pocitadlo: { [key: string]: number } = {};

    for (let i = 0; i < text.length; i++) {
        const znak = text[i]!;

        // zoberieme len písmená a-z
        if (znak >= "a" && znak <= "z") {
            if (!pocitadlo[znak]) {
                pocitadlo[znak] = 0;
            }
            pocitadlo[znak]++;
        }
    }

    for (const pismeno in pocitadlo) {
        console.log(`${pismeno} ${pocitadlo[pismeno]}`);
    }
}

vypisPismena("Alabama");