import {Card} from 'antd'
import Meta from 'antd/es/card/Meta';
import { StartButton } from '../startButton/startButton';

//redux
import { useDispatch } from 'react-redux';
import {setFavorite}  from '../../slices/dataSlice.js';

const PokemonCard=({name,image, types, id, favorite})=>{

    const dispatch = useDispatch();
    const typeString=types.map(elem=>elem.type.name).join(", ");

    const handlerOnFavorite=() =>{
        dispatch(setFavorite({pokemonId:id}))
    }

    return <Card
        title={name}
        cover={<img src ={image} alt={name}/>}
        extra={<StartButton isFavorite={favorite} onClick={()=>{handlerOnFavorite()}}/>}
    >
        <Meta description= {typeString}/>
    </Card>;
}

export {PokemonCard}