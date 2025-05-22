import { useEffect, useState } from "react";
import Inputmask from "inputmask";

import { findCEP } from "../../utils/buscarCep";

import gnome from "../../assets/gnome.png";
import gnome2 from "../../assets/gnome2.png";
import gnome3 from "../../assets/gnome3.png";
import gnome4 from "../../assets/gnome4.png";

const Conteudo = () => {
  const images = [gnome, gnome2, gnome3, gnome4];
  const [mainImg, setMainImg] = useState(images[0]);
  const [cep, setCep] = useState("");
  const [size, setSize] = useState("");
  const [endereco, setEndereco] = useState(null);

  const variantes = [
    { cor: "White", image: gnome },
    { cor: "Green", image: gnome2 },
    { cor: "Red", image: gnome3 },
    { cor: "Blue", image: gnome4 },
  ];

  const sizes = ["P", "M", "G"];

  const handleBlur = async () => {
    const dados = await findCEP(cep);
    if (dados) setEndereco(dados);
  };

  const saveActions = (data) => {
    const savedData = { ...data, timestamp: Date.now() };
    localStorage.setItem("userActions", JSON.stringify(savedData));
  };

  const getActions = () => {
    const data = JSON.parse(localStorage.getItem("userActions"));
    return data && (Date.now() - data.timestamp) / 60000 < 15 ? data : null;
  };

  console.log("informações salvas: ", getActions());

  useEffect(() => {
    const savedActions = getActions();
    if (savedActions) {
      setCep(savedActions.cep);
      setSize(savedActions.size);

      const corSelecionada = variantes.find((v) => v.cor === savedActions.cor);
      if (corSelecionada) setMainImg(corSelecionada.image);
    }
  }, []);

  useEffect(() => {
    Inputmask("99999-999").mask("#cep");
  }, []);

  return (
    <div className="flex min-w-[320px] min-h-screen m-0 bg-gray-100 rounded-lg mt-5 ">
      <div id="product-images" className="block ml-20">
        <img
          src={mainImg}
          alt="Produto"
          className=" m-auto rounded-lg mt-20 shadow-md mb-10"
        />
        <div className="flex gap-2 mb-10">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Miniatura ${index}`}
              className="w-32 h-32 rounded cursor-pointer"
              onClick={() => setMainImg(img)}
            />
          ))}
        </div>
        <input
          type="text"
          value={cep}
          id="cep"
          placeholder="Consulte o frete"
          className="border p-2 bg-white rounded-md border-black-300 focus:ring-2 focus:ring-green-500"
          onChange={(e) => {
            setCep(e.target.value), saveActions({ cep, cor: mainImg });
          }}
        />
        <button
          className="text-white bg-customGreen m-5 p-3 rounded-md cursor-pointer"
          onClick={handleBlur}
          style={{ backgroundColor: "#006266" }}
        >
          Consultar
        </button>
        {endereco && (
          <p>
            <strong>
              Endereço: {endereco.bairro}, {endereco.localidade} - {endereco.uf}
            </strong>
          </p>
        )}
      </div>
      <div className="w-100 h-150 ml-30 mt-20">
        <h1
          style={{
            fontFamily: ["Abril Fatface", "sans-serif"],
          }}
          className="text-[50px]"
        >
          Gnomos de Jardim
        </h1>
        <h3>By: Gnomos Gnomísticos</h3>
        <h2 className="text-[20px] line-through  mt-10">de R$ 50,00</h2>
        <h2 className="text-[24px] mb-10">por R$ 49,90 !</h2>
        <div id="thumbnail" className=" w-100">
          <h2>Escolha um tamanho:</h2>
          <select
            className="mb-5 mt-5 border p-2 rounded-md"
            value={size}
            onChange={(e) => {
              setSize(e.target.value);
              saveActions({ cep, mainImg, size: e.target.value });
            }}
          >
            {sizes.map((sizeOption) => (
              <option key={sizeOption} value={sizeOption}>
                {sizeOption}
              </option>
            ))}
          </select>
          <h2>Escolha uma cor:</h2>
          <div className="flex gap-4 justify-center mt-5 mb-10">
            {variantes.map((variante, index) => (
              <img
                key={index}
                src={variante.image}
                alt={`Miniatura ${index}`}
                className="w-14 h-14 rounded cursor-pointer hover:scale-125 transition-transform duration-300 "
                onClick={() => {
                  setMainImg(variante.image);
                  saveActions({ cep, cor: variante.cor });
                }}
              />
            ))}
          </div>
        </div>
        <p>
          ✨ Os Melhores Gnomos de Jardim do Mundo! ✨
          <br /> Se existe algo que pode transformar qualquer jardim em um lugar
          mágico, são os gnomos de jardim! Com seus chapéus pontudos e
          expressões encantadoras, esses pequenos guardiões trazem um toque de
          humor e fantasia para qualquer espaço ao ar livre. 🌿
        </p>
      </div>
    </div>
  );
};

export default Conteudo;
