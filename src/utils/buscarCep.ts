export async function findCEP(cep: string) {
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
        alert("CEP inválido!");
        return null;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (!data.erro) {
            return data;
        } else {
            alert("CEP não encontrado.");
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar CEP: ", error);
        return null;
    }
}