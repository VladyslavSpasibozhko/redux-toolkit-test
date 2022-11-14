import { useParams } from 'react-router-dom';
import { useGetUserQuery, useGetPostsQuery } from 'src/store/api';
import Loader from 'src/components/Loader';
import NoResults from 'src/components/NoResults';

function UserPosts({ id, className }) {
  const { data, isFetching } = useGetPostsQuery(
    {
      userId: id,
    },
    {
      skip: !id,
    },
  );

  if (isFetching) return <Loader />;

  if (!data) return <NoResults className="mt-10" />;

  return (
    <ul className={className}>
      {data.map((post) => (
        <li key={post.id} className="mt-10">
          <h3>{post.title}</h3>
          <p className="mt-5">{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

export default function User() {
  const { id } = useParams();
  const { data, isFetching } = useGetUserQuery(+id);

  if (isFetching) return <Loader />;

  return (
    <div>
      <h2>{data.name}</h2>
      {data.company && (
        <h2 className="flex mt-10 ">
          <p className="mr-10">Company:</p>
          <p>{data.company.name}</p>
        </h2>
      )}

      <h2 className="flex mt-10 ">
        <p className="mr-10">Phone:</p>
        <p>{data.phone}</p>
      </h2>
      <div className="mt-20">
        <h2>Posts</h2>
        <UserPosts id={id} />
      </div>
    </div>
  );
}
