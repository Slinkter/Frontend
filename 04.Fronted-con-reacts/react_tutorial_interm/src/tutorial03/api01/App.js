import "./App.css";

import GitHubUser from "./GitHubUser";
import { db_users } from "./GithubData.js";

function App() {
    return (
        <div className="App">
            <div>
                <GitHubUser user={db_users} />
            </div>
        </div>
    );
}

export default App;
