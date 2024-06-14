
import Auth from "./Auth"


function AuthError() {
    return (
        <div className="flex h-screen overflow-hidden justify-center items-center">

            <div>
                <Auth type="signin"/>
            </div>

        </div>
    )
}

export default AuthError