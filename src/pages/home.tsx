import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
           <p>Welcome to our page! Share your plans about the life expectance of your Cristmas Tree and other details! Take a glance on the map and dicover other curios facts in grafics!</p>
            <p>Merry Christmas and Jingle Bells!</p>
            <Link to="/login">
              Get Started </Link>
        </div>
    )
}

export default Home;