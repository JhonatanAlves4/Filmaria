import { useEffect, useState } from 'react';
import './filme-info.css'
import { useParams, useHistory} from 'react-router-dom';
import '../../Services/api';
import api from '../../Services/api';
import { toast } from 'react-toastify';
<style>
@import url('https://fonts.googleapis.com/css2?family=Andada+Pro&display=swap');
</style>

export default function Filme() {
    const { id } = useParams();
    const history = useHistory();
    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadFilme(){
            const response = await api.get(`r-api/?api=filmes/${id}`)
            
            if(response.data.length === 0){
                //Tentou acessar com um id que não existe
                history.replace("/");
                return;
            }

            setFilme(response.data);
            setLoading(false)
        }

        loadFilme();

        return() => {
            console.log("Componente desmontado")
        }

    }, [history ,id]);

    function salvaFilme() {
        
        const minhaLista = localStorage.getItem('filmes');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        //Se tiver algum filme salvo com o mesmo id, precisa ignorar...
        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

        if(hasFilme) {
            toast.warn("Você já possui esse filme salvo")
            return;//para a execução aqui...
        }

        filmesSalvos.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!")
    }

    if(loading){
        return(
            <div className="filme-info">
               <h2>Carregando seu filme, aguarde...</h2>
            </div>
        )
    }

    return(
        
        <div className="filme-info">
            <h1>{filme.nome}</h1>
            <img src={filme.foto} alt={filme.nome}/>

            <h3>Sinopse</h3>

            <p className="paragraph">{filme.sinopse}</p>

            <div className="botoes">
                <button onClick={ salvaFilme } className="btnSalvar">Salvar</button>
                <button>
                    <a target="blank" href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}