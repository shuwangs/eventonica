import UserRegisterForm from "../components/UserRegisterForm";
import EventList from "../components/EventList";
import fakeEvents from '../components/hardCodedEventsList.js';

const ManagerPage = () => {

    return (
        <div className="manager-page">
            <h1>Manager Page</h1>
            <UserRegisterForm onSubmit={(user) => console.log("New user added:", user)} />

            <EventList events={fakeEvents} />
        </div>
    )

}

export default ManagerPage;