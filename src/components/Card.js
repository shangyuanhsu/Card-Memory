import './css/Card.css'
export default function Card({ data, handle_choice, flipped ,disabled}) {
    const handle_Click = () => {
        if(!disabled){
            handle_choice(data);
        }
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="card_front" src={data.src} alt="card front" />
                <img className="card_back" src="/img/cover.png" onClick={handle_Click} alt="card back" />
            </div>
        </div>
    )
}