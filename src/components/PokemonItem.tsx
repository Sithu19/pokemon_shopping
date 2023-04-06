import "./pokemonItem.css"
import NoImage from "../assets/images/no_image.png"

type PokemonItemProps = {
    id: string
    name: string
    cardmarket: any
    images: any
    set: any
    rarity: string
    handleClick: (id: string) => void
    cartItem: any
    tcgplayer:any
}

export function PokemonItem({id, name, cardmarket, images, set, rarity, handleClick, cartItem, tcgplayer}: PokemonItemProps) {
return (
    <div className="Pokemon_item_child_box">
        <div className="Pokemon_item_child_image_box">
            <img src={images ? images.large : NoImage} style={{width: "200px "}} />
        </div >
        <div className="Pokemon_item_des_main_box">
            <div style={{width: "80%"}}>

        <div className="Pokemon_item_des_child_box_title">
            {name}
        </div>
        <div className="Pokemon_item_des_child_box_des">
            {rarity}
        </div>
        <div className="Pokemon_item_child_box_div">
            <div>
            $ {cardmarket ? cardmarket.prices.averageSellPrice : "-"}
            </div>
            <div>{cardmarket ? set.total : 0} left</div>
        </div>
        {
            cardmarket && (
<>
                {!cartItem.find((da:any) => da.id === id) ? (
                    <div className="Pokemon_item_child_box_button" onClick={() => handleClick(id)}>
            Select card
        </div>
            ) : (
                <div className="Pokemon_item_child_box_button_selected" onClick={() => handleClick(id)}>
            Selected
        </div>
            )}
            </>
            )
        }
    </div>
        </div>
            </div>
)
}