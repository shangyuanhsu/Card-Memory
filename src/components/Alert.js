
import './css/Alert.css'

export default function Alert({show,handle_close_alert,count}) { 
    const close_alert=()=>{
        handle_close_alert(false);
    }
    return (
        <div className={show ? "show_alert" : "alert"}>
          <div className="alert_bg"></div>
          <div className="clert_content">
              <div>
              <p>{count < 15 ? "Congratulations!" : "Good , but used too many times"}</p>
              <button onClick={close_alert}>New Game</button>
              </div>
          </div>
        </div>
    )
}