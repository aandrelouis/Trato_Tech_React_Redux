import Header from "components/Header";
import { useDispatch, useSelector } from "react-redux";
import styles from './Anuncie.module.scss'
import Button from "components/Button";

import { useForm } from 'react-hook-form';
import { cadastrarItem } from "store/reducers/itens";
import { useParams } from "react-router-dom";
import Input from "components/Input";

export default function Anuncie() {
    const categorias = useSelector((state) => state.categorias.map(({id,nome}) => ({id, nome})))
    const dispatch = useDispatch();
    const { nomeCategoria = ''} = useParams();

    const {
        register,
        handleSubmit
    } = useForm({
        defaultValues:{
            categoria: nomeCategoria,
        }
    });
  
    function cadastrar(data){
        dispatch(cadastrarItem(data))
    }


    return (
    <div className={styles.container}>
        <Header 
            titulo="Anucie aqui"
            descricao="Anuncie seu produto no melhor site do Brasil"    
        />
        <form className={styles.formulario} onSubmit={handleSubmit(cadastrar)}>
            <Input 
                {...register('titulo', { required: true})}
                placeholder="Nome do produto" 
                alt="Nome do produto"
            />

            <Input 
                {...register('descricao', { required: true})}
                placeholder="Descrição do produto" 
                alt="Descrição do produto"
            />

            <Input 
                {...register('foto', { required: true})}
                placeholder="Url da imagem do produto" 
                alt="Url da imagem do produto"
            />

            <select {...register('categoria', { required: true})} >
                <option value="" disabled>Selecione a categoria</option>
                {categorias.map(({id,nome}) => (
                    <option key={id} value={nome}>
                        {nome}
                    </option>
                ))}
            </select>
            <Input {...register('preco', { required: true, valueAsNumber: true })} type="number" placeholder="Preço do produto"/>

            <Button type="submit">
                Cadastrar produto
            </Button>
        </form>
    </div>
  )
}