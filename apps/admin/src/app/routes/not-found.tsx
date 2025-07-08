import { Link } from 'react-router'

import { paths } from '@/config/paths'

const NotFoundRoute = () => {
  return (
    <div className="z-10 mx-auto mt-52 flex flex-col items-center font-semibold">
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link replace to={paths.app.root.path}>
        Go to Home
      </Link>
    </div>
  )
}

export default NotFoundRoute
