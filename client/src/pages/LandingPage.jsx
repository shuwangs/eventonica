import { Link } from "react-router-dom";
import "../App.css";

const LandingPage = () => {
  return (
    <div className="landing">
      <h1>
        Discover & Manage <span>Amazing Events</span>
      </h1>
      <p>
        👩🏻‍💻 Your ultimate platform for discovering, creating, and managing
        events.
      </p>
      <p>
        Whether you're an organizer or an attendee, we've got you covered.🐈‍⬛ 🐈‍⬛
        🐈‍⬛{" "}
      </p>
      <div className="link-btns">
        {" "}
        <Link to="/admin">
          <button className="btn-primary enter-admin-btn">
            Start As Admin
          </button>
        </Link>
        <Link to="/user">
          <button className="btn-primary enter-user-btn">Explore Events</button>
        </Link>
      </div>
    </div>
  );
};
export default LandingPage;
