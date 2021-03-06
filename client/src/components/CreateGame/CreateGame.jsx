import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getGenres, getPlatforms, postVideoGame } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import styles from "./CreateGame.module.css"


export default function CreateGame() {
    const {genres, platforms} = useSelector((state) => state);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({})
    const [game, setGame] = useState({
        name: '',
        release_date: '',
        image: '',
        description: '',
        rating: '',
        platforms: [],
        genres: [],
    });
    
    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms())
    },[]);

    function validator(input) {
        const err = {};
        if (!input.name) {
            err.name = "El nombre es requerido!";
          } else if (!/^[A-Za-z0-9\s]+$/g.test(input.name)) {
            err.name = "El nombre es invalido!";
          }
        
          if (!input.description) {
            err.description = "La descripcion es requerida!";
          } else if (!/^[A-Za-z0-9\s]+$/g.test(input.description)) {
            err.description = "La descripcion es invalida!";
          } else if (input.description?.length < 50) {
            err.description = "Tiene que tener al menos 50 letras!";
          }
        
          if (!input.rating) {
            err.rating = "El Puntage es requerido!";
          } else if (input.rating > 5 || input.rating < 0) {
            err.rating = "El Puntage es invalido!";
          }
        
          if (input.genres?.length === 0) {
            err.genres = "Tienes que escojer al menos un Genero!";
          }
        
          if (input.platforms?.length === 0) {
            err.platforms = "Tienes que escojer al menos una Plataforma!";
        }
        return err;
    }
    
    function onChangeHandler(e) {
        e.preventDefault()
        setGame({
            ...game,
            [e.target.name]: e.target.name === 'genres'? 
            [...game.genres, e.target.value]
            : e.target.name === 'platforms'?
            [...game.platforms, e.target.value]
            :e.target.value
        });
        setErrors(validator({
            [e.target.name]: e.target.value
        }))
        console.log(errors);
    }

    function onSubmitHandler(e) {
        e.preventDefault()
        if(errors.name || errors.release_date ||errors.image || errors.description || errors.rating || errors.platforms || errors.genres){
            alert('There is missing info');
        }else if(game.name || game.release_date || game.image || game.description ||game.rating || game.platforms ||game.genres){
            dispatch(postVideoGame(game))
        }
        console.log(game)
    }

    return (
        <div className={styles.container}>
            <NavBar/>
            <form className={styles.form} onSubmit={onSubmitHandler}>
                <div className={styles.input_container} >
                    <label className={styles.label} htmlFor="">Name</label>
                    <div>
                        <input className={styles.input} type="text" name="name" placeholder="name" onChange={onChangeHandler} />
                    </div>
                </div>
                
                <div className={styles.input_container}>
                    <label className={styles.label} htmlFor="">Release Date</label>
                    <div>
                        <input className={styles.input} type="date" name="release_date" onChange={onChangeHandler} />
                    </div>
                </div>

                <div className={styles.input_container}>
                    <label className={styles.label} htmlFor="">Image</label>
                    <div>
                        <input className={styles.input} type="file" name="image" onChange={onChangeHandler} />
                    </div>
                </div>

                <div className={styles.input_container}>
                    <label className={styles.label} htmlFor="">Description</label>
                    <div>
                        <input className={styles.description} type="text" name="description" onChange={onChangeHandler} />
                    </div>
                </div>

                <div className={styles.input_container}>
                    <label className={styles.label} htmlFor="">Rating</label>
                    <div>
                        <input className={styles.input} type="text" name="rating" onChange={onChangeHandler} />
                    </div>
                </div>

                <div className={styles.input_container}>
                    <label className={styles.label} htmlFor="">Platforms</label>
                    <select className={styles.select} name="platforms" onChange={onChangeHandler}>
                        <option value="platforms">Platforms</option>
                        {platforms.map((p, i) => <option key={i} value={p}>{p}</option>)}
                    </select>
                </div>

                <div className={styles.input_container}>
                    <label className={styles.label} htmlFor="">Genres</label>
                    <div>
                        <select className={styles.select} name="genres" onChange={onChangeHandler}>
                            {genres.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
                        </select>
                    </div>
                </div>
                <input className={styles.submit} type="submit"/>
            </form>
        </div>
        
    )
}