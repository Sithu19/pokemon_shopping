import "./Cart.css"
import DeleteQTY from "../../assets/images/DeleteQty.svg"
import Increase from "../../assets/images/Increase.svg"
import Decrease from "../../assets/images/Decrease.svg"
import { useState } from "react"
import { Loader } from "@progress/kendo-react-indicators";



type CartItemProps = {
    id: string
    name: string
    cardmarket: any
    images: any
    set: any
    rarity: string
    data: any
    handleIncrease: (id: string) => void
    handleDecrease: (id: string) => void
    Delete: (id: string) => void
    cartItem: any
}


export function CartItem({id, name, cardmarket, images, set, rarity,data, cartItem, handleDecrease, handleIncrease, Delete}: CartItemProps){
    let data_filter = null;
    let qty = 0
    if(data){
        const find = data.find((da: any) => da.id === id)
        data_filter = find
    }
    if(cartItem){
        const find = cartItem.find((da: any) => da.id === id)
        console.log(find.qty);

        if(find){
            qty = find.qty
        }
    }

    return (
        <>
        {data_filter ? (

        <div className="Cart_child_box Cart_main_box">
                        <div style={{display: "flex"}}>
                            {data_filter ?
                                <img src={data_filter.images.small && data_filter.images.small} className="Cart_image" />
                                :(
                                    <div
                                        className="Cart_image"
                                    >
                                <Loader
                                    style={{ position: "relative", height: "70px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                                    />
                                    </div>
                                    )
                            }
                        <div style={{margin: "10px 0px 10px 20px"}}>
                            <div className="Cart_des_box">
        <div>

                        <div className="Cart_des_title">{data_filter.name}</div>
                        <div style={{display: "flex"}}>
                            <div className="Cart_des_price">$ {data_filter.cardmarket.prices.averageSellPrice
}</div>
                            <div className="Cart_des_price_end">Per card</div>
                        </div>
        </div>
                        <div style={{display: "flex"}}>
                            <div className="Cart_des_card">{data_filter.set.total}</div>
                            <div className="Cart_des_card_end">left</div>
                        </div>

                            </div>
                        </div>
                        </div>
                        <div>
                        <div style={{display: "flex", justifyContent: "end", alignItems: "end"}}>
                        <div className="Cart_total_qty">{qty}</div>
                        <div style={{position: "relative", top: "-8px", left: "5px"}}>
                        <div onClick={() => handleIncrease(id)} style={{cursor: "pointer"}}><img src={Increase}/> </div>
                        {qty === 1 ? (


                            <div onClick={() => Delete(id)}><img src={DeleteQTY} /></div>
                            ) : (

                                <div onClick={() => handleDecrease(id)} style={{cursor: "pointer"}}><img src={Decrease} /> </div>
                            )}

                        </div>

                        </div>
                        <div className="Cart_total_price_">Price</div>
                        <div className="Cart_price_data">Dollar</div>

                        </div>
                    </div>

            ) : (
                <div>
                    <Loader
                    style={{ position: "relative", height: "70px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                    />
                </div>
            )}
            </>
    )
}