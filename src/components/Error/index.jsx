import { useRouteError } from 'react-router-dom';

export default function Error() {
  const err = useRouteError();
  console.log(err);
  return <div>Error</div>;
}
