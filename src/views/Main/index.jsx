import { Link } from 'react-router-dom';

export default function Main() {
  return (
    <div>
      <Link to="/users">Users</Link>
      <Link to="/comments">Comments</Link>
    </div>
  );
}
