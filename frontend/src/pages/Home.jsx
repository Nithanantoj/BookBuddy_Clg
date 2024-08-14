import { BiSolidBusSchool } from "react-icons/bi";
import { TbLogin2 } from "react-icons/tb";
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <>
        <div className="Home-content">
        <h1>Welcome to Bookbuddy <BiSolidBusSchool className="bus_icon"/> Portal</h1>
        <Link to='/login' className="link"><button><TbLogin2 />Log In</button></Link>
        </div>
        </>
    )
}

export default Home;