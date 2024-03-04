import { useEffect } from 'react';
import { useThunk } from '../hooks/use-thunk'
import { useSelector } from 'react-redux'
import { fetchUsers, addUsers } from '../store';
import Skeleton from './skeleton'
import Button from './Button';
import UsersListItem from './UsersListItem';

function UsersList() {

    const [doFecthUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    const [doCreatingUser, isCreatingUser, isCreatingUserError] = useThunk(addUsers);

    const { data } = useSelector((state) => {
        return state.users; // { data: [], isLoading: false, error: null }
    });

    useEffect(() => {
        doFecthUsers();
    }, [doFecthUsers]);

    const handleUserAdd = () => {
        doCreatingUser()
    };

    let content;

    if (isLoadingUsers === true) {
        content = <Skeleton times={6} className="h-10 w-full"/>
    } else if  (loadingUsersError) {
        content = <div>Error fetching data...</div>
    } else {
        content = data.map((user) => {
            return <UsersListItem key={user.id} user={user} />
        })
    }

    return(
        <div>
            <div className='flex flex-row justify-between items-center m-3'>
                <h1 className='m-2 text-xl'>
                    Users
                </h1> 
                <Button loading={isCreatingUser} onClick={handleUserAdd}>+ Add User</Button>
                {isCreatingUserError && 'Error creating user'}
            </div>
            {content}
        </div>
    ) 
}

export default UsersList;