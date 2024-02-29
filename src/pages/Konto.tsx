import {useSession} from "../context/useSession.tsx";

const Konto = () => {
    const user: any = useSession();

    return (
        <div className='container mx-auto'>
            <div className='row'>
                <div className='col'>
                    <h6>{user.user.data?.row[0].email}</h6>
                    <h6>{user.user.data?.row[0].username}</h6>
                </div>
            </div>
        </div>
    )
}

export default Konto;