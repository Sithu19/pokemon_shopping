import { useEffect, useState } from "react"
import Logo from "../assets/images/Logo.svg"
import "./Home.css"
import { PokemonItem } from "../components/PokemonItem"
import Cart from "../assets/images/Cart.svg"
import Cross from "../assets/images/Cross.svg"
import Success from "../assets/images/Success.svg"
import { CartItem } from "../components/Cart/Cart"
import { DropDown } from "../components/dropDown/DropDown"
import { useMediaQuery } from "react-responsive";

const options = [
    { value: "green", label: "Green" },
    { value: "blue", label: "Blue" },
    { value: "red", label: "Red" },
    { value: "yellow", label: "Yellow" },
    { value: "orange", label: "Orange" },
    { value: "pink", label: "Pink" },
    { value: "purple", label: "Purple" },
    { value: "grey", label: "Grey" }
  ];

export function Home() {
    const isMobile = useMediaQuery({ maxWidth: 426 });
    const [data, setData] = useState<any>([])
    const [cartItem, setCartItem] = useState<any>([])
    const [open, setOpen] = useState<boolean>(false)
    const [Set, setSet] = useState<any>([])
    const [rarities, setRarities] = useState<any>([])
    const [loading, setLoading] = useState<Boolean>(false)
    const [loading1, setLoading1] = useState<Boolean>(false)
    const [loading2, setLoading2] = useState<Boolean>(false)
    const [type, setType] = useState<any>([])
    const [typeData, setTypeData] = useState<any>([])
    const [SetData, setSetData] = useState<any>([])
    const [raritiesData, setRaritiesData] = useState<any>([])
    const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false)

    let totalCard = 0
    let total_price = 0

const callAPI = async() => {
    const response = await fetch("https://api.pokemontcg.io/v2/cards/?pageSize=12", {
    method: 'GET',
    headers: {
      'X-Api-Key': '2eebc1d0-0ea0-46c4-8888-47ab57daf7fa'
    }
    })
    try{
        const data = await response.json()
        if(response.ok){
            setData(data.data)
        }
    }catch(err){
        console.log(err);

    }
}

const RaritiesAPI = async() =>{
    setLoading(true)
    const response = await fetch("https://api.pokemontcg.io/v2/rarities", {
        method: 'GET',
        headers: {
        'X-Api-Key': '2eebc1d0-0ea0-46c4-8888-47ab57daf7fa'
        }
    })
    try{
    const data = await response.json()
        if(response.ok){
             setRaritiesData(data.data)
             setLoading(false)

            }
        }catch(err){
                console.log(err);

        }
}

const SetAPI = async() => {
    setLoading1(true)
    const response = await  fetch("https://api.pokemontcg.io/v2/sets/", {
        method: 'GET',
        headers: {
        'X-Api-Key': '2eebc1d0-0ea0-46c4-8888-47ab57daf7fa'
        }
    })
    try{
        const data = await response.json()
        if(response.ok){
           setSetData(data.data)
           setLoading1(false)
        }
    }catch(err){
        console.log(err);

    }
}

const typeAPI = async() => {
    setLoading2(true)
    const response = await  fetch("https://api.pokemontcg.io/v2/types", {
        method: 'GET',
        headers: {
        'X-Api-Key': '2eebc1d0-0ea0-46c4-8888-47ab57daf7fa'
        }
    })
    try{
        const data = await response.json()
        if(response.ok){
            setTypeData(data.data)
            setLoading2(false)
        }
    }catch(err){
        console.log(err);

    }
}

useEffect(() => {
    callAPI()
    RaritiesAPI()
    SetAPI()
    typeAPI()
},[])

const handelClick = (id: string) => {
const find = cartItem.find((da: any) => da.id === id)
if(find){
    const filter = cartItem.filter((da: any) => da.id !== id)
    setCartItem([...filter])
}else{
    setCartItem((old: any )=> [...old, {id: id, qty: 1}])
}
}

const handleIncrease = (id: string) => {
    const find = cartItem.find((da: any) => da.id === id)
    if(find){
        find.qty = find.qty + 1
        setCartItem((old: any) => [...old])
}
}

const handleDecrease = (id: string) => {
const find = cartItem.find((da: any) => da.id === id)
    if(find){
        find.qty = find.qty - 1
        setCartItem((old: any) => [...old])
}
}

const Delete = (id: string) => {
const find = cartItem.find((da: any) => da.id === id)
if(find){
    const filter = cartItem.filter((da: any) => da.id !== id)
    setCartItem([...filter])
}
}

const handleClear = () => {
    setCartItem([])
}

const onChange = (e: any) => {
    console.log(e);

}

