import favorites from "@static/icon/favorites.svg"
import search from "@static/icon/search.svg"

type FavoritesProps={
    updateModalsize:()=>void;
}

export default function Favorites({updateModalsize}:FavoritesProps) {
  return (
    <span className="favorites">
        <img src={favorites} alt="" className="animation-scale"/>
        <img src={search} alt="" className="animation-scale" onClick={updateModalsize}/>
    </span>
  )
}
