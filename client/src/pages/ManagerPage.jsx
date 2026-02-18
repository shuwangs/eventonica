import UserRegisterForm from "../components/UserRegisterForm";

const ManagerPage = () => {

    return (
        <div className="manager-page">
            <h1>Manager Page</h1>
            <UserRegisterForm onSubmit={(user) => console.log("New user added:", user)} />
        </div>
    )

}

export default ManagerPage;