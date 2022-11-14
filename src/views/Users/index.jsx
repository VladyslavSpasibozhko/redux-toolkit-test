import Loader from 'src/components/Loader';
import { useNavigate } from 'react-router-dom';
import { useGetUsersQuery, usePrefetch } from 'src/store/api';

export default function Users() {
  const { data = [], isFetching } = useGetUsersQuery(null, {});
  const prefetchUser = usePrefetch('getUser', { ifOlderThan: 60 });

  const navigate = useNavigate();

  const onView = (id) => {
    navigate(`/users/${id}`);
  };

  const onEdit = (id) => {
    navigate(`/users/${id}/edit`);
  };

  if (isFetching) return <Loader />;

  return (
    <div>
      <h2>Users</h2>

      <div>
        {data.map((user) => (
          <div
            key={user.id}
            className="mt-20 flex"
            onMouseEnter={() => prefetchUser(+user.id)}
          >
            <div className="w-300">
              <h3>{user.name}</h3>
              <div>
                <span>Phone:</span>
                <span>{user.phone}</span>
              </div>
            </div>
            <div>
              <button onClick={() => onView(user.id)}>View</button>
              <button onClick={() => onEdit(user.id)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