if(cartItem.length > 0){
    cartItem.map((da: any) => {
        totalCard = totalCard + da.qty
        const find = data.find((data: any) => data.id === da.id)
        if(find){
            let total = da.qty * find.cardmarket.prices.averageSellPrice
            total_price = total_price + total

        }
    })

}

if(raritiesData.length > 0){
    raritiesData.map((dat: any) => {
        const find = rarities.find((da: any) => da.value === dat)
            if(!find){
                rarities.push({
                value: dat,
                label: dat
            })
            setRarities((old: any) => [...old])
            }
        })
}
if(SetData.length > 0){
     SetData.map((dat: any) => {
        const find = Set.find((da: any) => da.value === dat.name)
            if(!find){
                Set.push({
                    value: dat.name,
                    label: dat.name
                })
                setSet((old: any) => [...old])
            }

    })
}

if(typeData.length > 0){
    typeData.map((dat: any) => {
        const find = type.find((da: any) => da.value === dat)
            if(!find){
                type.push({
                    value: dat,
                    label: dat
                })
                setType((old: any) => [...old])
            }

    })
}
    return (
        <>
        {loading || loading1 || loading2 ? (
            <div></div>
        ): (

        <div>
            <div className="Home_main_box">
                <div className="Home_title">
                TCG Marketplace
                </div>
                <div style={{position: "relative"}}>
                    <div className="Home_logo_box">

               <img src={Logo} />
                    </div>
                </div>
            </div>
            <div className="Filter_main_box">
                <div className="Filter_child_box">

                <div style={{boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.03)"}} className="input_box"><input placeholder="Name" className="input" /></div>
                  {!isMobile && (

                  <div className="divider"/>
                  )}
                <div className="Dropdown_main_box">

                <div>
                    <DropDown
                    isMulti={false}
                    last={false}
                    placeHolder="Type"
                    options={type}
                    onChange={(value) => onChange(value)}
                    />
                </div>
                     {!isMobile && (

                  <div className="divider"/>
                  )}
                <div><DropDown
                    isMulti={false}
                    last={false}
                    placeHolder="Rarity"
                    options={rarities}
                    onChange={(value) => onChange(value)}
                    /></div>
                     {!isMobile && (

                  <div className="divider"/>
                  )}

                <div style={{marginRight: `${!isMobile && "10px"}`}}><DropDown
                    isMulti={false}
                    last={true}
                    placeHolder="Set"
                    options={Set}
                    onChange={(value) => onChange(value)}
                    /></div>
                    </div>
                </div>
            </div>
            <div className="Pokemon_item_main_box">
                {data.map((da : any) => (
                <div key={da.id}>
                    <PokemonItem {...da} handleClick={handelClick} cartItem={cartItem} />
                </div>
                ))}

            </div>
                    {!open ? (

                        <div className="Home_view_cart_box" onClick={() =>{ setOpen(true); setPaymentSuccess(false)}}>
                <div style={{position: "relative"}}>
                    <div className="Cart_total">{cartItem.length}</div>
                </div>
                <img src={Cart} />
                View Cart
            </div>
                ): (

                    <div className="Home_view_cart_box_cross" onClick={() => setOpen(false)}>

                <img src={Cross} />
            </div>
                    )}
            {open && (
<>
{paymentSuccess ? (
                <div className="Cart_box" style={{height: "30vh"}} >
                    <div className="PaymentSuccess_box">
    <img src={Success} style={{marginBottom: "30px"}} />

    Payment success!
                    </div>
</div>
)
: (

                <div className="Cart_box">
                <div className="Cart_box_child">

                {cartItem.map((da : any) => (
                    <div key={da.id}>
                    <CartItem {...da} data={data} cartItem={cartItem} handleDecrease={handleDecrease} handleIncrease={handleIncrease} Delete={Delete}  />
                        </div>
                ))}
                </div>
                    <div className="Cart_box_sec_child">
                    <div className="Cart_box_sec_child_clear_all" onClick={handleClear}>Clear all</div>
                    <div className="Cart_box_sec_child_des_box">
                    <div className="Cart_box_sec_child_des_box_child">

                    <div className="Cart_box_sec_child_des_box_title">Total cards</div>
                    <div className="Cart_box_sec_child_des_box_text">{totalCard}</div>
                    </div>
                     <div className="Cart_box_sec_child_des_box_child">
                    <div className="Cart_box_sec_child_des_box_title1">Total price</div>
                    <div className="Cart_box_sec_child_des_box_text1">$ {(total_price).toFixed(2)}</div>
                    </div>
                    </div>
                    <div className="Cart_box_sec_child_des_box_button" onClick={() => setPaymentSuccess(true)}>Pay now</div>
                </div>
            </div>
)}

                </>
            )}
        </div>

        )}
        </>
    )
}