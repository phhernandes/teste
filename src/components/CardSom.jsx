"use client"

import React, { useEffect, useState } from 'react';
import { HeartIcon } from "@heroicons/react/solid";
import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline';

function SeuComponente() {
  const [musicaData, setMusicaData] = useState([]); // Estado para armazenar os dados das músicas

  useEffect(() => {
    // Função para buscar os dados das músicas da API do Vagalume
    const buscarDadosDasMusicas = async () => {
      try {
        // Fazer a chamada à API do Vagalume (substitua pela URL correta)
        const response = await fetch('https://api.vagalume.com.br/rank.php?type=alb&period=month&periodVal=202309&scope=nacional&limit=10&apikey={c5efc47c2e8e46f1086a5154bdb7af07}');
        if (!response.ok) {
          throw new Error('Erro na requisição à API');
        }

        // Converter a resposta em JSON
        const data = await response.json();

        // Atualizar o estado com os dados das músicas
        setMusicaData(data.alb.month.nacional);
      } catch (error) {
        console.error('Erro ao buscar dados das músicas:', error);
      }
    };

    // Chamada à função para buscar os dados das músicas
    buscarDadosDasMusicas();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {musicaData.map((musica) => {
        const favorito = false; // Defina aqui o estado de favorito para cada música
        return (
          <div key={musica.id} className="flex flex-col gap-1 items-center bg-slate-700 p-4 rounded-lg w-56 m-2 shadow-md">
            <img alt={musica.name} src={musica.cover} className="rounded-lg line-clamp-1" />
            <a className="font-normal text-lg w-full text-center line-clamp-1">{musica.name}</a>
            <a className="font-light text-lg w-full text-center line-clamp-1">{musica.art && musica.art.name}</a>
            <button
              onClick={() => {
                // Lógica para favoritar ou desfavoritar a música aqui
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
