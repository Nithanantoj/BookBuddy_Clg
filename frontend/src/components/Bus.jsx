

const Bus = (props) => {
    return (
        <>
            <div className="bus-card">
                <h4>{props.item.bus_no}</h4>
                <p>{props.item.destination}</p>
                <p>{props.item.driver_name}</p>
                <p>{props.item.driver_contact}</p>
                <p>{props.item.incharge_name}</p>
                <p>{props.item.incharge_contact}</p>
            </div>
        </>
    )
}

export default Bus