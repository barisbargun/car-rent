import { FooterLink } from '@repo/api/paths/footer/link/common'
import { Link } from 'react-router'

type Props = {
  title: string
  data: FooterLink[]
}

export const FooterGroup = ({ title, data }: Props) => {
  return (
    <div>
      <strong className="mb-5 block font-normal max-lg:text-lg lg:mb-3">
        {title}
      </strong>
      <ul>
        {data.map((v) => (
          <li
            key={v.id}
            className="mb-5 text-lg opacity-60 hover:opacity-90 lg:mb-2 lg:text-sm"
          >
            <Link
              to={v.link || ''}
              target={v.link && v.link?.length > 1 ? '_blank' : '_self'}
            >
              {v.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
