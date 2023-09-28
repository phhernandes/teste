import { PlayCircleOutlined,Search} from '@mui/icons-material';
import '@/app/globals.css';
import Titulo from "@/components/Titulo";
import CardSom from "@/components/CardSom";

async function carregarDados(){
  const url = "http://localhost:3011/favoritos"
  const response = await fetch(url)
  const json = await response.json()
  console.log(json);
  return json
}

export default async function Favoritos() {

const musicas = await carregarDados()
  
  return (
    <>
      <nav className="bg-slate-700 text-zinc-100 p-5">
        <ul className="flex flex-row justify-between px-10">
          <li className='flex space-x-0.5'>
            <PlayCircleOutlined className='text-3xl' style={{ color:'#FF5964' }}/>
            <a href="/" className="text-3xl font-bold">Beats</a>
          </li>
          <li>
            <a href="/favoritas" className='text-2xl font-bold'>Favoritos</a>
          </li>
          <li>
          <div className="flex items-center text-base bg-slate-500 rounded-2xl " >
              <Search href="#" className="text-4xl pl-3" style={{ color:'#FF5964' }}/>
              <input
                type="text"
                placeholder="O que você deseja ouvir?"
                className="bg-transparent text-sm py-1 px-1 font-bold text-decoration-line: none text-slate-300"
              />
            </div>
          </li>
          <li>
            <a href="#" className='text-2xl font-bold'>Sobre</a>
          </li>
        </ul>
      </nav>
      
      {/*fileira lançamentos*/}
      
      <Titulo>Favoritos</Titulo>
      
      <section className="flex flex-wrap px-40 justify-between text-zinc-100">
       <CardSom musica={musicas} />
      </section>
    </>    
  )
}