"use client"

import React, { useEffect, useState } from 'react';
import { HeartIcon } from "@heroicons/react/solid";
import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline';

function SeuComponente() {
  const [musicaData, setMusicaData] = useState([]); // Estado para armazenar os dados das músicas
  const [favoritos, setFavoritos] = useState({}); // Estado para acompanhar as músicas favoritas

  useEffect(() => {

    // Função para buscar os dados das músicas da API do Vagalume
    const buscarDadosDasMusicas = async () => {
      try {
        // Fazer a chamada à API do Vagalume (substitua pela URL correta)
        const response = await fetch('https://api.vagalume.com.br/rank.php?type=alb&period=month&periodVal=202309&scope=internacional&limit=20&apikey={c5efc47c2e8e46f1086a5154bdb7af07}');
        if (!response.ok) {
          throw new Error('Erro na requisição à API');
        }

        // Converter a resposta em JSON
        const data = await response.json();

        // Aplicar a transformação nas URLs de 'cover' nos dados
        transformarURLsNoJSON(data);

        // Atualizar o estado com os dados das músicas
        setMusicaData(data.alb.month.internacional);
      } catch (error) {
        console.error('Erro ao buscar dados das músicas:', error);
      }
    };

    // Chamada à função para buscar os dados das músicas
    buscarDadosDasMusicas();
  }, []);

  function transformarURL(url) {
    // Substitua o padrão "-W100.jpg" por ".webp"
    return url.replace(/-W100\.jpg$/, '.webp');
  }

  // Função para percorrer e transformar URLs em um objeto JSON
  function transformarURLsNoJSON(objetoJSON) {
    for (const chave in objetoJSON) {
      if (typeof objetoJSON[chave] === 'object') {
        // Recursivamente, se a propriedade for um objeto, percorra-o também
        transformarURLsNoJSON(objetoJSON[chave]);
      } else if (chave === 'cover' && typeof objetoJSON[chave] === 'string') {
        // Se a propriedade for 'cover' e for uma string, aplique a transformação
        objetoJSON[chave] = transformarURL(objetoJSON[chave]);
      }
    }
  }

  function toggleFavorito(id) {
    setFavoritos((prevState) => {
      // Verifique se a música já está nos favoritos
      if (prevState[id]) {
        const newFavoritos = { ...prevState };
        delete newFavoritos[id]; // Remova a música dos favoritos
        return newFavoritos;
      } else {
        return { ...prevState, [id]: true }; // Adicione a música aos favoritos
      }
    });
  }

  return (
    <div className="flex flex-wrap gap-10 justify-center">
      {musicaData.map((musica) => {
        const favorito = favoritos[musica.id]; // Verifique se a música está nos favoritos
        return (
          <div key={musica.id} className="flex flex-col gap-1 items-center bg-slate-700 p-4 rounded-lg w-56 m-2 shadow-md">
            <img alt={musica.name} src={transformarURL(musica.cover)} className="rounded-lg h-48 line-clamp-1" />
            <a className="font-normal text-lg w-full text-center line-clamp-1">{musica.name}</a>
            <a className="font-light text-lg w-full text-center line-clamp-1">{musica.art && musica.art.name}</a>
            <button
              onClick={() => {
                toggleFavorito(musica.id); // Alternar a música entre favorita e não favorita
              }}
            >
              {favorito ? (
                <HeartIcon
                  className="h-6 w-6 text-[#FF5964]  cursor-pointer"
                />
              ) : (
                <HeartIconOutline
                  className="h-6 w-6 text-zinc-100  cursor-pointer hover:text-[#FF5964]"
                />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default SeuComponente;
