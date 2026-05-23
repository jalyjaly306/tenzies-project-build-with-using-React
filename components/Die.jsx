export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "gray"
    }
    return (
            <button 
                // onClick={() => props.hold(props.id)} 
                onClick={props.hold} 
                style={styles}>{props.value}
            </button>
    )
}